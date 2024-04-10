const test = require('brittle')
const Hyperswarm = require('hyperswarm')
const b4a = require('b4a')
const crypto = require('hypercore-crypto')

const list =[]

test('Testing creation of chatrooms', async function (t) {
    await createChatRoom()
    await createChatRoom()
    await createChatRoom()
    test('Testing connections', async function(t){
        list.forEach(async (item, index) => {
            await joinChatRoom(item)
        });
    })
})

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