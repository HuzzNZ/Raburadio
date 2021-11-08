import React from "react";
import SongCard from "./SongCard";

export default function ListSongs (props) {

    // componentDidMount() {
    //     const query = `
    //       getAllSongsInAlbum (albumId: "${this.props.albumId}") {
    //         id
    //         albumOrder
    //         titleNat
    //         titleRom
    //         artists {
    //           id
    //           nameNat
    //           nameRom
    //         }
    //         length
    //         isInstrumental
    //         isRadioDrama
    //       }
    //     `
    //     axios.post(
    //         'http://192.168.1.195:8080/graphql',
    //         {query: `query { ${query} }`},
    //         {headers: {"content-type": "application/json"}}
    //     ).then(res => {
    //         this.setState({songs: res.data.data.getAllSongsInAlbum})
    //     })
    // }

    const songs = props.songs
    const lines = Math.min(props.lines, songs.length)
    let jsx = []
    for (let i = 0; i < lines; i++) {
        let styles = ["h-7", "transition", "duration-150", "hover:bg-gray-200"]
        if (i === 0) {
            styles.push("rounded-t-xl")
        } if (i === lines - 1 && props.lines >= songs.length) {
            styles.push("rounded-b-xl")
        } if (i % 2 === 0) {
            styles.push("bg-gray-100")
        } else {
            styles.push("bg-gray-150")
        }
        jsx.push(<SongCard key={songs[i].id} styles={styles.join(" ")} payload={songs[i]} />)
    }
    const diff = songs.length - props.lines
    return (
        <div className={'max-w-full p-2'}>
            {jsx}
            {props.lines >= songs.length? null :
                <p className={'ml-3 mt-1 text-sm text-secondary font-light'}>
                    and {diff} more track{diff === 1? '':'s'}...
                    <a href={'#'} className={'text-xs ml-2 hover:underline text-primary'}>View Full Album</a>
                </p>
            }
        </div>
    )
}