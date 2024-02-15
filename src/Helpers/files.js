import axios from 'axios'
export const ABORT_REQUEST_CONTROLLERS = new Map()

const addAdditionalParams = (file, i) => {
  const extension = file.name.split('.').pop()
  const originalName = file.name.split('.').slice(0, -1).join('.')
  const random = Math.random().toString(36).substr(2, 4)
  const originalEncodedName = encodeURIComponent(originalName)
  const newName = `${originalEncodedName}_${random}.${extension}`
  const newFile = new File([file], newName, { type: file.type })
  newFile.id = `${new Date().getTime()}-${i}`
  newFile.percentage = 0
  newFile.originalName = `${originalName}.${extension}`
  newFile.originalEncodedName = originalEncodedName
  return newFile
}

export const uploadHandler = async ({
  file,
  callback,
  handleLoading,
  allFiles,
  signal,
  uploadOptions
}) => {
  const requestsArray = uploadOptions(file)
  if (requestsArray && requestsArray.length > 0) {
    let isUploadSuccess = false
    for (let i = 0; i < requestsArray.length && !isUploadSuccess; i++) {
      const onRequestSuccess = (response) => {
        isUploadSuccess = true
        const { status } = response
        if (status === 200) callback(file.id, 200, response?.data, allFiles)
        else callback(file.id, status, response, file)

        if (requestsArray[i].onSuccess) {
          requestsArray[i].onSuccess(response)
        }
      }
      const onRequestFail = (error, retries) => {
        if (error.message && error.message == 'canceled') {
          callback(file.id, error.message, error, file)
          return
        }
        if (retries == 0) callback(file.id, 0, error, file)
        if (requestsArray[i].onFail) {
          requestsArray[i].onFail(error.status, error)
        }
      }
      await customUpload({
        file,
        upLoadData: requestsArray[i],
        handleLoading,
        allFiles,
        signal,
        onRequestSuccess,
        onRequestFail,
        retriesCount: requestsArray[i].retries
      })
    }
  }
}

const customUpload = async ({
  file,
  upLoadData,
  handleLoading,
  allFiles,
  signal,
  onRequestSuccess,
  onRequestFail,
  retriesCount
}) => {
  const { headers, queries, url, method } = upLoadData
  let requestURL = url
  let retries = (retriesCount && !isNaN(retriesCount) && retriesCount) || 1
  let uploadSucceeded = false

  if (queries) {
    Object.keys(queries).forEach((query, index) => {
      if (index === 0) {
        requestURL += `?${query}=${queries[query]}`
      } else {
        requestURL += `&${query}=${queries[query]}`
      }
    })
  }

  while (retries > 0 && !uploadSucceeded) {
    try {
      let requestData = file
      if (upLoadData.formatBeforeSend) {
        requestData = upLoadData.formatBeforeSend(file)
      }
      const response = await axios({
        url: requestURL,
        method: method || 'POST',
        data: requestData,
        headers: {
          ...headers
        },
        onUploadProgress: (event) => {
          handleLoading(file.id, Math.round((100 * event.loaded) / event.total))
        }
      })
      onRequestSuccess(response)
      uploadSucceeded = true
    } catch (error) {
      retries--
      onRequestFail(error, retries)
    }
  }
}

export const correctFiles = (files) => {
  let newFiles = []
  for (let i = 0; i < files.length; i++)
    newFiles.push(addAdditionalParams(files[i], i))

  return newFiles
}

export const uploadFiles = (
  fileList,
  callback,
  handleLoading,
  newValues,
  uploadOptions
) => {
  for (let i = 0; i < fileList.length; i++) {
    const controller = new AbortController()
    ABORT_REQUEST_CONTROLLERS.set(fileList[i].id, controller)
    uploadHandler({
      file: fileList[i],
      uploadOptions: uploadOptions,
      allFiles: newValues,
      callback,
      handleLoading,
      signal: controller.signal
    })
  }
}
