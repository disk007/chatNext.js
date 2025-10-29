import { useFormStatus } from "react-dom";

interface ButtonProps {
  className: string;
  type?: "button" | "submit" | "reset";
  text: string;
}

export const Button = ({ className, type , text }: ButtonProps) => {
  // code
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type={type}
      className={`${className} capitalize cursor-pointer ${
        pending ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Please wait..." : text}
    </button>

  );
};