import { CircularProgress } from "@mui/material";
import { useState } from "react";

interface DialogButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | undefined;
}

const DialogButton = ({ text, onClick, type }: DialogButtonProps) => {
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);

  return (
    <button
      className="m-5 py-2 px-5 rounded-lg text-slate-50 bg-[#2D8F1D] hover:bg-green-800 font-bold text-lg"
      onClick={() => {
        setIsCreateButtonDisabled(true);
        onClick();
      }}
      type={type}
    >
      {isCreateButtonDisabled ? (
        <CircularProgress size={15} color="inherit" />
      ) : null}{" "}
      {text}
    </button>
  );
};

export { DialogButton };
