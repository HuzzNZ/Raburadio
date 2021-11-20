import React from "react";
import Header from "../components/Header";
import TrackList from "../components/TrackView/TrackList";
import {GetServerSideProps} from "next";
import graphQL from "../api/graphQL";
import {Song} from "../api/interfaces";

interface SongCardHomeProps {
    songs: Song[]
}

const SongCardHome: React.FC<SongCardHomeProps> = ({ songs }) => {
    return (
        <div className={'space-y-3'}>
            <Header title={"Song test haha"} icon={"ph:house-bold"}/>
            <h2>Song test lol</h2>
            <TrackList tracks={songs}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=900, stale-while-revalidate=3600'
    )
    const query = `
        findSongsByName(name: "natsuiro") {
            id
            inAlbum {
                id
                titleNat
                titleRom
                artists {
                    id
                    nameNat
                    nameRom
                }
                releaseDate
            }
            albumOrder
            titleNat
            titleRom
            artists {
                id
                nameNat
                nameRom
            }
            length
            isInstrumental
            isRadioDrama
        }

    `
    const songs: Song[] = (await graphQL(query)).findSongsByName
    return { props: { songs: songs } }
}

export default SongCardHome
