import { motion } from "framer-motion";
import { Component } from "react"

interface IOverlayProps {
  goback: () => void;
}
export class Overlay extends Component<IOverlayProps> {
  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ pointerEvents: "auto", touchAction: 'none' }}
        className="overlay"
        onClick={this.props.goback}
      />
    );
  }
}