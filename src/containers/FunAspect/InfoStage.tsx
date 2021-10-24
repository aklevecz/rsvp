import { motion } from "framer-motion";

const InfoStage = ({ text, bodyControls }: any) => {
  return (
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
      >
        <div style={{ fontSize: "3rem", margin: 35 }}>
          THE LASH - NOV 14 - 9PM
        </div>
      </motion.div>
    </>
  );
};

export default InfoStage;
