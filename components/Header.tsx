import { InlineIcon } from "@iconify/react";
import React from "react";

interface HeaderProps {
    icon?: string
    title?: string
}

const Header: React.FC<HeaderProps> = ({icon, title}) => {
    return (
        <div>
            <h1 className={'text-primary dark:text-primary'}>
                <InlineIcon className={'inline mr-2'} icon={icon || "ph:question-bold"}/>
                {title || 'Untitled Page'}
            </h1>
            <hr className={'mt-3'}/>
        </div>
    )
}

export default Header
