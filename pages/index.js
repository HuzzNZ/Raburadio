import Header from "../components/Header";
import ListAlbums from "../components/AlbumView/ListAlbums";

export default function Home ({ albums }) {
    return (
        <div className={'space-y-3'}>
            <Header title={"Home"} icon={"ph:house-bold"}/>
            <h2>Recently Released</h2>
            <ListAlbums data={albums} lines={4}/>
        </div>
    )
}

export async function getServerSideProps() {
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
    try {
        const res = await fetch('http://192.168.1.195:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query { ${query} }`
            }),
        })
        const data = await res.json()
        return {
            props: {
                albums: data.data.getAllAlbums
            }
        }
    } catch (e) {
        console.log(e)
    }
}
