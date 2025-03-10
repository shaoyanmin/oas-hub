import { useMemo } from "react";
import Select from "react-select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface ProjectHeaderSelectProps {
  name: string;
  value: string | null;
  options: SelectOption[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  isDisabled: boolean;
}

export const ProjectHeaderSelect: React.FC<ProjectHeaderSelectProps> = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  isDisabled = false,
}) => {
  const defaultOption = useMemo(
    () => ({
      value: null,
      label: placeholder ?? "Select an option",
      isDisabled: true,
    }),
    [placeholder],
  );
  const selectedOption =
    options.find((option) => option.value === value) ?? defaultOption;
  const selectOptions = useMemo(
    () => [defaultOption, ...options],
    [options, defaultOption],
  );

  return (
    <div>
      <label htmlFor={name} className="ml-2 mr-4">
        {name}
      </label>
      <Select
        className="inline-flex px-2 py-1 text-sm"
        defaultValue={selectedOption}
        value={selectedOption}
        options={selectOptions}
        onChange={(e) => {
          if (e?.value !== value) {
            onChange(e?.value ?? null);
          }
        }}
        isDisabled={isDisabled}
      />
    </div>
  );
};
