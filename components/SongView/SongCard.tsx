import React, {useEffect, useState} from "react";

import RenderArtist from "../Tools/RenderArtist";
import { InstrumentalTag, RadioDramaTag } from "./SongTags"
import Menu from "../MenuView/Menu";
import {useGlobalState} from "state-pool";
import {InlineIcon} from "@iconify/react";
import {Artist, Song} from "../../api/interfaces";

interface SongCardProps {
    song: Song
    albumArtists: Artist[]
    className?: string
    isSelected?: boolean
    fullAlbumMode?: boolean
    albumId?: string
}

const SongCard: React.FC<SongCardProps> = (props) => {
    const [baseURL, setBaseURL] = useState<string>('')
    const [useNative] = useGlobalState('useNative')

    useEffect(() => {
        setBaseURL(window.location.host)
    }, [])

    const song = props.song
    if (song === undefined) return null
    const fullAlbumMode = props.fullAlbumMode
    const title = song.titleRom !== ""? (useNative? song.titleNat : song.titleRom) : song.titleNat

    return (
        <div className={props.className}>
            <div className={'flex h-full justify-between items-center text-sm ' + (fullAlbumMode? 'px-5':'px-3')}>
                <span className={(fullAlbumMode? 'space-x-5' : 'space-x-3') + ' flex items-center'}>
                    <p className={"inline-block " + (fullAlbumMode? "w-5":"w-3.5") + " text-secondary dark:text-secondary"}>{song.albumOrder}</p>
                    <p className={"inline-block max-w-1/2 font-light overflow-ellipsis"}>{title}</p>
                    {
                        ((JSON.stringify(props.albumArtists) === JSON.stringify(song.artists)) || (song.artists.length === 0))? null :
                            <span className={"inline-block italic font-light text-secondary"}>
                                <RenderArtist artists={song.artists}/>
                            </span>
                    }
                    {
                        props.isSelected? <p className={'text-md text-primary dark:text-primary'}>
                            <InlineIcon className={'absolute animate-ping'} icon={'ph:circle-fill'} />
                            <InlineIcon className={'relative'} icon={'ph:circle-fill'} />
                        </p> : null
                    }
                </span>
                <span className={(fullAlbumMode? 'space-x-5' : 'space-x-3') + ' flex-none flex items-center'}>
                    {song.isInstrumental ? <InstrumentalTag/> : null}
                    {song.isRadioDrama? <RadioDramaTag/> : null}
                    <p className={"inline-block w-9 font-light text-secondary dark:text-secondary text-center"}>
                        {Math.floor(song.length / 60)}:{(song.length % 60+100).toString().slice(-2)}
                    </p>
                    <Menu className={'text-md ml-2'} options={['Copy Link', 'Download']} fullAlbumMode={fullAlbumMode} linkToCopy={`${baseURL}/cds/${props.albumId}?song=${song.id}`}/>
                </span>
            </div>
        </div>
    )
}

export default SongCard
