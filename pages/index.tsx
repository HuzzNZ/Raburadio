import Header from "../components/Header";
import AlbumList from "../components/AlbumView/AlbumList";
import graphQL from "../api/graphQL";
import {GetServerSideProps} from "next";
import React from "react";
import {Album} from "../api/interfaces";

interface HomeProps {
    albums: Album[]
}

const Home: React.FC<HomeProps> = ({ albums }) => {
    return (
        <div className={'space-y-3'}>
            <Header title={"Home"} icon={"ph:house-bold"}/>
            <h2>Recently Released</h2>
            <AlbumList albums={albums} lines={4}/>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async ({ res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=900, stale-while-revalidate=3600'
    )
    const query = `
        getAllAlbums {
            id
            titleNat
            titleRom
            songs {
                id
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
            artists {
                id
                nameNat
                nameRom
            }
            releaseDate
        }
        `
    const data: Album[] = (await graphQL(query)).getAllAlbums
    return { props: { albums: data } }
}

export default Home
