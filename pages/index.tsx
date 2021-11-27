import Header from "../components/Header";
import AlbumList from "../components/AlbumView/AlbumList";
import graphQL from "../api/graphQL";
import {GetServerSideProps} from "next";
import React from "react";
import {Album, Artist, Song} from "../api/interfaces";
import Subheader from "../components/Sub-Components/Subheader";
import TrackList from "../components/TrackView/TrackList";


interface ArtistData {
    artist: Artist
    songs: Song[]
}

interface HomeProps {
    albums: Album[]
    artists: ArtistData[]
}

const Home: React.FC<HomeProps> = ({ albums, artists }) => {
    return (
        <div className={'space-y-3'}>
            <Header title={"Home"} icon={"ph:house-bold"}/>
            <Subheader title={'Recently released albums'} linkTitle={'View all albums'} linkURL={"#"}/>
            <AlbumList albums={albums} lines={4}/>
            {artists.map(({artist, songs}) => {
                return (<div key={artist.id} className={"space-y-3"}>
                    <Subheader title={"New songs from " + (artist.nameRom || artist.nameNat)} linkTitle={'More songs from ' + (artist.nameRom || artist.nameNat)} linkURL={'#'}/>
                    <TrackList tracks={songs}/>
                </div>)
            })}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=900, stale-while-revalidate=3600'
    )
    const albumQuery = `
        getAllAlbums (sort: false, limit: 2) {
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
    const albumData: Album[] = (await graphQL(albumQuery)).getAllAlbums

    const artistSongQueries = [11050]

    const artistData: ArtistData[] = []

    for (const artist of artistSongQueries) {
        const artistDataQuery = `
            getArtistById (id: "${artist}") {
                id
                nameNat
                nameRom
            }
        `
        const artistSongsQuery = `
            findSongsByArtist (artistId: "${artist}", sort: false, limit: 3) {
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

        artistData.push({
            artist: (await graphQL(artistDataQuery)).getArtistById,
            songs: (await graphQL(artistSongsQuery)).findSongsByArtist
        })
    }

    return { props: { albums: albumData, artists: artistData } }
}

export default Home
