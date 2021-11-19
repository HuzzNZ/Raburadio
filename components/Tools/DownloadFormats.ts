const DownloadFormats = {
    'flac': {
        extension: '.flac',
        title: 'FLAC',
        quality: 'Lossless',
        description: 'Lossless quality for whatever you need it for.'
    },
    'mp3-320': {
        extension: '.mp3',
        title: 'MP3',
        quality: '320kbps',
        description: 'High quality for optimal music playback.'
    },
    'mp3-192': {
        extension: '.mp3',
        title: 'MP3',
        quality: '192kbps',
        description: 'Storage-efficient with minimal quality loss for music playback. More compatible than OGG Vorbis. Rankable quality on osu!.'
    },
    'vorbis-192': {
        extension: '.ogg',
        title: 'Vorbis',
        quality: '192kbps',
        description: 'Storage-efficient with minimal quality loss for music playback. Slightly higher quality than MP3 192kbps. Rankable quality on osu!.'
    },
    'opus-128': {
        extension: '.ogg',
        title: 'Opus',
        quality: '128kbps',
        description: 'High storage-efficiency with low quality loss for music playback.'
    }
}

export default DownloadFormats
