interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button
      className="bg-[#2D8F1D] hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
