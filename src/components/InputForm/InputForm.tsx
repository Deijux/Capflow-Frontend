import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../models";

interface InputFormProps {
  name: keyof FormValues;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  control: Control<FormValues>;
  error?: FieldError;
  step?: string;
  min?: string;
}

const InputForm = ({
  name,
  label,
  type,
  placeholder,
  value,
  control,
  error,
  step,
  min,
}: InputFormProps) => {
  if (name === "description") {
    return (
      <div>
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              value={value}
              rows={4}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                error ? "border-red-500" : ""
              }`}
            />
          )}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            step={step}
            min={type === "number" ? min : undefined}
            type={type}
            placeholder={placeholder}
            value={
              Array.isArray(field.value)
                ? JSON.stringify(field.value)
                : type === "number"
                  ? field.value !== undefined
                    ? field.value
                    : ""
                  : field.value || ""
            }
            onChange={(e) => {
              if (type === "number") {
                const numValue =
                  e.target.value === "" ? undefined : Number(e.target.value);
                field.onChange(numValue);
              } else {
                field.onChange(e.target.value);
              }
            }}
            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
              error ? "border-red-500" : ""
            }`}
          />
        )}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputForm;
