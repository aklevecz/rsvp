import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useModalState, useModalToggle } from "../../contexts/Modal";
import "./index.css";

export default function Modal({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const modalState = useModalState();
  const { toggleModal } = useModalToggle();
  return createPortal(
    <AnimatePresence>
      {modalState.open && (
        <div>
          <div className="modal__container">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="modal__content"
            >
              <div className="modal__title-big">RSVP</div>
              <div className="modal__content__wrapper">{children}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="modal__bg"
              onClick={toggleModal}
            />
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
}
