import test from 'brittle'
import Hyperswarm from 'hyperswarm'
import b4a from 'b4a'
import crypto from 'hypercore-crypto'
import readline from 'bare-readline'


const swarm = new Hyperswarm()
const list = []
runTests()

async function runTests () {
  
  test.pause()

  test('Testing creation of chatrooms', async (t) => {
    await createChatRoom()
    t.pass('room created.')
  })

  test('Sending test message in the new chatroom', async function (t) {
    sendMessage('First test Message')
    sendMessage('Second test Message')
    sendMessage('Third test Message')
    t.pass('msg sended')
  })

  test('Testing cmd selector', async function (t) {
    await selectCmd(':listroom')
    await selectCmd(':createroom')
    await selectCmd(':joinroom 0')
    await selectCmd(':listroomsss')  ///wrong command
    t.pass('commands')
  })

  test('Create more chatrooms to test', async function (t) {
    await createChatRoom()
    await createChatRoom()
    t.pass()
  })

  test('Testing the Joins to the rooms', async function (t) {
    list.forEach(async (item, index) => {
      await joinChatRoom(item)
      sendMessage('Message rom:', index, '\n')
    })
    t.pass('end last test')
    t.end()
  })

  test.resume()
}

async function createChatRoom () {
  const topicBuffer = crypto.randomBytes(32)
  await joinSwarm(topicBuffer)
  const topic = b4a.toString(topicBuffer, 'hex')
  console.log(`[info] Created new chat room: ${topic}`)
  list.push(topic)
}

async function joinChatRoom (topicStr) {
  const topicBuffer = b4a.from(topicStr, 'hex')
  await joinSwarm(topicBuffer)
  console.log('[info] Joined chat room')
}

async function joinSwarm (topicBuffer) {
  const discovery = swarm.join(topicBuffer, { client: true, server: true })
  await discovery.flushed()
}

function sendMessage (message) {
  const peers = [...swarm.connections]
  for (const peer of peers) peer.write(message)
}

function appendMessage ({ name, message }) {
  console.log(`[${name}] ${message}`)
}

async function selectCmd (cmd) {
  const value = cmd.split(' ')
  switch (value[0]) {
    case ':joinroom':
      if (value[1].length < 32) {
        await joinChatRoom(list[value[1]])
      } else {
        await joinChatRoom(value[1])
      }
      break
    case ':createroom':
      await createChatRoom()
      break
    case ':listroom':
      if (list.length > 0) {
        console.log('\n')
        list.forEach((item, index) => {
          console.log(index, '-', item, '\n')
        })
      } else {
        console.log('\n You don\'t have chat rooms created.')
      }
      break
    default:
      console.log('\n', 'unrecognized command', '\n')
  }
}