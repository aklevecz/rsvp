import { TellMore } from "../../components/Responses/TellMore";
import { Yes } from "../../components/Responses/Yes";
import { Sections, SectionState } from "../../types";
import ButtonWrapper from "../../components/Wrappers/Button";
import { ResponsesInfo } from "../../components/Responses/ResponsesInfo";
import { useEffect, useState } from "react";
import { BACKGROUND_COLOR } from "../../constants";
import { ResponsesReceipt } from "../../components/Responses/ResponsesReceipt";
import { changeAll } from "../../actions";
import { services } from "../..";

type Props = {
  responses: SectionState;
  dispatch: any;
};

export default function Responses({ responses, dispatch }: Props) {
  const [contactInfo, setContactInfo] = useState("");
  const [notifyDesc, setNotifyDesc] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleTextAreaChange = (e: any) => setNotifyDesc(e.target.value);
  const handleContactInfoChange = (e: any) => setContactInfo(e.target.value);

  const sendIt = () => {
    setIsSending(true);
    services
      .sendRSVP(notifyDesc, contactInfo)
      .then((d) => {
        setIsSending(false);
        if (d.success) {
          changeAll(dispatch, 3);
          window.history.pushState("", "details", "details");
        }
      })
      .catch((e) => {
        setIsSending(false);
        console.log(e);
      });
  };

  useEffect(() => {
    const buttonWrappers = document.getElementsByClassName("button-wrapper");
    if (buttonWrappers.length > 0) {
      for (let i = 0; i < buttonWrappers.length; i++) {
        const buttonSvg = buttonWrappers[i].querySelector("svg");

        buttonSvg!.ontouchstart = () => (buttonSvg!.style.stroke = "red");
        buttonSvg!.ontouchend = () => (buttonSvg!.style.stroke = "unset");
      }
    }

    const buttons = document.getElementsByTagName("button");
    if (buttons.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i]!.ontouchstart = () => (buttons[i].style.background = "red");
        buttons[i]!.ontouchend = () =>
          (buttons[i].style.background = BACKGROUND_COLOR);
      }
    }
  }, [responses.state]);

  return (
    <>
      {responses.state === Sections.INITIAL && (
        <div>
          <ButtonWrapper
            onClick={() => {
              window.history.pushState({}, "confirm", "confirm");
              changeAll(dispatch, 2);
            }}
          >
            <Yes />
          </ButtonWrapper>
          <ButtonWrapper onClick={() => changeAll(dispatch, 1)}>
            <TellMore />
          </ButtonWrapper>
        </div>
      )}
      {responses.state === Sections.INFO && (
        <ButtonWrapper onClick={() => changeAll(dispatch, 0)}>
          <ResponsesInfo />
        </ButtonWrapper>
      )}
      {responses.state === Sections.CONFIRM && (
        <div className="responses__confirm__container">
          <div className="textarea__container">
            <textarea
              onChange={handleTextAreaChange}
              rows={3}
              placeholder="describe here... (optional)"
            />
          </div>
          <div className="input__wrapper">
            <div className="input__label">email and/or phone</div>
            <input onChange={handleContactInfoChange} />
          </div>
          <button
            disabled={isSending || !contactInfo}
            className={`${isSending ? "sending" : ""}`}
            onClick={sendIt}
          >
            {contactInfo ? "rsvp" : "..."}
          </button>
        </div>
      )}
      {responses.state === Sections.RECEIPT && (
        <a
          target="_blank"
          rel="noreferrer"
          href="https://calendar.google.com/event?action=TEMPLATE&tmeid=N3BwbGhkNmo4NmFwdnBvMWJnMThzbTdtbW0gMW5rdWk4aXNpaDYxc2c5M3I1bW5zbDlpazRAZw&tmsrc=1nkui8isih61sg93r5mnsl9ik4%40group.calendar.google.com"
        >
          <ResponsesReceipt />
        </a>
      )}
    </>
  );
}
