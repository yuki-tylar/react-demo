import { AnimatePresence, motion } from "framer-motion";
import { Component, createElement } from "react";
import { MessageStatus, MessageStyle, rSnackbarAction } from "../redux/slice-snackbar";
import { PropsWithReduxSnackbar, snackbarConnector } from "../redux/store";
import { gestureService } from "../service/gesture-service";

export function Snackbar() {
  return createElement(snackbarConnector(_Snackbar));
}

class _Snackbar extends Component<PropsWithReduxSnackbar> {

  render() {
    const isShown = this.props.snackbar.status === MessageStatus.shown;
    return (
      <AnimatePresence>
        {
          isShown ?
            <__Snackbar dispatch={this.props.dispatch} snackbar={this.props.snackbar} /> :
            null
        }
      </AnimatePresence>
    );
  }
}

class __Snackbar extends Component<PropsWithReduxSnackbar> {
  private timer: any;

  startTimer() {
    this.timer = setTimeout(() => {
      this.hideSnackbar();
    }, this.props.snackbar.duration);
  }

  resetTimer() {
    clearTimeout(this.timer);
  }

  hideSnackbar() {
    if (this.props.snackbar.status === MessageStatus.shown) {
      this.props.dispatch(rSnackbarAction.hide());
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  render() {
    let theme: string;
    switch(this.props.snackbar.style) {
      case MessageStyle.success: theme = 'success'; break;
      case MessageStyle.error: theme = 'error'; break;
      case MessageStyle.warn: theme = 'warn'; break;
      default: theme = ''
    }
    return (
      <motion.div
        className={`snackbar body2 ${theme}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        drag="y"
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0, }}
        dragElastic={1}
        onTouchStart={() => { this.resetTimer(); }}
        onTouchEnd={() => { this.startTimer(); }}
        onDragEnd={(e, info) => {
          const direction = gestureService.getSwipeDirection(info.offset.y, info.velocity.y);
          if (direction === -1) {
            this.hideSnackbar();
          }
        }}
      >
        {this.props.snackbar.message}
      </motion.div>
    );
  }
}