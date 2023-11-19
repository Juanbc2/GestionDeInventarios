import Link from "next/link";
import { useRouter } from "next/router";

interface NavigationButtonProps {
  text: string;
  link: string;
}

const NavigationButton = ({ text, link }: NavigationButtonProps) => {
  const router = useRouter();

  const setButtonColor = () => {
    if (router.asPath === link) {
      return "border-blue-700 hover:text-blue-600";
    } else {
      return "border-slate-950 hover:text-blue-600 hover:border-blue-500";
    }
  };

  return (
    <button
      className={`w-[230px] border-2 rounded-sm text-left ${setButtonColor}`}
    >
      <Link aria-haspopup="false" href={link}>
        <h2 className="px-8 py-2 text-lg">{text}</h2>
      </Link>
    </button>
  );
};

export { NavigationButton };
