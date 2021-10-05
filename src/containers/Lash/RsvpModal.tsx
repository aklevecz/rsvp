import { RSVP } from ".";
import InputCheckbox from "../../components/Input/Checkbox";
import InputText from "../../components/Input/Text";
import Modal from "../Modal";
import voltaLogo from "./volta_white_logo.png";
import prugoLogo from "./prugo.png";
const ocpLogo = "https://f4.bcbits.com/img/0014581126_10.jpg";

type Props = {
  updateRsvp: (name: string, value: string) => void;
  toggleNotify: () => void;
  submit: () => void;
  rsvp: RSVP;
  ready: boolean;
  content: "rsvp" | "info";
  toggleModal: () => void;
};

export default function RsvpModal({
  updateRsvp,
  rsvp,
  submit,
  toggleNotify,
  ready,
  content,
  toggleModal,
}: Props) {
  let modalContent = <div></div>;

  if (content === "rsvp") {
    modalContent = (
      <>
        <div className="modal__block">
          <InputText onChange={updateRsvp} name="name" value={rsvp.name} />
          <InputText onChange={updateRsvp} name="email" value={rsvp.email} />
          <InputText onChange={updateRsvp} name="phone" value={rsvp.phone} />
          <InputCheckbox
            name="Remind me?"
            toggleCheck={toggleNotify}
            checked={rsvp.notify}
          />
        </div>
        <div className="modal__block" style={{ marginTop: 30 }}>
          <button disabled={!ready || rsvp.fetching} onClick={submit}>
            {rsvp.fetching ? "..." : "Go"}
          </button>
        </div>
      </>
    );
  }

  if (content === "info") {
    modalContent = (
      <div className="modal__block">
        <div
          style={{ background: "black", marginBottom: 8 }}
          onClick={() => (window.open("https://voltacollective.com"), "_blank")}
        >
          <img style={{ width: "100%", height: "100%" }} src={voltaLogo} />
        </div>
        <div
          style={{ marginBottom: 6 }}
          onClick={() =>
            window.open("https://dian-nao.bandcamp.com/", "_blank")
          }
        >
          <img style={{ width: "100%", height: "100%" }} src={ocpLogo} />
        </div>
        <div
          onClick={() => (
            window.open("https://www.instagram.com/philiprugo"), "_blank"
          )}
        >
          <img src={prugoLogo} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className="modal__block" style={{ marginTop: 30 }}>
          <button onClick={toggleModal}>Cool!</button>
        </div>
      </div>
    );
  }

  if (rsvp.submitted && content === "rsvp") {
    modalContent = (
      <>
        <div className="modal__block" style={{ fontSize: "2rem" }}>
          see you there :)
        </div>
        <div className="modal__block" style={{ marginTop: 30 }}>
          <button onClick={toggleModal}>Ok</button>
        </div>
      </>
    );
  }

  return <Modal>{modalContent}</Modal>;
}
