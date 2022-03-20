import React from 'react';
import { motion } from "framer-motion"

export default function HoverCard({children}) {
  return (
    <motion.div
      whileHover={{ scale: 1.025 }}
    >
      {children}
    </motion.div>
  )
}