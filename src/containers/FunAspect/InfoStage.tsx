import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Arrow } from "./Arrow";
import { At } from "./At";
import { Lash } from "./Lash";
import { PlaceTime } from "./PlaceTime";
import { SeeYouThere } from "./SeeYouThere";
import { Smile } from "./Smile";
import { Volta } from "./Volta";

function FadeInWhenVisible({ children, margin = 0 }: any) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      style={{ margin }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}
const InfoStage = ({ text, bodyControls }: any) => {
  return (
    <>
      <motion.div
        className="arrow"
        initial={{ y: -500 }}
        animate={{ y: window.innerHeight }}
        transition={{ delay: 3, duration: 3 }}
      >
        <Arrow />
      </motion.div>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 2, type: "spring" }}
      >
        <SeeYouThere />
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, delay: 2, type: "spring" }}
      >
        <Smile />
      </motion.div>
      <FadeInWhenVisible>
        <At />
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <Lash />
      </FadeInWhenVisible>
      <FadeInWhenVisible margin={"80px 0px"}>
        <PlaceTime />
      </FadeInWhenVisible>
      <FadeInWhenVisible margin="0px 0px 80px">
        <Volta />
      </FadeInWhenVisible>
      {/* <motion.div
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
      </motion.div> */}
    </>
  );
};

export default InfoStage;
