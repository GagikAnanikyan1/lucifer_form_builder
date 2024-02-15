import React, { Fragment } from 'react'
import { Checkbox } from 'boomform'
// Need A Refactor
export const linkToTermsLabel = (text, url, openIn) => {
  if (text.match(/[^{]+(?=\})/g)) {
    let scopeText = text.slice(text.indexOf('{') + 1, text.indexOf('}'))
    let linkText
    if (openIn === 'newTab') {
      linkText = `<a href="${url}" target=_blank>${scopeText}</a>`
    } else {
      linkText = `<a href="${url}" onclick=window.open('','popup',width=800,height=600) target=popup>${scopeText}</a>`
    }
    return text.replace(scopeText, linkText).replace('{', '').replace('}', '')
  }
  return text
}

const Terms = ({ id, text, url, openIn, payment, ...props }) => {
  return (
    <>
      <Checkbox id={id} name={id} value={id} {...props} />
      <div
        className='boomForm-terms__link'
        dangerouslySetInnerHTML={{
          __html: linkToTermsLabel(text, url, openIn)
        }}
      ></div>
    </>
  )
}
export default Terms
