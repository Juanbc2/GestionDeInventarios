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
      className="bg-[#0c1114] hover:bg-[#2e8d99] text-white  py-2 px-4 rounded"
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
