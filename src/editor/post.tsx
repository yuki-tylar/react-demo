import { AnimatePresence, motion } from "framer-motion";
import { createElement, useEffect, useState } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { Direction } from "../definition/general";
import { PostStep1 } from "./post-step-1";
import { PostStep2 } from "./post-step-2";
import { BiArrowBack } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa'

export type PostFormData = {
  media?: string | null,
  body?: string,
}

export type PropsPostEditorChild = {
  data: PostFormData;
  changeStep: (step: Direction, data?: PostFormData) => void;
}

const variants = {
  enter: {
    opacity: 0,
    zIndex: 1,
    y: 10,
    scale: 0.99,
  },
  center: {
    opacity: 1,
    zIndex: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    zIndex: 0,
    y: 10,
    scale: 0.99,
  },
}

export function PostEditor() {
  const location = useLocation();
  const navigate = useNavigate();

  const stepper = [
    PostStep1,
    PostStep2
  ];

  const [state, setState] = useState<{ step: number, data: PostFormData }>({
    step: 0,
    data: {
      media: null,
      body: ''
    }
  });

  const changeStep = (direction: Direction, updated?: PostFormData) => {
    const data = {
      ...state.data,
      ...updated && updated
    }

    const step = state.step + direction;
    if (step < 0) {
      if (location.state && (location.state as { background: Location }).background) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    } else if (step >= stepper.length) {
      alert('post feature is not implemented yet');
    } else {
      setState({ ...state, step: step, data: data });
    }
  }

  useEffect(() => {
    // window.onbeforeunload = () => true;
    // return () => {
    //   window.onbeforeunload = null;
    // }
  });

  return (
    <>
      <div className='pos-fixed top-0p w-100pc h-50p d-flex main-axis-between blur' style={{ zIndex: 10, background: 'rgba(255,255,255,0.4)' }}>
        {
          <button className="btn-icon-body py-5p" onClick={() => { changeStep(-1); }}>
            {
              state.step == 0 ?
                <FaTimes /> :
                <BiArrowBack />
            }

          </button>
        }
        <button
          className="btn-text-body small"
          onClick={() => { changeStep(1) }}
        >
          {(stepper.length > state.step + 1 ? 'Skip' : 'Share')}
        </button>
      </div>

      <div className="pos-relative">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={state.step}
            initial='enter'
            animate='center'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.1 }}
          >
            {
              createElement(stepper[state.step], { changeStep: changeStep, data: state.data })
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );

}