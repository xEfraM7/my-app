import { FormFieldProps } from "@/types/FormTypes";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Controller } from "react-hook-form";

export const FormField = ({
  type,
  placeholder,
  name,
  error,
  label,
  control
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
          />
        )}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};
