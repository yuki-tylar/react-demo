import { ChangeEvent, useRef, useState } from "react";
import { mediaService } from "../service/media-service";
import { icons } from "../_temp/icons";
import { PropsPostEditorChild } from "./post";



export function PostStep1(props: PropsPostEditorChild) {
  const ref = useRef<HTMLVideoElement>(null);
  const refFile = useRef<HTMLInputElement>(null);

  const [state, setState] = useState({ isCameraAvailable: mediaService.hasGetUserMedia(), facingMode: 'user' })

  if (mediaService.hasGetUserMedia()) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { min: 1280 },
        height: { min: 960 },
        facingMode: { exact: state.facingMode },
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
        setState({ ...state, isCameraAvailable: false });
      });
  }


  const openGallery = () => {
    const el = refFile.current;
    if (el) {
      el.click();
    }
  }

  const toggleFacingMode = () => {
    setState({ ...state, facingMode: state.facingMode == 'user' ? 'environment' : 'user' });
  }

  const setMedia = async (media: string|Blob) => {
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
            className="btn-icon small"
            onClick={() => { openGallery() }}
          >
            <span className="d-inline-block w-30p" dangerouslySetInnerHTML={{ __html: icons.photos }}></span>
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
                className="btn-icon small"
                onClick={() => { onShutter(); }}
              >
                <span className="d-inline-block w-40p" dangerouslySetInnerHTML={{ __html: icons.shutter }}></span>
              </button> : null
          }
        </div>
        <div className="right main-axis-item-3 d-flex main-axis-end">
          {
            state.isCameraAvailable ?
              <button
                className="btn-icon small"
                onClick={() => { toggleFacingMode() }}
              >
                <span className="d-inline-block w-40p" dangerouslySetInnerHTML={{ __html: icons.shutter }}></span>
              </button> : null
          }
        </div>
      </div>
    </div>

  );
}