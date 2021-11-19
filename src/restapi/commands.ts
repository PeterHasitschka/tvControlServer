import { Request, Response } from 'express'
import * as lgCommands from '../lgapi/commands'
import Api from '../lgapi/api'

const availableCommands = { ...lgCommands }

export const connectLg = async (req: Request, res: Response): Promise<void> => {
  const { tvIp }: { tvIp: string } = req.body

  if (!tvIp) {
    res.send({
      success: false,
      msg: 'Invalid Tv-Data (tvIp)',
    })
    return
  }

  const lgApi = Api()
  lgApi.setIp(tvIp)
  lgApi.initApi()

  try {
    await lgApi.connect()
  } catch (e) {
    res.send({
      success: false,
      ip: tvIp,
      msg: 'Could not connect to tv',
      error: e,
    })
    return
  }

  res.send({
    success: true,
    key: lgApi.getKey(),
  })
}

export const genericLgCommand = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cmd, data }: { cmd: string; data: any } = req.body as any
  if (!cmd) {
    res.send({
      success: false,
      msg: 'Could not connect',
    })
    return
  }

  if (availableCommands[cmd]) {
    const callResult: any = await availableCommands[cmd](data)

    res.send({
      success: true,
      result: callResult || false,
    })
    return
  } else {
    res.send({
      success: false,
      msg: 'Invalid command',
    })
  }
}
