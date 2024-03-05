const timerQue = {}

export const debounce = (id, callback, delay) => {
  if (timerQue[id]) clearTimeout(timerQue[id])
  timerQue[id] = setTimeout(callback, delay)
}
