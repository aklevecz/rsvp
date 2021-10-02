import { RSVP } from ".";
import InputText from "../../components/Input/Text";
import Modal from "../Modal";

type Props = {
  updateRsvp: (name: string, value: string) => void;
  submit: () => void;
  rsvp: RSVP;
};

export default function RsvpModal({ updateRsvp, rsvp, submit }: Props) {
  return (
    <Modal>
      <div className="modal__block">
        <InputText onChange={updateRsvp} name="name" value={rsvp.name} />
        <InputText onChange={updateRsvp} name="email" value={rsvp.email} />
        <InputText onChange={updateRsvp} name="phone" value={rsvp.phone} />
      </div>
      <div className="modal__block" style={{ marginTop: 30 }}>
        <button onClick={submit}>Go</button>
      </div>
    </Modal>
  );
}
