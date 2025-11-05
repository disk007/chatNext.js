import { useFormStatus } from "react-dom";

interface ButtonProps {
  className: string;
  type?: "button" | "submit" | "reset";
  text: string;
  disabled?:boolean;
  onClick?: () => void;
}

export const Button = ({ className, type , text,disabled = false,onClick  }: ButtonProps) => {
  // code
  const { pending } = useFormStatus();
  const isDisabled = pending || disabled;
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={`${className} capitalize ${
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {pending ? "Please wait..." : text}
    </button>

  );
};