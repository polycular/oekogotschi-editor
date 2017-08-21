import config from '../config/environment'

/* global Promise: true */
const fileURL = `${config.API.baseURL}/${config.API.namespace}/files`
let upload = file => {
  return new Promise((resolve, reject) => {
    let body = new FormData()
    body.append('file', file)
    const xhr = new XMLHttpRequest()
    xhr.open('POST', fileURL)
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 201) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send(body)
  })
}

export default upload
