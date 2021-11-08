import React, {useEffect, useState} from "react";
import {InlineIcon} from "@iconify/react";

export default function Menu (props) {
    const [collapsed, setCollapsed] = useState(props.collapsed)

    useEffect(() => {
        setCollapsed(props.collapsed)
    }, [props.collapsed])

    const buttons = {
        "Copy Link": {
            callback: () => {
                console.log("Link Copied")
            },
            icon: "ph:link-simple-bold"
        },
        "Download": {
            callback: () => {
                console.log("Downloaded")
            },
            icon: "ph:download-simple-bold"
        }
    }
    let jsx = []
    for (let option of props.options) {
        jsx.push(
            <button key={option} onClick={() => {setCollapsed(true); buttons[option].callback()}} className={'h-6 w-full px-2 flex items-center hover:bg-blue-500 hover:bg-opacity-25 text-sm rounded-md'}>
                <div className={'space-x-2'}>
                    <InlineIcon className={"inline text-primary"} icon={buttons[option].icon}/>
                    <p className={'inline font-light'}>{option}</p>
                </div>
            </button>
        )
    }

    return (
        <div ref={props.innerRef} key={collapsed? 'hidden' : 'visible'} className={'absolute -top-1 -right-2 w-40 bg-white bg-opacity-50 bg-clip-padding rounded-lg p-1 shadow-md backdrop-blur z-20' + (collapsed? ' hidden' : '')}>
            {jsx}
        </div>
    )
}
