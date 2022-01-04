import { motion } from "framer-motion";
import { useState } from "react";

export type ButtonCameraShutterAction = 'startRecording' | 'stopRecording' | 'snapshot'
type PropsForButtonCameraShutter = {
  isVideoMode: boolean;
  onTap: (action: ButtonCameraShutterAction) => void
}

type State = {
  isRecording: boolean;
}

export function ButtonCameraShutter(props: PropsForButtonCameraShutter) {
  const [state, setState] = useState<State>({ isRecording: false });

  return (
    <motion.button
      className="circle"
      style={{
        border: 'solid 2px white',
        width: '60px',
        height: '60px',
        background: state.isRecording ? 'red' : 'none',
      }}
      whileTap={{scale: 1.2}}
      onClick={() => {
        const action = !props.isVideoMode ? 'snapshot' : state.isRecording ? 'stopRecording' : 'startRecording';
        props.onTap(action);
        setState({ ...state, isRecording: !state.isRecording });
      }}
    >
      <motion.div
        className={`pos-absolute bg-white ${state.isRecording ? 'square rounded-4p' : 'circle'} `}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30
        }}
        style={props.isVideoMode ? {
          top: '17px',
          left: '17px',
          width: '22px',
        } : {
          top: '4px',
          left: '4px',
          width: '48px',
        }}></motion.div>
    </motion.button>
  )
}