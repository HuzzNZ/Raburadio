interface abc {
    id?: string
}

interface HasArtists {
    artists?: Artist[]
}

interface TitledObject extends abc {
    titleNat?: string
    titleRom?: string
}

interface Member extends abc {
    firstNameNat?: string
    lastNameNat?: string
    firstNameRom?: string
    lastNameRom?: string
    foreignNameOrder: boolean
}

interface Artist extends abc {
    members?: Member[]
    nameNat?: string
    nameRom?: string
}

interface Song extends TitledObject, HasArtists {
    inAlbum?: Album[]
    albumOrder?: number
    length?: number
    isInstrumental?: boolean
    isRadioDrama?: boolean
}

interface Album extends TitledObject, HasArtists {
    songs?: Song[]
    releaseDate?: number
    catalog?: string
    subtitle?: string
    parent?: string
}

export type { Member, Artist, Song, Album }