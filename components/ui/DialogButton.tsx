import { CircularProgress } from "@mui/material";
import { useState } from "react";

interface DialogButtonProps {
  text: string;
  onClick: () => void;
}

const DialogButton = ({ text, onClick }: DialogButtonProps) => {
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);

  return (
    <button
      className="m-5 py-2 px-5 rounded-lg text-slate-50 bg-[#10aeb9] hover:bg-[#05965a] font-bold text-lg"
      style={{ fontFamily: "Copperplate Gothic, serif", fontWeight: "bold" }}
      onClick={() => {
        setIsCreateButtonDisabled(true);
        onClick();
      }}
    >
      {isCreateButtonDisabled ? (
        <CircularProgress size={15} color="inherit" />
      ) : null}{" "}
      {text}
    </button>
  );
};

export { DialogButton };
