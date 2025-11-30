addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST allowed', { status: 405 })
  }

  try {
    const data = await request.json()
    const review = data.review || ''

    // 这里可以调用 OpenAI API 做润色，这里先用示例返回不同长度
    const shortVersion = review.slice(0, 50)
    const mediumVersion = review.slice(0, 150)
    const longVersion = review.slice(0, 300)

    const output = {
      short: shortVersion,
      medium: mediumVersion,
      long: longVersion
    }

    return new Response(JSON.stringify(output), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
