/**
 * Created by PedroGaspar on 27/03/2017.
 */

import axios from 'axios'
import qs from 'qs'

const dataServiceFactory = (endpoint, action, method, data, isUpload) => {
  let formData = {action, method}
  let theData = qs.stringify(Object.assign({}, formData, {data: data}))
  if (isUpload) {
    theData = new FormData()
    let v
    for (v in formData) {
      theData.append(v, formData[v])
    }
    for (v in data) {
      // console.log(data[v], v)
      theData.append(v, data[v])
    }
  }
  let promise = axios({
    url: endpoint,
    method: 'post',
    data: theData,
    headers: !isUpload
    ? {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    : {}
  })
  return promise
}

export default dataServiceFactory
