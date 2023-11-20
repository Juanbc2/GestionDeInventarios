interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button
      className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
