const test = require('brittle')
const Hyperswarm = require('hyperswarm')
const b4a = require('b4a')
const crypto = require('hypercore-crypto')

const list =[]

test('Testing creation of chatrooms', async function (t) {
  await createChatRoom()
})

async function createChatRoom () {
  const topicBuffer = crypto.randomBytes(32)
  await joinSwarm(topicBuffer)
  const topic = b4a.toString(topicBuffer, 'hex')
  console.log(`[info] Created new chat room: ${topic}`)
  list.push(topic)
}
