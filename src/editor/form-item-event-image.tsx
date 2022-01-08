import { ChangeEvent, createElement, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { snackbarMessage } from "../definition/message";
import { rSnackbarAction, SnackbarStyle } from "../redux/slice-snackbar";
import { eventConnector, PropsWithRedux } from "../redux/store";
import { mediaService } from "../service/media-service";

interface Props {
  value?: string;
  onImageChanged: (image: string) => void;
}

interface _Props extends PropsWithRedux, Props { }

export function FormItemEventImage(props: Props) {
  return createElement(eventConnector(_FormItemEventImage), props as _Props );
}

export function _FormItemEventImage(props: _Props) {

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImage] = useState<string | null>(props.value || null);

  const openFileBrowser = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.match(/image/)) {
        const imageShrink = await mediaService.shrinkImageByFixedSize(file, { axis: 'x', size: 800 });
        setImage(imageShrink);
        props.onImageChanged(imageShrink);
      } else {
        props.dispatch(rSnackbarAction.show({
          message: snackbarMessage.FILE_FORMAT_ACCEPT_ONLY_IMAGE_ERROR,
          style: SnackbarStyle.error,
        }));
      }
    }
  }

  const removeImage = () => {
    setImage(null);
  }

  return (
    <div
      className="aspect-ratio-50pc form-item" style={{ overflow: 'hidden' }}
    >
      {
        imageUrl ?
          <>
            <img
              className="pos-absolute w-100pc h-100pc"
              style={{ objectFit: 'cover' }}
              src={imageUrl}
              alt=""
            />

            <button
              className="pos-absolute btn-icon-white top-0pc right-0pc"
              type="button"
              onClick={removeImage}
            >
              <FaTimes />
            </button>
          </> :
          <>
            <div
              className="pos-absolute top-50pc left-50pc text-center"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <h6
                className="subtitle1 text-placeholder mb-15p"
              >
                Please select image
              </h6>
              <button
                className="btn-primary small"
                onClick={openFileBrowser}
                type="button"
              >
                Upload image
              </button>
            </div>
            <input
              type="file"
              ref={inputFileRef}
              className="d-none"
              onChange={onFileSelected}
              accept='.jpg, .jpeg, .png'
            />
          </>
      }


    </div>
  )
}