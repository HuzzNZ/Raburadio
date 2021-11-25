import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderArtist from "../Tools/RenderArtist";
import SongList from "../SongView/SongList";
import Menu from "../MenuView/Menu";
import {Album} from "../../api/interfaces";
import {useBaseURL} from "../Hooks/useBaseURL";
import {useNative} from "../Hooks/useNative";
import {getLocalizedSubtitle, getLocalizedTitle} from "../Tools/Localization";

interface AlbumCardProps {
    album: Album | null
    lines: number
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, lines }) => {
    const baseURL = useBaseURL()
    const native = useNative()
    
    if (!album) return null
    
    const title = getLocalizedTitle(album.titleNat, album.titleRom, native)
    const subtitle = getLocalizedSubtitle(album.titleNat, album.titleRom, native)
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
                                    <Link href={`/albums/[id]`} as={`/albums/${album.id}`} >{title}</Link>
                                </p>
                            </span>
                            <Menu className={'flex-none text-md inline-block'} options={['Copy Link']} linkToCopy={`${baseURL}/albums/${album.id}`}/>
                        </div>
                        { subtitle? <p className={'dark:text-secondary text-xs text-secondary font-light tracking-wide truncate'}>{subtitle}</p> : null }
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
