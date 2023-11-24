interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
}

const PrimaryButton = ({ text, onClick }: PrimaryButtonProps) => {
  return (
    <button
      className="bg-[#0c1114] hover:bg-[#2e8d99] text-white  py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { PrimaryButton };
