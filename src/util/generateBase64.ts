import { v2rayAndroid } from './ v2rayAndroid'
import { v2rayIOS } from './v2rayIOS'
export function generateBase64(nodes, client){
  let a = []
  let v2rayServers = ''
  // android
  if(client == 'Android') {
    v2rayServers = v2rayAndroid(nodes)
  } 
  // iOS
  else {
    v2rayServers = v2rayIOS(nodes)
  }
  let ssrServers = ''
  for (let i in a) {
    let proto = ''
    if(a[i].obfs == "none" || a[i].obfs == "") {
      a[i].obfs = 'plain'
    } 
    if(a[i].proto != "none" || a[i].obfs != "" || a[i].obfs != "origin") {
      // a[i].proto = 'plain'
      proto = '&' + 'protoparam='
    }
    let remarks = Buffer.from(a[i].title).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
    let base64Pw = Buffer.from(a[i].password).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
    let group =  Buffer.from("ONESubscribe").toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
    let url = '' + a[i].host + ':' + a[i].port + ':' + a[i].proto + ':' + a[i].method 
    + ':' + a[i].obfs + ':' + base64Pw + '/?' + 'obfsparam=' 
    // + a[i].obfsParam 
    +  proto
    // + a[i].protoParam 
    + '&' + 'remarks=' + remarks + '&' + 'group=' + group
    //  + '&udpport=0&uot=0'
    let baseSSR = Buffer.from(url).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
    let server = Buffer.from('ssr://' + baseSSR)
    ssrServers = ssrServers + server + '\n'
  }
  return Buffer.from(v2rayServers + ssrServers).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')
}