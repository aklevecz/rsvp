import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const NoStage = ({ text, bodyControls }: any) => {
  const controls = useAnimation();
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "https://myspace.com";
    }, 5000);
  }, []);
  return (
    <>
      <motion.div
        animate={controls}
        transition={{ repeat: Infinity, type: "tween" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          onAnimationComplete={() => {
            bodyControls.start({ scale: 1 }).then(() => {
              window.scroll({ top: 0, behavior: "smooth" });
            });
            setTimeout(() => controls.start({ rotate: 360 }), 1500);
          }}
          className="fun-aspect-heading"
        >
          {text}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={bodyControls}
          className="fun-aspect-body"
        >
          <div style={{ fontSize: "3rem", margin: 35 }}>
            Well then, cya later!
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NoStage;
