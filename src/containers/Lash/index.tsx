import { useEffect, useRef, useState } from "react";
import Flyer from "./Flyer";
import RsvpFooter from "./RsvpFooter";
import "./index.css";
import { useModalToggle } from "../../contexts/Modal";
import RsvpModal from "./RsvpModal";

export type RSVP = {
  name: string;
  phone: string;
  email: string;
};

export default function Lash() {
  const svgRef = useRef<HTMLDivElement>(null);
  const [rsvp, setRsvp] = useState<RSVP>({ name: "", phone: "", email: "" });
  const [marginTop, setMarginTop] = useState(0);
  const { toggleModal } = useModalToggle();

  useEffect(() => {
    const svg = svgRef.current;
    if (svg && window.innerWidth < 768) {
      const windowHeight = window.innerHeight;
      const { height } = svg.getBoundingClientRect();
      const marginTop = windowHeight / 2.5 - height / 2;
      setMarginTop(marginTop);
    }
  }, [svgRef]);

  const updateRsvp = (name: string, value: string) =>
    setRsvp({ ...rsvp, [name]: value });

  const submit = () => console.log(rsvp);

  return (
    <div style={{ marginTop }} ref={svgRef}>
      <Flyer />
      <RsvpFooter onClick={toggleModal} />
      <RsvpModal updateRsvp={updateRsvp} submit={submit} rsvp={rsvp} />
    </div>
  );
}
