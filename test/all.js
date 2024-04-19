const test = require('brittle')
const list = []

runTests()
async function runTests () {
  //const test = (await import('brittle')).default
  await import('../index');
  //test.pause()

  test('Testing creation of chatrooms', async function (t) {
    await createChatRoom()
  })

  test('Sending test message in the new chatroom', async function(t){
    sendMessage('First tes Message')
    sendMessage('Second test Message')
    sendMessage('Third test Message')
  })

  test('Testing cmd selector', async function (t) {
    await selectCmd(':listroom');
    await selectCmd(':createroom');
    await selectCmd(':joinroom 0');
    await selectCmd(':listroomsss'); ///wrong command
  })

  test('Create more chatrooms to test', async function (t) {
    await createChatRoom()
    await createChatRoom()
    await createChatRoom()
  })

  test('Testing the Joins to the rooms', async function (t) {
    list.forEach(async (item, index) => {
      await joinChatRoom(item)
      sendMessage('Message rom:',index,'\n')
    })
  })

  test.resume()
}
