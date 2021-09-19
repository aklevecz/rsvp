import React from "react";

export default function NumberForm({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form>
      <input
        onChange={onChange}
        className="leave-number__field"
        type="text"
        name="number"
      ></input>
    </form>
  );
}
