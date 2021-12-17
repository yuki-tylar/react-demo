import { motion } from "framer-motion";
import { Component } from "react"
import { Link } from "react-router-dom";

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
        style={{ pointerEvents: "auto" }}
        className="overlay"
        onClick={this.props.goback}
      />
    );
  }
}