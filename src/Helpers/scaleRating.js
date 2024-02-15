export const getOptions = ({ min, max }) => {
  const list = []
  for (let i = min; i <= max; i++) {
    list.push(i)
  }
  return list
}
