import Logo from "./Sub-Components/Logo";
import DownloadFormats from "./Tools/DownloadFormats";
import React, {ReactElement, useEffect, useState} from "react";
import {useGlobalState} from "state-pool";
import {InlineIcon} from "@iconify/react";
import Copyrights from "./Sub-Components/Copyrights";

export default function Sidebar () {
    const [useNative, setUseNative] = useGlobalState('useNative')
    const [useDarkMode, setUseDarkMode] = useGlobalState('useDarkMode')
    const [defaultDownloadFormat, setDefaultDownloadFormat] = useGlobalState('defaultDownloadFormat')
    const [downloadOptions, setDownloadOptions] = useState([])

    useEffect(() => {
        let downloadOptionsJsx: ReactElement[] = []
        for (const format in DownloadFormats){
            const thisFormat = DownloadFormats[format]
            const isSelected: boolean = format === defaultDownloadFormat
            downloadOptionsJsx.push(
                <div key={format} className={'flex items-center cursor-pointer'} onClick={() => {setDefaultDownloadFormat(format)}}>
                    <button className={'flex items-center justify-center h-4 w-4 text-white rounded-2xl mr-2 shadow-inner transition-colors duration-300 ' + (isSelected? 'bg-primary dark:bg-primary' : 'bg-gray-200 dark:bg-dark-200')}>
                        {isSelected? <InlineIcon className={'inline-block text-sm'} icon={'ph:check-bold'} /> : null}
                    </button>
                    <p className={'text-sm'}>{thisFormat.title}<span className={'text-xs italic text-secondary dark:text-secondary ml-2'}>{thisFormat.quality}</span></p>
                </div>
            )
        }
        setDownloadOptions(downloadOptionsJsx)
    }, [defaultDownloadFormat, setDefaultDownloadFormat])


    return (
        <div className={'w-72 h-screen bg-background-sidebar-light dark:bg-background-sidebar-dark transition duration-300 flex-none shadow-inner fixed flex flex-col'}>
            <Logo className={'flex-grow-0'}/>
            <div className={'m-3 px-3 flex flex-col flex-grow'}>
                <div className={'flex-grow space-y-3'}>
                    <p className={'text-sm text-secondary dark:text-secondary font-bold'}>Debug Menu</p>
                    <hr className={'mt-0'}/>
                    <div>
                        <div className={'flex items-center text-sm'}>
                            <button onClick={() => {setUseNative(!useNative)}} className={'h-7 w-32 bg-primary rounded-lg text-white mr-2'}>
                                Toggle Locale
                            </button>
                            <p>{useNative? 'Native' : 'Romanized'}</p>
                        </div>
                    </div>
                    <div>
                        <div className={'flex items-center text-sm'}>
                            <button onClick={() => {setUseDarkMode(!useDarkMode)}} className={'h-7 w-32 bg-primary rounded-lg text-white mr-2'}>
                                Toggle Dark Mode
                            </button>
                            <p>{useDarkMode? 'Dark' : 'Light'}</p>
                        </div>
                    </div>
                    <hr className={'mt-0'}/>
                    <div className={'flex flex-col space-y-1'}>
                        {downloadOptions}
                    </div>
                </div>
                <Copyrights/>
            </div>
        </div>
    )
}
