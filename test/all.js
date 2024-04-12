runTests()
async function runTests () {
  const test = (await import('brittle')).default
  test.pause()

  await import('./createrooms.js')
  await import('./connectrooms.js')

  test.resume()
}
