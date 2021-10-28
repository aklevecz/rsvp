import { motion } from "framer-motion";

export default function Hole() {
  return (
    <motion.div
      className="hole"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
    />
  );
}
