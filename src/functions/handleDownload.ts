export function handleDownloadToTxt(text: string) {
    const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    return href
}