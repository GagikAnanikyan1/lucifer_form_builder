export const getNameFields = (middleName) => {
  return middleName ? ['first', 'middle', 'last'] : ['first', 'last']
}
