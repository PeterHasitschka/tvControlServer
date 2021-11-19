import Express, { json, urlencoded } from 'express'
import config from '../config'
import { connectLg, genericLgCommand } from './commands'
import { ROUTE_CALLCMD, ROUTE_CONNECT } from './constants'

const Server = () => {
  const app = Express()
  app.use(json())
  app.use(urlencoded({ extended: true }))

  app.post(ROUTE_CONNECT, connectLg)
  app.post(ROUTE_CALLCMD, genericLgCommand)

  const { port } = config.server
  app.listen(port, () => {
    console.log('Server running on port', port)
  })
}

export default Server
