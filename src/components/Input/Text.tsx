type Props = {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
};

export default function InputText({ name, value, onChange }: Props) {
  return (
    <div style={{ maxWidth: 300, width: "80%", margin: 2 }}>
      <div style={{ fontWeight: 500, margin: 4, textTransform: "capitalize" }}>
        {name}
      </div>
      <input
        onChange={(e) => onChange(name, e.currentTarget.value)}
        name={name}
        value={value}
        type="text"
      />
    </div>
  );
}
