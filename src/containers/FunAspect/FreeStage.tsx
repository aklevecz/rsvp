import { motion } from "framer-motion";

const FreeStage = ({ text, bodyControls, constraintsRef, yes, no }: any) => (
  <>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring" }}
      onAnimationComplete={() => {
        bodyControls.start({ scale: 1 }).then(() => {
          window.scroll({ top: 0, behavior: "smooth" });
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 50,
        }}
      >
        <button style={{ flex: "0 0 30%" }} onClick={yes}>
          Yes
        </button>
        <button style={{ flex: "0 0 30%" }} onClick={no}>
          No
        </button>
      </div>
    </motion.div>
  </>
);

export default FreeStage;
