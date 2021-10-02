import InputText from "../../components/Input/Text";
import Modal from "../Modal";

type Props = {
  updateRsvp: any;
};

export default function RsvpModal({ updateRsvp }: Props) {
  return (
    <Modal>
      <div className="modal__block">
        <InputText onChange={updateRsvp} name="name" />
        <InputText onChange={updateRsvp} name="email" />
        <InputText onChange={updateRsvp} name="phone" />
      </div>
      <div className="modal__block" style={{ marginTop: 30 }}>
        <button>Go</button>
      </div>
    </Modal>
  );
}
