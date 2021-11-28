import React, {useEffect, useState} from "react";
import {Album} from "../../api/interfaces";
import {GetServerSideProps} from "next";
import graphQL from "../../api/graphQL";
import Header from "../../components/Header";
import AlbumList from "../../components/AlbumView/AlbumList";
import Subheader from "../../components/Sub-Components/Subheader";
import {useGlobalState} from "state-pool";
import {useRouter} from "next/router";
import {number} from "prop-types";


const albumQuery = `
        getAllAlbums(OPTIONS) {
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
const albumQueryName = "getAllAlbums"

interface AllAlbumsProps {
    initialPage: number,
    maxCount: number
}

const AllAlbums: React.FC<AllAlbumsProps> = ({ initialPage, maxCount }) => {
    const [albums, setAlbums] = useState<Album[]>([])


    const [pageLimit, setPageLimit] = useGlobalState('pageLimit')
    const maxPage = Math.ceil(maxCount / pageLimit)

    const [page, setPage] = useState<number>(Math.min(initialPage, maxPage))
    const [pageSwitchReady, setPageSwitchReady] = useState<boolean>(false)

    useEffect(() => {
        setAlbums([])
        setPageSwitchReady(false)
        graphQL(albumQuery.replace("OPTIONS", `sort: false, page: ${page}, pageLimit: ${pageLimit}`)).then(
            value => {
                if (value) setAlbums(albumQueryName in value? value[albumQueryName] : [])
                setPageSwitchReady(true)
            }
        )
    }, [page, pageLimit])

    const pageDown = () => {
        if (pageSwitchReady) {
            if (page > 1) {
                setPage(page - 1)
            }
        }
    }

    const pageUp = () => {
        if (pageSwitchReady) {
            if (page < maxPage) {
                setPage(page + 1)
            }
        }
    }

    return (
        <div className={"space-y-3"}>
            <Header title={"All CDs"} icon={'ph:disc-fill'}/>
            <p className={"text-secondary dark:text-secondary text-sm font-light"}>Showing {(page-1)*pageLimit+1} - {page*pageLimit} of {maxCount} CDs</p>
            <div className={"space-x-3"}>
                <button onClick={pageDown}><p className={(page>1 && pageSwitchReady)? '' : ('text-secondary dark:text-secondary ' + ((pageSwitchReady)? "cursor-not-allowed" : "cursor-wait"))}>Previous Page</p></button>
                <button onClick={pageUp}><p className={(page<maxPage && pageSwitchReady)? '' : ('text-secondary dark:text-secondary ' + ((pageSwitchReady)? "cursor-not-allowed" : "cursor-wait"))}>Next Page</p></button>
                <button onClick={() => {setPageLimit(2)}}><p>2</p></button>
                <button onClick={() => {setPageLimit(5)}}><p>5</p></button>
                <button onClick={() => {setPageLimit(10)}}><p>10</p></button>
            </div>
            <AlbumList albums={albums} lines={2}/>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    return {
        props: {
            initialPage: query.p? (parseInt(String(query.p)) > 0? parseInt(String(query.p)) : 1) : 1,
            maxCount: (await graphQL("getAllAlbumsCount")).getAllAlbumsCount || 50
        }
    }
}


export default AllAlbums
