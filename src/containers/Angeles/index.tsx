import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { services } from "../..";
import { InTouch } from "./InTouch";
import NumberForm from "./NumberForm";
import { Yardy } from "./Yardy";

const gcalLink =
  "https://calendar.google.com/event?action=TEMPLATE&tmeid=MG81ZmlhaThlazR2bXFxNGkycnI4cnZxcjkgMW5rdWk4aXNpaDYxc2c5M3I1bW5zbDlpazRAZw&tmsrc=1nkui8isih61sg93r5mnsl9ik4%40group.calendar.google.com";

export default function Angeles() {
  const [number, setNumber] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNumber(e.target.value);

  const send = () => {
    setError("");
    setSending(true);
    services
      .leaveNumber(number)
      .then((r) => {
        if (r) {
          setSuccess(true);
        }
      })
      .catch((e) => {
        setError(e.message);
        setSending(false);
      });
  };

  useEffect(() => {
    const calLink = document.getElementById(
      "CAL_LINK"
    )! as unknown as SVGGElement;
    calLink.style.cursor = "pointer";
    calLink.onclick = () => (window.location.href = gcalLink);
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Yardy />
      </motion.div>

      {!success && (
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ delay: 1 }}
        >
          <div
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "rgb(129, 242, 239)",
              marginBottom: 18,
            }}
          >
            leave your # or email for updates
          </div>
          <NumberForm onChange={onChange} />
          <button
            className="leave-number"
            style={{ margin: 20 }}
            onClick={send}
          >
            {!sending ? "RSVP" : "..."}
          </button>
        </motion.div>
      )}
      {success && (
        <motion.div initial={{ x: -1000 }} animate={{ x: 0 }}>
          <InTouch />
        </motion.div>
      )}
      {error}
    </div>
  );
}
