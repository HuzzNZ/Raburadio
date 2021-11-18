import React, {useEffect, useState} from "react";
import {InlineIcon} from "@iconify/react";
import {useGlobalState} from "state-pool";
import DownloadFormats from "../Tools/DownloadFormats";

export default function MenuContents (props) {
    const [collapsed, setCollapsed] = useState(props.collapsed)
    const [defaultDownloadFormat] = useGlobalState('defaultDownloadFormat')

    useEffect(() => {
        setCollapsed(props.collapsed)
    }, [props.collapsed])

    const buttons = {
        "Copy Link": {
            callback: () => {
                if (props.linkToCopy) {
                    navigator.clipboard.writeText(props.linkToCopy).then(
                        () => {
                            console.log(`Copied Link ${props.linkToCopy} to Clipboard`)
                        }
                    )
                }
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
            <button key={option} onClick={() => {setCollapsed(true); buttons[option].callback()}} className={(props.fullAlbumMode? 'h-8':'h-6') + ' w-full px-2 flex items-center hover:bg-blue-500 hover:bg-opacity-25 dark:hover:bg-opacity-40 text-sm rounded-md'}>
                <div className={'space-x-2'}>
                    <InlineIcon className={"inline text-primary"} icon={buttons[option].icon}/>
                    <p className={'inline font-light'}>{option}
                        {option==='Download'? <span className={'ml-2 italic text-xs font-light text-secondary dark:text-secondary'}>
                            {DownloadFormats[defaultDownloadFormat].title}{" "}
                            {DownloadFormats[defaultDownloadFormat].quality}
                        </span> : null}
                    </p>
                </div>
            </button>
        )
    }

    return (
        <div ref={props.innerRef} key={collapsed? 'hidden' : 'visible'} className={'absolute -top-1 -right-2 ' + (props.fullAlbumMode? 'w-60' : 'w-48') + ' bg-white dark:bg-dark-50 bg-opacity-50 bg-clip-padding rounded-lg p-1 shadow-md backdrop-blur z-20' + (collapsed? ' hidden' : '')}>
            {jsx}
        </div>
    )
}
