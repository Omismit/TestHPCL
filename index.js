import Hyperswarm from 'hyperswarm'
import b4a from 'b4a'
import crypto from 'hypercore-crypto'
import readline from 'bare-readline'
import tty from 'bare-tty'

const { teardown, config } = Pear
const key = config.args.pop()
const shouldCreateSwarm = !key
const swarm = new Hyperswarm()
const rl = readline.createInterface({
  input: new tty.ReadStream(0),
  output: new tty.WriteStream(1)
})

const list =[]

swarm.on('connection', peer => {
  const name = b4a.toString(peer.remotePublicKey, 'hex').substr(0, 6)
  console.log(`[info] New peer joined, ${name}`)
  peer.on('data', message => appendMessage({ name, message }))
  peer.on('error', e => console.log(`Connection error: ${e}`))
})
swarm.on('update', () => {
  console.log(`[info] Number of connections is now ${swarm.connections.size}`)
})

console.log('Welcome, commands acepted: \n :joinroom id or number of room \n :createroom \n :listroom \n');


rl.input.setMode(tty.constants.MODE_RAW)
rl.on('data', line => {
  if (line[0] === ":") {
    selectCmd(line)
  } else {
    sendMessage(line)
  }
  rl.prompt()
})
rl.prompt()

async function createChatRoom() {
  const topicBuffer = crypto.randomBytes(32)
  await joinSwarm(topicBuffer)
  const topic = b4a.toString(topicBuffer, 'hex')
  console.log(`[info] Created new chat room: ${topic}`)
  list.push(topic)
}

async function joinChatRoom(topicStr) {
  const topicBuffer = b4a.from(topicStr, 'hex')
  await joinSwarm(topicBuffer)
  console.log(`[info] Joined chat room`)
}

async function joinSwarm(topicBuffer) {
  const discovery = swarm.join(topicBuffer, { client: true, server: true })
  await discovery.flushed()
}

function sendMessage(message) {
  const peers = [...swarm.connections]
  for (const peer of peers) peer.write(message)
}

function appendMessage({ name, message }) {
  console.log(`[${name}] ${message}`)
}


async function selectCmd(cmd) {
  const value = cmd.split(' ')
  switch (value[0]) {
    case ":joinroom":
      if(value[1].length<32){
        await joinChatRoom(list[value[1]])
      }else{
        await joinChatRoom(value[1])
      }
      break;
    case ":createroom":
      await createChatRoom()
      break;
    case ":listroom":
      if(list.length>0){
      console.log('\n')
      list.forEach((item, index) => {
        console.log(index,'-',item,'\n')
      });
    }else{
      console.log('\n You don\'t have chat rooms created.')
    }
      break;
    default:
      console.log('\n',"unrecognized command",'\n')
  }
}