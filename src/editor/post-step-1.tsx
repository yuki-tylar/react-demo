import { ChangeEvent, useEffect, useRef, useState } from "react";
import { mediaService } from "../service/media-service";
import { PropsPostEditorChild } from "./post";
import { BiCamera, BiFolder, BiVideo } from 'react-icons/bi';
import { MdOutlineFlipCameraAndroid } from 'react-icons/md';
import { motion } from "framer-motion";
import { ButtonCameraShutter, ButtonCameraShutterAction } from "./button-camera-shutter";


type State = {
  isCameraAvailable: boolean;
  videoMode: boolean;
  facingUserMode: boolean;
}

export function PostStep1(props: PropsPostEditorChild) {
  const ref = useRef<HTMLVideoElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<State>({
    isCameraAvailable: mediaService.hasGetUserMedia(),
    videoMode: true,
    facingUserMode: true
  });

  let currentStream: MediaStream | null = null;
  let recorder: MediaRecorder;
  let chunks: Blob[] = [];

  const stopStreaming = () => {
    if (currentStream) {
      currentStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }

  function setRecorder(stream: MediaStream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    }
    recorder.onstop = () => {
      let blob = new Blob(chunks, { type: 'video/webm' });
      props.changeStep(1, { media: {url: URL.createObjectURL(blob), type: 'video', } });
    }
  }

  const openGallery = () => {
    const el = refFile.current;
    if (el) {
      el.click();
    }
  }

  const toggleVideoMode = () => {
    setState({ ...state, videoMode: !state.videoMode });
  }

  const toggleFacingMode = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      setState({ ...state, facingUserMode: !state.facingUserMode });
    }
  }

  const setImage = async (media: string | Blob) => {
    const imageShrink = await mediaService.shrinkImageByFixedSize(media, { axis: 'x', size: 800 });
    props.changeStep(1, { media: { url: imageShrink, type: 'image', } });
  }

  const onShutter = (status: ButtonCameraShutterAction) => {
    const el = ref.current;
    if (!el) {
      console.log('video elment is not ready');
      return;
    }

    if (status == 'snapshot') {
      el.pause();
      const base64 = mediaService.getScreenshotFromVideo(el);
      setImage(base64);
    } else if (status == 'startRecording') {
      recorder.start();
    } else if (status == 'stopRecording') {
      recorder.stop();
    }
  }

  const onSelectMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
    }
  }

  useEffect(() => {
    if (mediaService.hasGetUserMedia()) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: {
            ideal: 1650,
            min: 800,
            max: 1900,
          },
          height: {
            min: 900,

          },
          facingMode: { exact: state.facingUserMode ? 'user' : 'environment' },
        }
      }).then((stream) => {
        currentStream = stream;
        if(state.videoMode) {
          setRecorder(stream);
        }
        const el = ref.current;
        if (el) {
          el.srcObject = stream;
          el.onloadedmetadata = () => {
            el.play();
          };
        }
      })
        .catch((err) => {
          console.log(err);
          stopStreaming();
          if (state.isCameraAvailable == true) {
            setState({ ...state, isCameraAvailable: false });
          }
        });
    }

    return () => {
      stopStreaming();
    }
  })


  return (
    <div style={{ height: window.innerHeight }}>
      <video
        ref={ref}
        className="bg-body w-100pc h-100pc pos-absolute"
        style={{
          transform: state.facingUserMode ? 'rotateY(-180deg)' : undefined,
        }}
      ></video>

      {
        state.isCameraAvailable ?
          null :
          <div
            className="h5 pos-absolute top-50pc left-50pc text-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >Cannot access to camera</div>
      }

      <div className="pos-absolute bottom-0pc left-0pc w-100pc p-15p d-flex main-axis-between cross-axis-end">
        <div className="left main-axis-item-3">

          <div className="mb-15p">
            <button
              className="circle"
              style={{ border: 'solid 2px white', borderRadius: '1000px', width: '45px', height: '45px', background: 'none', }}
              onClick={toggleVideoMode}
            >
              {
                state.videoMode ?
                  <BiCamera style={{ fontSize: '29px', color: 'white', top: '6px', left: '6px' }} className="pos-absolute" /> :
                  <BiVideo style={{ fontSize: '29px', color: 'white', top: '6px', left: '6px' }} className="pos-absolute" />
              }
            </button>
          </div>

          <div>
            <button
              className="circle"
              style={{ border: 'solid 2px white', borderRadius: '1000px', width: '45px', height: '45px', background: 'none', }}
              onClick={() => { openGallery() }}
            >
              <BiFolder style={{ fontSize: '29px', color: 'white', top: '6px', left: '6px' }} className="pos-absolute" />
            </button>

          </div>

          <input
            ref={refFile}
            type="file"
            className="d-none"
            onChange={onSelectMedia}
            accept='.jpg, .jpeg, .png'
          />
        </div>
        <div className="center d-flex main-axis-center main-axis-item-3">
          <ButtonCameraShutter isVideoMode={state.videoMode} onTap={onShutter} />
        </div>
        <div className="right main-axis-item-3 d-flex main-axis-end">
          {
            state.isCameraAvailable ?
              <button
                className="circle"
                style={{ border: 'solid 2px white', borderRadius: '1000px', width: '45px', height: '45px', background: 'none', }}
                onClick={() => { toggleFacingMode() }}
              >
                <MdOutlineFlipCameraAndroid style={{ fontSize: '29px', color: 'white', top: '6px', left: '6px' }} className="pos-absolute" />
              </button> : null
          }
        </div>
      </div>
    </div>

  );
}