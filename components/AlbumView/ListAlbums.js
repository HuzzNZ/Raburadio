import React from "react";
import AlbumCard from "./AlbumCard";

function ListAlbums (props) {
    return (
        <div className={'flex flex-wrap'}>
            {props.data.map(album => <AlbumCard key={album.id} payload={album} lines={props.lines}/>)}
        </div>
    )
}

export default ListAlbums
