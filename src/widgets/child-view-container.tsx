import { motion, useDragControls } from "framer-motion";
import { Component, PropsWithChildren, useRef, useState } from "react";
import { gestureService } from "../service/gesture-service";
import { Overlay } from "./overlay";

const variants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 1000,
    opacity: 0,
  },
}

export function ChildView(props: PropsWithChildren<{ goback: () => void }>) {

  const [state, setState] = useState({ closable: false });
  const refContainer = useRef<HTMLDivElement>(null);

  const dragControls = useDragControls();
  let markedAsStopGoback = false;

  const gobackIfPossible = () => {
    if (!markedAsStopGoback) {
      props.goback();
    }
    markedAsStopGoback = true;
  }

  return (
    <div style={{ zIndex: 100 }} className="pos-fixed">
      <Overlay goback={props.goback}></Overlay>

      <motion.div
        ref={refContainer}
        className="app-child-body"
        layout
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
        drag={state.closable ? 'y' : false}
        dragElastic={1}
        dragControls={dragControls}
        onDrag={(e, { offset }) => {
          const el = refContainer.current;
          if (el && el.clientHeight / 2 < offset.y) {
            gobackIfPossible();
          }
        }}
        onDragEnd={(e, { offset, velocity }) => {
          const direction = gestureService.getSwipeDirection(offset.y, velocity.y);
          if (direction === -1) {
            gobackIfPossible();
          }
        }}
      >
        <div className="pos-relative h-100pc">
          <motion.div
            className="pos-absolute w-100pc d-flex main-axis-center py-10p"
            style={{ zIndex: 5 }}
            onPointerDown={(e) => {
              setState({ ...state, closable: true })
              dragControls.start(e, { snapToCursor: false })
            }}
            onPointerUp={() => {
              setTimeout(() => {
                setState({ ...state, closable: false })
              });
            }}
          >
            <div className="h-5p w-100p bg-white rounded-8p"></div>
          </motion.div>
          <div className="h-100pc">
            {props.children}
          </div>
        </div>
      </motion.div>
    </div>
  );

}