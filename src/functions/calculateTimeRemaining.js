/* Given an end time,
     returns the amount of time left until the end time.
     end: time when timer elapses
*/

export const calculateTimeRemaining = (time) => {
    return {
      // Total duration of time remaining (in ms)
      totalTime: time,
      // Time to display
      minutes: Math.floor((time / 1000 / 60) % 60),
      seconds: Math.floor((time / 1000) % 60),
      milliseconds: Math.floor(time % 100)
    }
}