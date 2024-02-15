import React, { Fragment, useMemo } from 'react'

const Preview = ({
  id,
  name,
  percentage,
  url,
  handleRemove,
  type,
  size,
  listType
}) => {
  const onRemove = () => handleRemove(id)

  const makeSize = (bytes) => {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + ' GB'
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + ' MB'
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + ' KB'
    } else if (bytes > 1) {
      bytes = bytes + ' bytes'
    } else if (bytes == 1) {
      bytes = bytes + ' byte'
    } else {
      bytes = '0 bytes'
    }
    return bytes
  }

  const getPreview = () => {
    if (type.startsWith('image/')) return <img src={url} />

    if (type.startsWith('video/'))
      return (
        <video>
          <source src={url} type={type} />
        </video>
      )

    return <div className='boomFile_upload-no-preview'></div>
  }

  const preview = useMemo(() => getPreview(), [id])

  return (
    <div className='boomFileUpload__preview'>
      {preview}
      <div className='boomFileUpload__info'>
        <span className='boomFileUpload-file__name'>{name}</span>
        <span className='boomFileUpload-fileRemove__btn' onClick={onRemove}>
          x
        </span>
        <progress value={percentage} max='100'></progress>
        <span className='boomFileUpload-file__size'>
          {makeSize((size * percentage) / 100)}{percentage!=100 && ` of ${makeSize(size)}`}
        </span>
        <span className='boomFileUpload-file_progress'>{percentage}%</span>
      </div>
    </div>
  )
}

export default Preview
