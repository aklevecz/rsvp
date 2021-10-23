import "./styles.css";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const pointInRect = ({ x1, y1, x2, y2 }: any, { x, y }: any) =>
  x > x1 && x < x2 && y > y1 && y < y2;

const Dot = ({ idx, holeRef, constraintsRef, done }: any) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const checkPosition = (event: any, info: any) => {
    if (!holeRef.current) {
      return;
    }
    const { x, y, width, height } = holeRef.current?.getBoundingClientRect();
    const x1y1 = { x, y };
    const x2y2 = { x: x + width, y: y + height };
    const xy = { x: info.point.x, y: info.point.y };
    const a = pointInRect(
      { x1: x1y1.x, y1: x1y1.y, x2: x2y2.x, y2: x2y2.y },
      { x: xy.x, y: xy.y }
    );
    if (a) {
      remove();
      // setTimeout(() => dot?.remove(), 2000);
    }
  };

  const remove = () => {
    const dot = document.getElementById("dot" + idx);
    controls.start({ scale: 0 }).then(() => {
      dot?.remove();
      const remainingDots = document.querySelectorAll(".dot");
      console.log(remainingDots.length);
      if (remainingDots.length === 0) {
        done();
      }
    });
  };

  const onDragEnd = (event: any, info: any) => {
    checkPosition(event, info);
    let lastPosition = info.point.x;
    function check() {
      const { x, y } = dotRef.current!.getBoundingClientRect();
      checkPosition(event, { point: { x, y } });
      if (lastPosition !== x) {
        lastPosition = x;
        requestAnimationFrame(check);
      }
    }
    check();
  };
  return (
    <motion.div
      style={{
        background: "white",
        width: 40,
        height: 40,
        borderRadius: "50%",
        position: "absolute",
        top: `${Math.random() * 100 - 40}%`,
        // left: `${Math.random() * 100}%`,
        left: (idx - 1) * 40,
      }}
      ref={dotRef}
      id={`dot${idx}`}
      animate={controls}
      drag
      dragConstraints={constraintsRef}
      onDragEnd={onDragEnd}
      onDrag={checkPosition}
      whileDrag={{ scale: 1.2 }}
      dragMomentum={true}
      className="dot"
    ></motion.div>
  );
};

enum Stages {
  Drag,
  Signup,
}

export default function FunAspect() {
  const [stage, setStage] = useState(Stages.Drag);
  const controls = useAnimation();
  const bodyControls = useAnimation();
  const constraintsRef = useRef(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const floatingText = useRef<HTMLElement>(null);

  const blowUp = () => {
    controls.start({ scale: 5 }).then(() => {
      setStage(Stages.Signup);
      window.scroll({ top: 0, behavior: "smooth" });

      controls.start({ scale: 1 }).then(() => {});
    });
  };

  let text = "FUN ASPECT";
  if (stage === Stages.Signup) {
    text = "RSVP?";
  }

  return (
    <div className="fun-aspect">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        onAnimationComplete={() => {
          bodyControls.start({ scale: 1 }).then(() => {
            window.scroll({ top: 1000, behavior: "smooth" });
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
        <div style={{ position: "relative", height: "100%" }}>
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
    </div>
  );
}

/* <div className="input-container">
        <span ref={floatingText} className="floating-text">
          Hello
        </span>
        <input
          onFocus={() => {
            floatingText.current!.style.top = "-7px";
          }}
          onBlur={() => {
            floatingText.current!.style.top = "7px";
          }}
          type="text"
        />
      </div> */
