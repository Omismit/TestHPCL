
runTests()

async function runTests () {
  const test = (await import('brittle')).default
  await import('../index.js')
  
  test.pause()

  test('Testing creation of chatrooms', async (t) => {
    await createChatRoom()
    t.pass('room created.')
    console.log('test1')
  })

  test('Sending test message in the new chatroom', async function (t) {
    sendMessage('First tes Message')
    sendMessage('Second test Message')
    sendMessage('Third test Message')
    t.pass()
    console.log('test2')
  })

  test('Testing cmd selector', async function (t) {
    await selectCmd(':listroom')
    await selectCmd(':createroom')
    await selectCmd(':joinroom 0')
    await selectCmd(':listroomsss')  ///wrong command
    t.pass()
    console.log('test3')
  })

  test('Create more chatrooms to test', async function (t) {
    await createChatRoom()
    await createChatRoom()
    await createChatRoom()
    console.log('test4')
  })

  test('Testing the Joins to the rooms', async function (t) {
    list.forEach(async (item, index) => {
      await joinChatRoom(item)
      sendMessage('Message rom:', index, '\n')
    })
    t.pass()
    console.log('test5')
  })

  test.resume()
}
