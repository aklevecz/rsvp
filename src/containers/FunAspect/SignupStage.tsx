import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { dotStyle } from ".";
const initialText = "Psst. Click here :)";
const SignupStage = ({ text, bodyControls, buttonRef, infoRef }: any) => {
  const [floatingText, setFloatingText] = useState({
    text: initialText,
    floating: false,
  });
  const [info, setInfo] = useState("");
  const float = () =>
    setFloatingText({ text: "Leave your info", floating: true });
  const idle = () => {
    if (!info) {
      setFloatingText({ text: initialText, floating: false });
    }
  };

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }
    const button = buttonRef.current as any;
    if (info) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }, [info]);
  return (
    <>
      <motion.div
        initial={{ x: -1000, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ type: "spring" }}
        onAnimationComplete={() => {
          bodyControls.start({ scale: 1 }).then(() => {
            // window.scroll({ top: 1000, behavior: "smooth" });
          });
        }}
        className="fun-aspect-heading"
      >
        {text}
      </motion.div>
      <motion.div
        style={{ ...dotStyle, marginBottom: 10 }}
        initial={{ x: -100 }}
        animate={{ x: window.innerWidth + 200 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      <motion.div
        initial={{ x: -1000, scale: 0 }}
        animate={{ x: 0, scale: 1 }}
        className="input-container"
      >
        <span
          className={`floating-text ${floatingText.floating ? "active" : ""}`}
        >
          {floatingText.text}
        </span>
        <input
          ref={infoRef}
          onChange={(e: any) => setInfo(e.currentTarget.value)}
          onFocus={float}
          onBlur={idle}
          type="text"
        />
      </motion.div>
    </>
  );
};

export default SignupStage;
