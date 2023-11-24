import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface NavigationButtonProps {
  text: string;
  link: string;
}

const NavigationButton = ({ text, link }: NavigationButtonProps) => {
  const router = useRouter();

  const [style, setStyle] = useState("");
  const styleChecker = () => {
    let style =
      "w-[230px] text-left rounded-3xl border-l-4 border-r-4 border-t border-b-2 ";
    style =
      style +
      (router.asPath === link
        ? "border-[#ffffff] text-[#fff] hover:bg-[#10b9ab] hover:border-[#000000]"
        : "border-[#000000] hover:bg-[#10b9ab] hover:text-[#9cc4c0]");
    setStyle(style);
  };

  useEffect(() => {
    styleChecker();
  }, [style]);

  return (
    <button className={style + "bg-[#10b9ab]"}>
      <Link aria-haspopup="false" href={link}>
        <h2 className="px-8 py-2 text-lg">{text}</h2>
      </Link>
    </button>
  );
};

export { NavigationButton };
