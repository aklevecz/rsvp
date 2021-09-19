import Initial from "../../components/Top/Initial";
import { TopConfirm } from "../../components/Top/TopConfirm";
import { TopInfo } from "../../components/Top/TopInfo";
import { TopReceipt } from "../../components/Top/TopReceipt";
import { Sections, SectionState } from "../../types";

type Props = {
  top: SectionState;
};

export default function Top({ top }: Props) {
  return (
    <div>
      {top.state === Sections.INITIAL && <Initial />}
      {top.state === Sections.INFO && <TopInfo />}
      {top.state === Sections.CONFIRM && <TopConfirm />}
      {top.state === Sections.RECEIPT && <TopReceipt />}
    </div>
  );
}
