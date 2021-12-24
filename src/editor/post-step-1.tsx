import { ChangeEvent, useEffect, useRef, useState } from "react";
import { mediaService } from "../service/media-service";
import { PropsPostEditorChild } from "./post";
import { BiFolder } from 'react-icons/bi';
import { MdOutlineFlipCameraAndroid } from 'react-icons/md';


export function PostStep1(props: PropsPostEditorChild) {
  const ref = useRef<HTMLVideoElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  const [state, setState] = useState<{ isCameraAvailable: boolean, facingMode: 'user' | 'environment' }>({ isCameraAvailable: mediaService.hasGetUserMedia(), facingMode: 'environment' })

  const openGallery = () => {
    const el = refFile.current;
    if (el) {
      el.click();
    }
  }

  const toggleFacingMode = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      setState({ ...state, facingMode: state.facingMode == 'user' ? 'environment' : 'user' });
    }
  }

  const setMedia = async (media: string | Blob) => {
    const imageShrink = await mediaService.shrinkImageByFixedSize(media, { axis: 'x', size: 800 });
    props.changeStep(1, { media: imageShrink });
  }

  const onShutter = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      const base64 = mediaService.getScreenshotFromVideo(el);
      setMedia(base64);
    }
  }

  const onSelectMedia = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0];
      setMedia(file);
    }
  }

  useEffect(() => {
    if (state.isCameraAvailable) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          // width: { min: 1280 },
          // height: { min: 960 },
          facingMode: state.facingMode,
        }
      }).then((stream) => {
        const el = ref.current;
        if (el) {
          el.srcObject = stream;
          el.onloadedmetadata = (e) => {
            el.play();
          };
        }
      })
        .catch((err) => {
          if (state.isCameraAvailable) {
            setState({ ...state, isCameraAvailable: false });
          }
        });
    }
  });


  return (
    <div style={{ height: window.innerHeight }}>
      <video
        ref={ref}
        className="bg-body w-100pc h-100pc pos-absolute"
      ></video>

      {
        state.isCameraAvailable ?
          null :
          <div
            className="h5 pos-absolute top-50pc left-50pc text-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >Cannot access to camera</div>
      }

      <div className="pos-absolute bottom-0pc left-0pc w-100pc p-15p d-flex main-axis-between">
        <div className="left main-axis-item-3">
          <button
            className="circle"
            style={{ border: 'solid 2px white', borderRadius: '1000px', width: '45px', height: '45px', background: 'none', }}
            onClick={() => { openGallery() }}
          >
            <BiFolder style={{ fontSize: '29px', color: 'white', top: '6px', left: '6px' }} className="pos-absolute" />
          </button>
          <input
            ref={refFile}
            type="file"
            className="d-none"
            onChange={onSelectMedia}
            accept='.jpg, .jpeg, .png'
          />
        </div>
        <div className="center d-flex main-axis-center main-axis-item-3">
          {
            state.isCameraAvailable ?
              <button
                className="circle"
                style={{ border: 'solid 2px white', borderRadius: '1000px', width: '60px', height: '60px', background: 'none', }}
                onClick={() => { onShutter(); }}
              >
                <div className="pos-absolute circle bg-white" style={{ top: '4px', left: '4px', width: '48px', }}></div>
              </button> : null
          }
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