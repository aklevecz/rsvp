import React, { useState } from "react";
import { services } from "../..";
import NumberForm from "./NumberForm";
import { Text } from "./Text";

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

  return (
    <div>
      <Text />
      {!success && <NumberForm onChange={onChange} />}
      {!success && <button onClick={send}>{!sending ? "Send" : "..."}</button>}
      {success && (
        <div style={{ fontSize: 50, color: "red" }}>
          Great, we'll be in touch!
        </div>
      )}
      {error}
    </div>
  );
}
