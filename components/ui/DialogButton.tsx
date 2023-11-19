interface DialogButtonProps {
    text: string;
    onClick: () => void;
    type?: "button" | "submit" | undefined;
}

const DialogButton = ({ text, onClick, type }: DialogButtonProps) => {
    return (
        <button
            className="m-5 py-2 px-5 rounded-lg text-slate-50 bg-cyan-700 hover:bg-cyan-800 font-bold text-lg"
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
}

export { DialogButton }