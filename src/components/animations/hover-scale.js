import React from 'react';
import { motion } from "framer-motion"

export default function HoverScale({children, scale = 1.025}) {
  return (
    <motion.div
      whileHover={{ scale: scale }}
    >
      {children}
    </motion.div>
  )
}