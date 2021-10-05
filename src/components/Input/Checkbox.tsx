import "./checkbox.css";

type Props = {
  name: string;
  checked: boolean;
  toggleCheck: () => void;
};

export default function InputCheckbox({ name, checked, toggleCheck }: Props) {
  return (
    <div className="checkbox__container">
      <label>{name}</label>
      <button
        onClick={toggleCheck}
        className={`checkbox ${checked ? "checked" : ""}`}
      />
    </div>
  );
}
