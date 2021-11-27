import React from "react";
import SongCard from "./SongCard";
import Link from "next/link";
import {Artist, Song} from "../../api/interfaces";

interface SongListProps {
    songs: Song[]
    albumArtists: Artist[]
    lines?: number
    fullAlbumMode?: boolean
    highlightedId?: string
    albumId?: string
}

const SongList: React.FC<SongListProps> = (props) => {
    const songs = props.songs
    const specifiedLines = props.lines || 12
    const fullAlbumMode = props.fullAlbumMode || false
    const lines = fullAlbumMode? songs.length : Math.min(specifiedLines, songs.length)
    let jsx = []
    for (let i = 0; i < lines; i++) {
        let isSelected = false
        let styles = [fullAlbumMode? 'h-10' : "h-7", "transition", "duration-300", fullAlbumMode? "hover:bg-gray-100 dark:hover:bg-dark-100" : "hover:bg-gray-200 dark:hover:bg-dark-200"]
        if (i === 0) {
            styles.push("rounded-t-xl")
        } if (i === lines - 1 && ((!fullAlbumMode && specifiedLines >= songs.length) || fullAlbumMode)) {
            styles.push("rounded-b-xl")
        } if (i % 2 === 0) {
            styles.push(fullAlbumMode? "dark:bg-dark-50 bg-gray-50" : "dark:bg-dark-150 bg-gray-150")
        }

        if ((songs[i].id === props.highlightedId) && fullAlbumMode) {
            isSelected = true
        }

        jsx.push(<SongCard key={songs[i].id} className={styles.join(" ")} song={songs[i]} isSelected={isSelected} {...props}/>)
    }
    const diff = songs.length - specifiedLines
    return (
        <div className={'max-w-full'}>
            {jsx}
            {(specifiedLines >= songs.length || fullAlbumMode)? null :
                <p className={'ml-3 mt-1 text-sm text-secondary dark:text-secondary font-light'}>
                    and {diff} more track{diff === 1? '':'s'}...
                    <Link href={`/albums/[id]`} as={`/albums/${props.albumId || 404}`} passHref>
                        <a className={'text-xs ml-2 hover:underline text-primary dark:text-primary'}>View Full Album</a>
                    </Link>
                </p>
            }
        </div>
    )
}

export default SongList
