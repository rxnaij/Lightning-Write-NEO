export const timeToString = (number) => {
    return number >= 10 ? number.toString() : '0' + number
}