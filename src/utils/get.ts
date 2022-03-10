
export function get<T>(url: string, params: { [key: string]: any } = {}): Promise<T> {
  if (params) {
    let paramsArray: Array<string> = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  //fetch请求
  return fetch(url, {
    method: 'GET',
  }).then(res => res.json())
}