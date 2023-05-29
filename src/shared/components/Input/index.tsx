import React from "react";

const Input = (props: any) => {
  const { title, type, id } = props;
  return (
    <React.Fragment>
      <label
        className="block text-neutral-700 text-[14px] font-semibold mb-2"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
      />
    </React.Fragment>
  );
};

export default Input;

type InputProps = {
  value?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: any) => void;
  onPressEnter?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  type?: "text" | "password" | "email";
  label?: string | React.ReactNode | undefined;
  required?: boolean;
  register?: any;
  validation?: any;
  ref?: any;
  ShowPasswordIcon?: React.ReactNode | undefined;
  error?: any; // Error message
};

export const AntdInput: React.FC<InputProps> = ({
  value,
  name,
  defaultValue,
  placeholder,
  onChange,
  onPressEnter,
  disabled = false,
  className = "",
  type,
  label,
  required = false,
  register,
  validation,
  error,
  ref,
  ShowPasswordIcon,
  ...props
}) => {
  const hasError = !!error; // Check if there is an error

  const handleChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`relative ${required ? "required" : ""}`}>
      {required && (
        <span className="absolute top-0 left-0 text-red-500">*</span>
      )}
      <label
        style={{ marginLeft: required ? "10px" : "0px" }}
        className="block text-neutral-700 text-sm font-semibold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          {...register(name, validation)}
          name={name}
          className={`h-[42px] pr-10 shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-500 leading-tight transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${
            hasError
              ? "border border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 hover:border-red-500 hover:ring-1 hover:ring-red-500"
              : "focus:outline-none focus:ring-1 focus:ring-cyan-800 hover:border-cyan-800 hover:ring-1 hover:ring-cyan-800"
          }${className}`}
          id={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={ handleChange}
          disabled={disabled}
          type={type}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && onPressEnter) {
              onPressEnter(event.currentTarget.value);
            }
          }}
          {...props}
        />
        {ShowPasswordIcon && <>{ShowPasswordIcon}</>}
      </div>
      {hasError && <span className="text-sm mt-1 text-red-500">{error}</span>}
    </div>
  );
};
