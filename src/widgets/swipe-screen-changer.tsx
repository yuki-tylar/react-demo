import { motion } from "framer-motion";
import { Component, createRef, PropsWithChildren } from "react";
import { Axis, Direction } from "../definition/general";
import { gestureService } from "../service/gesture-service";

const variants = {
  enter: (data: { direction: number, width: number }) => {
    return {
      x: data.direction > 0 ? data.width : data.direction < 0 ? -data.width : 0,
      opacity: 0,
      zIndex: 1,
    }
  },
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (data: { direction: number, width: number }) => {
    return {
      x: data.direction > 0 ? -data.width : data.direction < 0 ? data.width : 0,
      opacity: 1,
      zIndex: 0,
    }
  },
}

export class SwipeScreenChanger extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.ref = createRef<HTMLDivElement>();
    this.state = {
      direction: props.direction,
      axisLocked: props.allowAxis == 'x' ? 'y' : 'x'
    }
  }

  private ref;

  private lockAxis(axisLocked: Axis) {
    if(axisLocked !== this.state.axisLocked) {
      this.setState({...this.state, axisLocked })
      this.props.onAxisLocked(axisLocked);
    }
  }

  render() {
    return (
      <motion.div
        custom={{ direction: this.state.direction, width: (this.ref.current?.clientWidth || 1000) }}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
        drag={this.props.allowAxis}
        dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
        dragElastic={1}
        dragDirectionLock
        onDirectionLock={ d => { this.lockAxis(d); } }
        onDrag={(e, info) => {
          const direction = info.delta.x > 0 ? -1 : info.delta.x < 0 ? 1 : 0;
          if (direction !== 0 && this.state.direction !== direction && this.state.axisLocked === this.props.allowAxis) {
            this.setState({ ...this.state, direction });
          }
        }}
        onDragEnd={(e, { offset, velocity }) => {
          if (this.state.axisLocked === 'x') {
            const direction = gestureService.getSwipeDirection(offset.x, velocity.x);
            if (direction !== 0) {
              this.props.onSwipeDetected(direction);
            } else {
              const axisLocked = this.state.axisLocked == 'x' ? 'y' : 'x';
              this.lockAxis(axisLocked);
            }
          }
        }}
      >
        {this.props.children}
      </motion.div>
    );
  }
}

type Props = PropsWithChildren<{
  allowAxis: 'x'|'y'|false;
  direction: Direction;
  onSwipeDetected: (direction: Direction) => void;
  onAxisLocked: (axis: Axis) => void;
}>

type States = {
  direction: Direction;
  axisLocked: Axis;
}