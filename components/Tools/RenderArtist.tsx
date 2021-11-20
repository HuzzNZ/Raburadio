import React, {useState} from "react";
import {Artist, Member} from "../../api/interfaces";
import graphQL from "../../api/graphQL";
import {useNative} from "../Hooks/useNative";

interface RenderArtistProps {
    artists: Artist[]
}

const RenderArtist: React.FC<RenderArtistProps> = ({artists}) => {
    const native = useNative()
    const [members, setMembers] = useState<Member[]>([])

    const getMembers = (artistId): void => {
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
        graphQL(query).then(res => {
            const data: Member[] = res.getArtistById.members
            setMembers(data)
        })
    }

    if (artists.length === 0) {
        return null
    }
    let artistElements = []
    let isFirst = true
    for (const artist of artists) {
        let artistName: string
        if (artist.nameNat === "") { // If Artist is wrapper of Member
            if (members.length === 0) {
                getMembers(artist.id)
                return <span>Loading...</span>
            }
            const member = members[0]
            const firstName = native? member.firstNameNat : member.firstNameRom
            const lastName = native? member.lastNameNat : member.lastNameRom
            artistName = member.foreignNameOrder? `${firstName}${native? '・':' '}${lastName}` : `${lastName}${native? '':' '}${firstName}`
        } else if (artist.nameRom === "") {
            artistName = artist.nameNat
        } else {
            artistName = native? artist.nameNat : artist.nameRom
        }
        artistElements.push(<span key={artist.id.toString()} id={artist.id.toString()}>{artistName}</span>)
        if (isFirst && artists.length > 1) {
            isFirst = false
            artistElements.push((<span>, </span>))
        }
    }
    return (
        <span>
            {artistElements}
        </span>
    )
}

export default RenderArtist