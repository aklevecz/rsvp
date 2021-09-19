import { useEffect } from "react";
import Initial from "../../components/Prompt/Initial";
import { PromptConfirm } from "../../components/Prompt/PromptConfirm";
import { PromptInfo } from "../../components/Prompt/PromptInfo";
import { PromptReceipt } from "../../components/Prompt/PromptReceipt";
import { Sections, SectionState } from "../../types";

type Props = {
  prompt: SectionState;
};

export default function Prompt({ prompt }: Props) {
  useEffect(() => {
    if (prompt.state === Sections.RECEIPT) {
      const copyButton = document.getElementById("COPY_ADDRESS");
      if (copyButton) {
        copyButton.onclick = () => {
          const address = "1821 La Cresta Dr. Pasadena 91103";
          console.log(address);
          alert(`${address} copied to your clipboard!`);
          navigator.clipboard
            .writeText(address)
            .then((r) => console.log(r))
            .catch((e) => {
              console.log(e);
            });
        };
      }
    }
  }, [prompt.state]);
  return (
    <div>
      {prompt.state === Sections.INITIAL && <Initial />}
      {prompt.state === Sections.INFO && <PromptInfo />}
      {prompt.state === Sections.CONFIRM && <PromptConfirm />}
      {prompt.state === Sections.RECEIPT && <PromptReceipt />}
    </div>
  );
}
