/* 
 * Utility functions 
 * Converts a given time, in milliseconds, into another unit of time.
*/
const getMinutes = (time) => Math.floor((time / 1000 / 60) % 60)

const getSeconds = (time) => Math.floor((time / 1000) % 60)

//eslint-disable-next-line
const toMilliseconds = (time) => Math.floor(time % 100)

/**
 * @function timeToString
 * @param {number} number - A numeric unit of time to be cast to a string. (e.g. 10 (minutes), 2 (seconds))
 * @returns {string} A unit of time cast to a string. If the time < 10, an additional '0' is appended to the beginning. 
 */
const timeToString = (number) => {
  return number >= 10 ? number.toString() : '0' + number
}

/**
 * Takes a numeric value in milliseconds and converts it into a reading-friendly
 * time format, XX:YY, where XX represents minutes, and YY represents seconds.
 * @param {number} time - a number value, in milliseconds.
 */
export function displayMillisecondsAsTime (time) {
  const minutes = timeToString(getMinutes(time))
  const seconds = timeToString(getSeconds(time))
  return `${minutes}:${seconds}`
}