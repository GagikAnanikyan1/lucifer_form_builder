export const getTimeFields = (format, placeholders) => {
  const fields = [
    { key: 'hour', placeholder: placeholders?.hour || 'HH' },
    { key: 'minute', placeholder: placeholders?.minute || 'MM' },
    { key: 'format' }
  ]
  return format === '24h' ? fields.splice(0, 2) : fields
}
