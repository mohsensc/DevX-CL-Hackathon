import { get, list } from '@vercel/blob'

const inquiries = []
let cursor

do {
  const page = await list({ prefix: 'inquiries/', cursor })
  for (const blob of page.blobs) {
    const result = await get(blob.pathname, { access: 'private' })
    inquiries.push(JSON.parse(await new Response(result.stream).text()))
  }
  cursor = page.cursor
} while (cursor)

inquiries.sort((first, second) => first.receivedAt.localeCompare(second.receivedAt))

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(inquiries, null, 2))
} else {
  for (const inquiry of inquiries) {
    console.log(`\n${inquiry.receivedAt}  ${inquiry.company}  (${inquiry.interest})`)
    console.log(`${inquiry.fullName} <${inquiry.email}>`)
    if (inquiry.message) console.log(inquiry.message)
  }
  console.log(`\n${inquiries.length} sponsor inquiries`)
}
