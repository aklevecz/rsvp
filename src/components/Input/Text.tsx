type Props = {
  name: string;
  onChange: (name: string, value: string) => void;
};

export default function InputText({ name, onChange }: Props) {
  return (
    <div style={{ maxWidth: 300, width: "80%", margin: 2 }}>
      <div style={{ fontWeight: 500, margin: 4, textTransform: "capitalize" }}>
        {name}
      </div>
      <input
        onChange={(e) => onChange(name, e.currentTarget.value)}
        name={name}
        type="text"
      />
    </div>
  );
}
