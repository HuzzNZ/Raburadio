import {InlineIcon} from "@iconify/react";
import MenuContents from "./MenuContents";
import React, {useEffect, useRef, useState} from "react";

export interface MenuProps {
    options: string[]
    linkToCopy?: string
    fullAlbumMode?: boolean
}

interface CollapsibleMenuProps extends MenuProps {
    className?: string
}

const Menu: React.FC<CollapsibleMenuProps> = (props) => {
    const wrapperRef = useRef(null);
    const [collapsed, setCollapsed] = useState(true)

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setCollapsed(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <span className={props.className + ' relative inline-flex items-center select-none'}>
            <button onClick={() => {setCollapsed(!collapsed)}} className={'inline-block box-border'}>
                <InlineIcon className={'text-primary'} icon={"ph:dots-three-outline-fill"}/>
            </button>
            <MenuContents innerRef={wrapperRef} collapsed={collapsed} {...props}/>
        </span>
    )
}

export default Menu
