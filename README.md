# LG TV Node-Middleware

---

Rest-Server for connecting and controlling LG-WebOS TVs via REST API

---

## Usage

- Run DEV-Server: `yarn watch`

### Initialize TV-Connection

- Server-Port: See `src/config`
- GET `http(s)://<SERVERIP>:<SERVERPORT>/connect`
- Request-Data :

```json
{
  "tvIp": "<TVIP>"
}
```

### Commands

- Use POST `http(s)://<SERVERIP>:<SERVERPORT>/callcmd` for every LG-TV-Command
- See `src/lgapi/commands.ts` for full list

- Example Request-Data for changing the channel (see function `openChannel`):

```json
{
  "cmd": "openChannel",
  "data": 202
}
```
