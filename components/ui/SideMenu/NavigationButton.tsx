import Link from "next/link"
import { useRouter } from "next/router";

interface NavigationButtonProps {
    text: string;
    link: string;
}

const NavigationButton = ({ text, link }: NavigationButtonProps) => {
    const router = useRouter();

    return (
        <button className={`w-[230px]  text-left rounded-3xl border-l-4 border-r-4 border-t border-b-2
        ${router.asPath === link
                ? 'border-[#ffffff] hover:text-[#9cc4c0]'
                : 'border-[#ffffff] hover:text-[#ffffff] hover:text-[#000000]'
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