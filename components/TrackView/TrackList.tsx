import {Song} from "../../api/interfaces";
import React from "react";
import TrackCard from "./TrackCard";

interface TrackListProps {
    tracks: Song[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <div className={'flex flex-wrap'}>
            {tracks.map(track => <TrackCard key={track.id} track={track}/>)}
        </div>
    )
}

export default TrackList
