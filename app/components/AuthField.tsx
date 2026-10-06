type AuthFieldProps = {
  label: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function AuthField({
  label,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-[13px] font-bold text-[var(--text-sub)]">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange && ((e) => onChange(e.target.value))}
        className="input-field rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}
