import "./styles.css";
import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Dots from "./Dots";
import DragStage from "./DragStage";
import SignupStage from "./SignupStage";
import FreeStage from "./FreeStage";
import NoStage from "./NoStage";
import { fpPromise, services } from "../..";
import InfoStage from "./InfoStage";

export const pointInRect = ({ x1, y1, x2, y2 }: any, { x, y }: any) =>
  x > x1 && x < x2 && y > y1 && y < y2;

export const dotStyle = {
  background: "white",
  width: 40,
  height: 40,
  borderRadius: "50%",
};

enum Stages {
  Drag,
  Free,
  Signup,
  Info,
  No,
}

export default function FunAspect() {
  const [stage, setStage] = useState(Stages.Drag);
  const controls = useAnimation();
  const bodyControls = useAnimation();
  const constraintsRef = useRef(null);
  const holeRef = useRef<HTMLDivElement>(null);
  const floatingText = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const infoRef = useRef<HTMLInputElement>(null);

  const fingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    fpPromise.then(async (fp) => {
      const result = await fp.get();
      fingerprintRef.current = result.visitorId;
    });
  }, []);

  const blowUp = () => {
    controls.start({ scale: 5 }).then(() => {
      setStage(Stages.Free);
      window.scroll({ top: 0, behavior: "smooth" });
      controls.start({ scale: 1 }).then(() => {});
    });
  };

  const yes = () => setStage(Stages.Signup);
  const no = () => setStage(Stages.No);

  let text = "FUN ASPECT";
  if (stage === Stages.Free) {
    text = "Are you Free Nov 14?";
  }
  if (stage === Stages.Signup) {
    text = "RSVP?";
  }
  if (stage === Stages.No) {
    text = "Ummm";
  }

  const sendIt = () => {
    services
      .leaveInfo(infoRef.current!.value, fingerprintRef.current!)
      .then((resp) => {
        if (resp) {
          setStage(Stages.Info);
        }
      });
  };

  return (
    <div className="fun-aspect">
      {stage === Stages.Drag && (
        <DragStage
          text={text}
          bodyControls={bodyControls}
          constraintsRef={constraintsRef}
          holeRef={holeRef}
          blowUp={blowUp}
          controls={controls}
        />
      )}
      {stage === Stages.Free && (
        <FreeStage text={text} bodyControls={bodyControls} yes={yes} no={no} />
      )}
      {stage === Stages.Signup && (
        <>
          <SignupStage
            text={text}
            bodyControls={bodyControls}
            floatingText={floatingText}
            buttonRef={buttonRef}
            fingerprint={fingerprintRef.current}
            infoRef={infoRef}
          />
          <Dots ref={buttonRef} sendIt={sendIt} />
        </>
      )}
      {stage === Stages.Info && (
        <InfoStage text={"SEE YOU THERE"} bodyControls={bodyControls} />
      )}
      {stage === Stages.No && (
        <NoStage text={text} bodyControls={bodyControls} />
      )}
    </div>
  );
}
