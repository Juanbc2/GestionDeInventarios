import Link from "next/link"
import { useRouter } from "next/router";

interface NavigationButtonProps {
    text: string;
    link: string;
}

const NavigationButton = ({ text, link }: NavigationButtonProps) => {
    const router = useRouter();

    return (
        <button className={`w-[230px] border-2 rounded-lg text-left
        ${router.asPath === link
                ? 'border-[#2D8F1D] hover:text-[#2D8F1D]'
                : 'border-slate-950 hover:text-[#2D8F1D] hover:border-[#2D8F1D]'
            }`}>
            <Link
                aria-haspopup='false'
                href={link}>
                <h2 className="px-8 py-2 text-lg">{text}</h2>
            </Link>
        </button>
    )
}

export { NavigationButton }