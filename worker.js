addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST allowed', { status: 200 })
  }

  let body = {}
  try {
    body = await request.json()
  } catch(e) {
    return new Response('Invalid JSON', { status: 400 })
  }

  const review = body.review || ''

  
  const output = {
    short: review.slice(0, 50),
    medium: review.slice(0, 100),
    long: review
  }

  return new Response(JSON.stringify(output), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" 
    }
  })
}
