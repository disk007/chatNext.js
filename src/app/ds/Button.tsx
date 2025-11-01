import { useFormStatus } from "react-dom";

interface ButtonProps {
  className: string;
  type?: "button" | "submit" | "reset";
  text: string;
  disabled?:boolean;
}

export const Button = ({ className, type , text,disabled = false }: ButtonProps) => {
  // code
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`${className} capitalize ${
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {pending ? "Please wait..." : text}
    </button>

  );
};