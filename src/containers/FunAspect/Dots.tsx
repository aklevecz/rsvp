import { motion } from "framer-motion";
import { forwardRef } from "react";
import { dotStyle } from ".";

const Dots = forwardRef(({ sendIt }: any, ref: any) => (
  <>
    {[1, 2, 3, 4, 5].map((idx) => {
      if (idx === 1) {
        return (
          <>
            <motion.div
              style={{ ...dotStyle }}
              initial={{ x: -100 }}
              animate={{ x: window.innerWidth + 200 }}
              transition={{ repeat: Infinity, duration: idx }}
            />
            <motion.button
              onClick={sendIt}
              style={{ display: "none" }}
              ref={ref}
              initial={{
                x: -200,
                background: "radial-gradient(#FF0000, #FFFFFF)",
                color: "#FFFFFF",
              }}
              animate={{
                x: window.innerWidth + 200,
                background: "radial-gradient(#FFFFFF, #FF0000)",
                color: "#000000",
              }}
              transition={{
                x: { repeat: Infinity, duration: 10 },
                background: {
                  repeat: Infinity,
                  duration: 1,
                  repeatType: "mirror",
                },
                color: {
                  repeat: Infinity,
                  duration: 1,
                  repeatType: "mirror",
                },
              }}
            >
              Send it
            </motion.button>
          </>
        );
      }
      return (
        <motion.div
          style={{ ...dotStyle }}
          initial={{ x: -100 }}
          animate={{ x: window.innerWidth + 200 }}
          transition={{ repeat: Infinity, duration: idx }}
        />
      );
    })}
  </>
));

export default Dots;
