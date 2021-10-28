import { motion, useAnimation } from "framer-motion";
import { forwardRef, useRef } from "react";
import { dotStyle } from ".";

const Dots = forwardRef(({ sendIt }: any, ref: any) => {
  const controls = useAnimation();
  const counterRef = useRef<number>(0);
  const owRef = useRef<HTMLDivElement | null>(null);
  return (
    <div style={{ position: "relative" }}>
      <motion.div
        style={{ userSelect: "none", pointerEvents: "none" }}
        animate={controls}
        initial={{ opacity: 0 }}
        className="ow"
        ref={owRef}
      >
        ow!
      </motion.div>
      {[1, 2, 3, 4, 5].map((idx) => {
        if (idx === 1) {
          return (
            <>
              <motion.div
                style={{ ...dotStyle }}
                initial={{ x: -100 }}
                animate={{ x: window.innerWidth + 200 }}
                transition={{ repeat: Infinity, duration: idx }}
                drag
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
            onDrag={() => {
              if (counterRef.current > 0) {
                owRef.current!.innerHTML = "Stop it!";
              }
              if (counterRef.current > 1) {
                owRef.current!.innerHTML = "Why!";
              }
              if (counterRef.current > 2) {
                owRef.current!.innerHTML = "Omg just RSVP!";
              }
              controls.start({ opacity: 1 }).then(() => {
                controls.start({ opacity: 0 });
                counterRef.current++;
              });
            }}
            drag
          />
        );
      })}
    </div>
  );
});

export default Dots;
