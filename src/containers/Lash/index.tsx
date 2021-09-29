import { useEffect } from "react";
import { Flyer } from "./Flyer";

export default function Lash() {
  useEffect(() => {
    const sun = document.querySelector("#sun > circle") as HTMLElement;
    sun.style.animation = "pulse 500ms infinite alternate";
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Flyer />
    </div>
  );
}
