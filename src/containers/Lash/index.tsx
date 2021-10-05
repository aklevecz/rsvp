import { useEffect, useRef, useState } from "react";
import Flyer from "./Flyer";
import RsvpFooter from "./RsvpFooter";
import "./index.css";
import { useModalToggle } from "../../contexts/Modal";
import RsvpModal from "./RsvpModal";
import { services } from "../..";

export type RSVP = {
  name: string;
  phone: string;
  email: string;
  notify: boolean;
  submitted: boolean;
  fetching: boolean;
};

export default function Lash() {
  const svgRef = useRef<HTMLDivElement>(null);
  const [rsvp, setRsvp] = useState<RSVP>({
    name: "",
    phone: "",
    email: "",
    notify: true,
    submitted: false,
    fetching: false,
  });
  const [whichModal, setWhichModal] = useState<"rsvp" | "info">("rsvp");
  const [marginTop, setMarginTop] = useState(0);
  const { toggleModal, setTitle } = useModalToggle();

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

  const toggleNotify = () => setRsvp({ ...rsvp, notify: !rsvp.notify });

  const submit = () => {
    setRsvp({ ...rsvp, fetching: true });
    services
      .lashRsvp(rsvp.name, rsvp.phone, rsvp.email, rsvp.notify)
      .then((r) => {
        if (r) {
          setRsvp({ ...rsvp, submitted: true, fetching: false });
        }
      })
      .catch(() => {
        alert("there was an error sorry!");
        setRsvp({ ...rsvp, fetching: false });
      });
  };

  const readyToSubmit = !!rsvp.name && !!rsvp.phone && !!rsvp.email;

  const toggleInfo = () => {
    setTitle("INFO");
    setWhichModal("info");
    toggleModal();
  };

  const toggleRsvp = () => {
    setTitle("RSVP");
    setWhichModal("rsvp");
    toggleModal();
  };
  return (
    <div style={{ marginTop }} ref={svgRef}>
      <Flyer />
      <RsvpFooter toggleInfo={toggleInfo} toggleRsvp={toggleRsvp} />
      <RsvpModal
        updateRsvp={updateRsvp}
        submit={submit}
        rsvp={rsvp}
        toggleNotify={toggleNotify}
        ready={readyToSubmit}
        content={whichModal}
        toggleModal={toggleModal}
      />
    </div>
  );
}
