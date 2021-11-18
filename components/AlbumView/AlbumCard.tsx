import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import RenderArtist from "../Tools/RenderArtist";
import ListSongs from "../SongView/ListSongs";
import CollapsibleMenu from "../MenuView/CollapsibleMenu";
import {useGlobalState} from "state-pool";

export default function AlbumCard(props) {
    const [baseURL, setBaseURL] = useState('')
    useEffect(() => {
        setBaseURL(window.location.host)
    }, [])
    const [useNative] = useGlobalState('useNative')
    const payload = props.payload
    if (props.payload === undefined) return null
    const mainTitle = (payload.titleRom === "" || useNative)? payload.titleNat : payload.titleRom
    const imgUrl = `/albums/${payload.id}.jpg`
    return (
        <div className={'h-max w-144 relative mb-6 mr-6'}>
            <Link href={`/albums/[id]`} as={`/albums/${payload.id}`} passHref>
                <a className={'block h-26 w-26 absolute z-50 transform rotate-355 rounded-2xl shadow-lg'}>
                    <div className={'w-full h-full relative'}>
                        <Image src={imgUrl} className={'rounded-2xl'} layout={'fill'} objectFit="cover" alt={'Album Cover'}/>
                    </div>
                </a>
            </Link>
            <div className={'h-2'}/>
            <div className={'w-140 ml-4 bg-gray-100 dark:bg-dark-100 transition duration-300 shadow-lg rounded-2xl'}>
                <div className={'flex flex-nowrap max-w-full flex-none flex-row h-26'}>
                    <div className={'flex-shrink-0 w-20 mr-7'}/>
                    <div className={'mt-3 mr-4 w-full min-w-0'}>
                        <div className={'inline-flex w-full text-xl align-middle'}>
                            <span className={'inline-block flex-grow truncate mr-2'}>
                                <p className={'hover:underline inline-block'}>
                                    <Link href={`/albums/[id]`} as={`/albums/${payload.id}`} >{mainTitle}</Link>
                                </p>
                            </span>
                            <CollapsibleMenu className={'flex-none text-md inline-block'} options={['Copy Link']} linkToCopy={`${baseURL}/albums/${payload.id}`}/>
                        </div>
                        { (payload.titleRom === "" || useNative)? null : <p className={'dark:text-secondary text-xs text-secondary font-light tracking-wide truncate'}>{payload.titleNat}</p> }
                        <div>
                            <p className={'inline-block text-md text-primary dark:text-primary'}>{<RenderArtist artists={payload.artists}/>}</p>
                            <p className={'inline-block text-secondary dark:text-secondary mx-1'}>·</p>
                            <p className={'inline-block text-secondary dark:text-secondary text-sm font-bold'}>{(new Date(payload.releaseDate)).getUTCFullYear()}</p>
                        </div>
                    </div>
                </div>
                <div className={'p-2'}>
                    <ListSongs songs={payload.songs} lines={props.lines} albumId={payload.id}/>
                </div>
            </div>
        </div>
    )
}