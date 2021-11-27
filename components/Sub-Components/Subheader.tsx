import React from "react";
import Link from "next/link";

interface SubheaderProps {
    title: string
    linkTitle?: string
    linkURL?: string
}

const Subheader: React.FC<SubheaderProps> = ({title, linkTitle, linkURL}) => {
    return (
        <h2>{title}
            {linkTitle?
                <span className={'ml-2 text-sm font-light text-primary dark:text-primary italic hover:underline'}>
                    <Link href={linkURL || "#"}>{linkTitle}</Link>
                </span> : null}
        </h2>
    )
}

export default Subheader
