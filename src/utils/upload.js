import request from './request'

function upload(url = '', data = {}, config = {}) {
  let form = new FormData()
  for (let item of Object.keys(data)) {
    form.append(item, data[item])
  }

  return request.post(url, form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

export default upload
