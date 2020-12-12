const express = require('express')
const app = express()
const PORT = 4000

const server = require('http').createServer(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', ws => {
  console.log('new connection')
  ws.on('message', msg => {
    wss.clients.forEach(client =>{
        if(client !== ws && client.readyState === WebSocket.OPEN){
            client.send(msg)
        }
    })
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

server.listen(PORT, () => {
  console.log('listening on port :' + PORT)
})
