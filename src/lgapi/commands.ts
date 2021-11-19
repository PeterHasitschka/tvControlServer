import LgTv2 from 'lgtv2'
import {
  COMMAND_CALL_AUDIO_GETVOLUME,
  COMMAND_CALL_AUDIO_SETMUTE,
  COMMAND_CALL_AUDIO_VOLUMEDOWN,
  COMMAND_CALL_AUDIO_VOLUMEUP,
  COMMAND_CALL_SYSTEMNOTIFICATIONS_CREATETOAST,
  COMMAND_CALL_TV_GETCHANNELLIST,
  COMMAND_CALL_TV_GETCURRENTCHANNEL,
  COMMAND_CALL_TV_GETEXTERNALINPUTLIST,
  COMMAND_CALL_TV_OPENCHANNEL,
  COMMAND_CALL_TV_SWITCHINPUT,
} from './constants'
import { Channel, ExternalInput } from './types'

let instance: LgTv2
export const setLgTv = (lgtv2: LgTv2) => {
  instance = lgtv2
}

const toggleMute = async (val: boolean): Promise<void> => {
  return new Promise(resolve => {
    instance.request(
      COMMAND_CALL_AUDIO_SETMUTE,
      { mute: val },
      (_: unknown, r) => {
        resolve()
      }
    )
  })
}

export const mute = async (): Promise<void> => {
  return await toggleMute(true)
}

export const unmute = async (): Promise<void> => {
  return await toggleMute(false)
}

export const getVolume = async (): Promise<number> => {
  return new Promise(resolve => {
    instance.request(COMMAND_CALL_AUDIO_GETVOLUME, null, (_: unknown, r) => {
      resolve(r.volume as number)
    })
  })
}

export const volumeUp = async (): Promise<void> => {
  return new Promise(resolve => {
    instance.request(COMMAND_CALL_AUDIO_VOLUMEUP, null, (_: unknown, r) => {
      resolve()
    })
  })
}

export const volumeDown = async (): Promise<void> => {
  return new Promise(resolve => {
    instance.request(COMMAND_CALL_AUDIO_VOLUMEDOWN, null, (_: unknown, r) => {
      resolve()
    })
  })
}

export const showToast = async (message: string): Promise<void> => {
  return new Promise(resolve => {
    instance.request(
      COMMAND_CALL_SYSTEMNOTIFICATIONS_CREATETOAST,
      { message },
      (_: unknown, r) => {
        resolve()
      }
    )
  })
}

export const getChannelList = async (): Promise<Channel[]> => {
  return new Promise(resolve => {
    instance.request(COMMAND_CALL_TV_GETCHANNELLIST, (_: unknown, res) => {
      const data: Channel[] = res.channelList.map(r => ({
        name: r.channelName as string,
        number: parseInt(r.channelNumber, 10),
      }))
      resolve(data)
    })
  })
}

export const getCurrentChannel = async (): Promise<Channel> => {
  return new Promise(resolve => {
    instance.request(COMMAND_CALL_TV_GETCURRENTCHANNEL, (_: unknown, res) => {
      // console.log(res.channelList.map(r => [r.channelName, r.majorNumber]))
      const channel: Channel = {
        name: res.channelName as string,
        number: parseInt(res.channelNumber, 10),
      }
      resolve(channel)
    })
  })
}

export const openChannel = async (channelNumber: number): Promise<void> => {
  return new Promise(resolve => {
    instance.request(
      COMMAND_CALL_TV_OPENCHANNEL,
      { channelNumber },
      (_: unknown, res) => {
        console.log(_, res)
        resolve()
      }
    )
  })
}

export const getExternalInputList = async (): Promise<ExternalInput[]> => {
  return new Promise(resolve => {
    instance.request(
      COMMAND_CALL_TV_GETEXTERNALINPUTLIST,
      (_: unknown, res) => {
        const data: ExternalInput[] = res.devices.map(r => {
          const { id, label, appId, icon } = r
          return {
            id,
            label,
            appId,
            icon,
          }
        })
        resolve(data)
      }
    )
  })
}

export const switchExternalInput = async (inputId: string): Promise<void> => {
  return new Promise(resolve => {
    instance.request(
      COMMAND_CALL_TV_SWITCHINPUT,
      { inputId },
      (_: unknown, res) => {
        console.log(_, res)

        resolve()
      }
    )
  })
}
