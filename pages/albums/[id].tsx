import React from "react";
import Image from 'next/image'
import {useGlobalState} from "state-pool";
import { InlineIcon } from "@iconify/react";

import graphQL from "../../api/graphQL";
import RenderArtist from "../../components/Tools/RenderArtist";
import SongList from "../../components/SongView/SongList";
import Custom404 from "../404";
import { useRouter } from "next/router";
import {GetServerSideProps} from "next";
import {Album} from "../../api/interfaces";
import {getUTCReleaseDate} from "../../components/Tools/Time";

export interface FullAlbumProps {
    album: Album
}

const FullAlbum: React.FC<FullAlbumProps> = ({ album }) => {
    const [useNative] = useGlobalState('useNative')
    const { query } = useRouter()
    const highlighted: string = String(query.song) || null

    if (!album) return <Custom404/>

    const mainTitle = (album.titleRom === "" || useNative)? album.titleNat : album.titleRom
    const releaseDate = new Date(album.releaseDate)

    let totalLength: number = 0
    album.songs.forEach(song => totalLength += song.length)

    return (
        <div className={'space-y-6'}>
            <div className={'mt-14 h-60 flex'}>
                <div className={'h-full w-60 relative flex-none'}>
                    <Image alt={"Album Cover"} className={'rounded-2xl'} src={`/albums/${album.id}.jpg`} layout={'fill'} objectFit="contain" priority/>
                </div>
                <div className={'ml-8 flex flex-col flex-grow'}>
                    <div className={'flex items-center flex-grow'}>
                        <div className={'leading-none space-y-4'}>
                            <div className={'space-y-2'}>
                                <p className={'text-3xl'}>{mainTitle}</p>
                                { (album.titleRom === "" || useNative)? null : <p className={'text-md text-secondary dark:text-secondary font-light tracking-wide truncate'}>{album.titleNat}</p> }
                            </div>
                            <div className={'text-xl'}>
                                <p className={'inline-block text-primary dark:text-primary'}><RenderArtist artists={album.artists}/></p>
                                <p className={'inline-block text-secondary dark:text-secondary mx-1'}>·</p>
                                <p className={'inline-block text-secondary dark:text-secondary'}>{
                                    releaseDate.getUTCFullYear()
                                }</p>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-2'}>
                        <button className={'h-8 w-32 rounded-lg bg-primary text-white'}>
                            <InlineIcon className={'inline-block mr-1'} icon={'ph:link-simple-bold'}/>
                            <span>Copy Link</span>
                        </button>
                    </div>
                </div>
            </div>
            <SongList songs={album.songs} albumArtists={album.artists} fullAlbumMode={true} highlightedId={highlighted} albumId={album.id}/>
            <div className={'text-secondary dark:text-secondary text-sm font-light flex flex-col'}>
                <span>Released on {getUTCReleaseDate(releaseDate)}</span>
                <span>{album.songs.length} Songs, {Math.ceil(totalLength / 60)} Minutes</span>
                <span>{album.catalog}</span>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({res, params}) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=86400, stale-while-revalidate=259200'
    )
    const query = `
        getAlbumById(id: "${params.id}") {
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
        catalog
        parent
      }
    `
    const data: Album = (await graphQL(query)).getAlbumById
    return { props: { album: data } }
}

export default FullAlbum
