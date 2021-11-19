import LgTv2 from 'lgtv2'
import { PORT } from './constants'
import { getVolume, mute, setLgTv, unmute } from './commands'

const Api = (clientKey?: string) => {
  let _ip: string
  let lgtv: LgTv2
  let _key = clientKey || undefined

  const setIp = (ip: string) => {
    _ip = ip
  }

  const setKey = (key: string) => {
    _key = key
  }

  const getKey = () => {
    return _key
  }

  const initApi = () => {
    const url = `ws://${_ip}:${PORT}`
    const clientKey = _key || undefined

    console.log(url, clientKey)
    lgtv = LgTv2({
      url,
      clientKey,
      saveKey: k => {
        _key = k
      },
    })
  }

  const connect = async () => {
    return new Promise<void>((resolve, reject) => {
      console.log('Connecting to TV...')
      lgtv.on('connect', () => {
        console.log('Connected')
        setLgTv(lgtv)
        resolve()
        // lgtv.request('ssap://audio/setMute', { mute: true })
      })
      lgtv.on('connecting', c => console.log(c))
      lgtv.on('error', e => reject(e))
    })
  }

  return {
    initApi,
    setIp,
    connect,
    setKey,
    getKey,
  }
}

export default Api
