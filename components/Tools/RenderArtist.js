import React, { useState } from "react";
import axios from "axios";

export default function RenderArtist (props) {
    const [members, setMembers] = useState([])

    const getMembers = (artistId) => {
        const query = `
          getArtistById (id: "${artistId}") {
            members {
                lastNameNat
                lastNameRom
                firstNameNat
                firstNameRom
                foreignNameOrder
              }
          }
        `
        axios.post(
            'http://192.168.1.195:8080/graphql',
            {query: `query { ${query} }`},
            {headers: {"content-type": "application/json"}}
        ).then(res => {
            setMembers(res.data.data.getArtistById.members)
        })
    }
    let payloadArtists = props.artists
    if (payloadArtists.length === 0) {
        return null
    }
    let useNat = props.native
    let artists = []
    let isFirst = true
    for (let artist of payloadArtists) {
        let oneArtist = "";
        if (artist.nameNat === "") {
            if (members.length === 0) {
                getMembers(artist.id)
                return "Loading..."
            }
            const member = members[0]
            const firstName = useNat? member.firstNameNat : member.firstNameRom
            const lastName = useNat? member.lastNameNat : member.lastNameRom
            oneArtist = member.foreignNameOrder? `${firstName} ${lastName}` : `${lastName} ${firstName}`
        } else if (artist.nameRom === "") {
            oneArtist = artist.nameNat
        } else {
            oneArtist = useNat? artist.nameNat : artist.nameRom
        }
        artists.push(<span key={artist.id} id={artist.id}>{oneArtist}</span>)
        if (isFirst && payloadArtists.length > 1) {
            isFirst = false
            artists.push(<span>, </span>)
        }
    }
    return artists
}