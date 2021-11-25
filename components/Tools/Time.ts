export function getUTCReleaseDate (date: Date) {
    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const utcDate: number = date.getUTCDate()
    let dateSuffix: string

    if (11 <= utcDate && utcDate <= 13) {
        dateSuffix = 'th'
    } else {
        switch (date.getUTCDate() % 10) {
            case 1: {
                dateSuffix = 'st'
            } break
            case 2: {
                dateSuffix = 'nd'
            } break
            case 3: {
                dateSuffix = 'rd'
            } break
            default: {
                dateSuffix = 'th'
            }
        }
    }
    return `${months[date.getUTCMonth()]} ${utcDate}${dateSuffix}, ${date.getUTCFullYear()}`
}