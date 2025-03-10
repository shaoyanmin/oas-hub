interface ProjectHeaderSelectorProps {
  name: string;
  value: string | null;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string | null) => void;
  placeholder: string;
  isReadonly: boolean;
  isDisabled: boolean;
}

export const ProjectHeaderSelector: React.FC<ProjectHeaderSelectorProps> = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  isReadonly = false,
  isDisabled = false,
}) => {
  return (
    <div>
      {isReadonly ? (
        <code>{value ?? ""}</code>
      ) : (
        <>
          <label htmlFor={name} className="ml-2 mr-4">
            {name}
          </label>
          <select
            id={name}
            className="border rounded px-2 py-1 text-sm"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || null)}
            disabled={isDisabled}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};
