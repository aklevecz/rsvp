import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "../..";
import Modal from "../Modal";

export default function UpdateInfoModal({
  userInfo,
  fingerprint,
  toggleModal,
  updateFingerprint,
}: {
  userInfo: string;
  fingerprint: string;
  toggleModal: () => void;
  updateFingerprint: () => void;
}) {
  const [updateInfo, setUpdateInfo] = useState(userInfo);
  const [updating, setUpdating] = useState(false);
  const userInfoRef = useRef<string>(userInfo);

  const onChange = (e: any) => {
    setUpdateInfo(e.currentTarget.value);
  };

  const update = () => {
    setUpdating(true);
    services.updateInfoWithFingerprint(fingerprint, updateInfo).then(() => {
      setUpdating(false);
      toggleModal();
      updateFingerprint();
      userInfoRef.current = updateInfo;
    });
  };

  return (
    <Modal>
      <div className="modal__block">
        <input value={updateInfo} onChange={onChange} type="text" />
        <button
          onClick={update}
          style={{ marginTop: 20 }}
          disabled={userInfoRef.current === updateInfo || updating}
        >
          {updating ? (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="dot"
            />
          ) : (
            "Update"
          )}
        </button>
      </div>
    </Modal>
  );
}
