import {InlineIcon} from "@iconify/react";
import Menu from "./Menu";
import React, {useEffect, useRef, useState} from "react";

export default function CollapsibleMenu (props) {
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
        <span className={props.className + ' relative inline-flex items-center'}>
            <button onClick={() => {setCollapsed(!collapsed)}} className={'inline-block box-border'}>
                <InlineIcon className={'text-primary'} icon={"ph:dots-three-outline-fill"}/>
            </button>
            <Menu innerRef={wrapperRef} collapsed={collapsed} options={props.options}/>
        </span>
    )
}