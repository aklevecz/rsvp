import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { dotStyle, pointInRect } from ".";

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
        ...dotStyle,
        position: "absolute",
        top: `${Math.random() * 100 - 40}%`,
        // left: `${Math.random() * 100}%`,
        left: (idx - 1) * 70 + 10,
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

export default Dot;
