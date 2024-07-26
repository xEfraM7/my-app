import { FormFieldProps } from "@/types/FormTypes";
import { Input } from "../ui/input";

export const FormArticlesField = ({
  type,
  name,
  error,
  value,
  onChange,
  placeholder
}: FormFieldProps) => {
  return (
    <>
      <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
};
