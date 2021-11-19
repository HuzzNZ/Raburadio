import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import RenderArtist from "../Tools/RenderArtist";
import SongList from "../SongView/SongList";
import Menu from "../MenuView/Menu";
import {useGlobalState} from "state-pool";
import {Album} from "../../api/interfaces";

interface AlbumCardProps {
    album: Album | null
    lines: number
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, lines }) => {
    const [baseURL, setBaseURL] = useState<string>('')
    const [useNative] = useGlobalState('useNative')
    
    useEffect(() => {
        setBaseURL(window.location.host)
    }, [])
    
    if (!album) return null
    
    const mainTitle = (album.titleRom === "" || useNative)? album.titleNat : album.titleRom
    const imgUrl = `/albums/${album.id}.jpg`
    return (
        <div className={'h-max w-144 relative mb-6 mr-6'}>
            <Link href={`/albums/[id]`} as={`/albums/${album.id}`} passHref>
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
                                    <Link href={`/albums/[id]`} as={`/albums/${album.id}`} >{mainTitle}</Link>
                                </p>
                            </span>
                            <Menu className={'flex-none text-md inline-block'} options={['Copy Link']} linkToCopy={`${baseURL}/albums/${album.id}`}/>
                        </div>
                        { (album.titleRom === "" || useNative)? null : <p className={'dark:text-secondary text-xs text-secondary font-light tracking-wide truncate'}>{album.titleNat}</p> }
                        <div>
                            <p className={'inline-block text-md text-primary dark:text-primary'}>{<RenderArtist artists={album.artists}/>}</p>
                            <p className={'inline-block text-secondary dark:text-secondary mx-1'}>·</p>
                            <p className={'inline-block text-secondary dark:text-secondary text-sm font-bold'}>{(new Date(album.releaseDate)).getUTCFullYear()}</p>
                        </div>
                    </div>
                </div>
                <div className={'p-2'}>
                    <SongList songs={album.songs} lines={lines} albumId={album.id}/>
                </div>
            </div>
        </div>
    )
}

export default AlbumCard
