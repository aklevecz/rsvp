import { motion } from "framer-motion";
import { useEffect } from "react";
import Dot from "./Dot";

const DragStage = ({
  text,
  bodyControls,
  constraintsRef,
  holeRef,
  blowUp,
  controls,
}: any) => {
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 2 }}
        onAnimationComplete={() => {
          bodyControls.start({ scale: 1 }).then(() => {
            window.scroll({ top: 1000, behavior: "smooth" });
            document.body.style.overflow = "hidden";
          });
        }}
        className="fun-aspect-heading"
      >
        {text}
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={bodyControls}
        className="fun-aspect-body"
        ref={constraintsRef}
      >
        <motion.div animate={controls} ref={holeRef} id="hole" />
        <div
          style={{
            position: "relative",
            height: "100%",
            marginBottom: 100,
          }}
        >
          {[1, 2, 3, 4, 5].map((idx) => {
            return (
              <Dot
                key={idx}
                idx={idx}
                constraintsRef={constraintsRef}
                holeRef={holeRef}
                done={blowUp}
              />
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default DragStage;
