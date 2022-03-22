import React from 'react';
import { motion } from "framer-motion"

export default function HoverWiggle({children, scale = 1.025}) {
  return (
    <motion.div
      whileHover={{ rotate: [0, 2, -2, 1, -3, 0] }}
    >
      {children}
    </motion.div>
  )
}