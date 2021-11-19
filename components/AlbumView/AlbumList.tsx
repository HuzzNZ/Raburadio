import React from "react";
import AlbumCard from "./AlbumCard";
import {Album} from "../../api/interfaces";

interface ListAlbumProps {
    albums: Album[]
    lines?: number
}

const AlbumList:React.FC<ListAlbumProps> = ({ albums, lines }) => {
    return (
        <div className={'flex flex-wrap'}>
            {albums.map(album => <AlbumCard key={album.id} album={album} lines={lines || 10}/>)}
        </div>
    )
}

export default AlbumList
