import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

const variants = {
  hide: {
    borderRadius: '10px',
    scale: 0.95,
    opacity: 0,
  },
  show: {
    borderRadius: 0,
    scale: 1,
    opacity: 1,
  }
}

export function ChildViewOverlay(props:PropsWithChildren<{}>) {
  return (
    <div>
      <motion.div
      className="app-child-container bg-background"
      variants={variants}
      initial='hide'
      animate='show'
      exit='hide'
      transition={{duration: 0.3}}
      >
        {props.children}
      </motion.div>
    </div>
  )

}