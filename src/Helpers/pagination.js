export const getNextPageIndex = ({ pagination, logicIds, currentPage }) => {
  let nextPage = undefined
  if (pagination) {
    const { pages, mode = 'page' } = pagination
    if (currentPage === pages.length - 1 || mode !== 'page') {
      return nextPage
    }
    for (
      let i = currentPage + 1;
      i <= pages.length - 1 && nextPage === undefined;
      i++
    ) {
      if (
        !logicIds.pages.includes(i) &&
        pages[i].fields.filter((id) => !logicIds.fields.includes(id)).length !==
          0
      ) {
        nextPage = String(i)
      }
    }
  }
  return nextPage
}
export const getPrevPageIndex = ({ pagination, logicIds, currentPage }) => {
  let prevPage = undefined
  if (currentPage === 0) {
    return prevPage
  }
  if (pagination) {
    const { pages } = pagination
    for (let i = currentPage - 1; i >= 0 && prevPage === undefined; i--) {
      if (
        !logicIds.pages.includes(i) &&
        pages[i].fields.filter((id) => !logicIds.fields.includes(id)).length !==
          0
      ) {
        prevPage = String(i)
      }
    }
  }
  return prevPage
}

export const getShowableData = ({ logicIds, pagination, currentPage }) => {
  if (!pagination) return { currentPage, pagesLength: 0, actualPages: [] }
  const showableData = {
    showableCurrentPage: 0,
    pagesLength: 0,
    actualPages: []
  }
  pagination.pages.forEach((page, index) => {
    if (
      !logicIds.pages.includes(index) &&
      page.fields.filter((id) => !logicIds.fields.includes(id)).length !== 0
    ) {
      showableData.pagesLength += 1
      showableData.actualPages.push(index)

      if (currentPage === index) {
        showableData.showableCurrentPage = showableData.pagesLength
      }
    }
  })

  return showableData
}
