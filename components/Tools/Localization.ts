export function getLocalizedTitle (nat: string, rom: string, isNative: boolean): string {
    return (rom === "" || isNative)? nat : rom
}

export function getLocalizedSubtitle (rom: string, isNative:boolean): string | null {
    return (rom === "" || isNative)? null : rom
}
