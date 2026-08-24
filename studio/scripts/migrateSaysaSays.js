import {getCliClient} from 'sanity/cli'

// Copies the Saysa Says singleton into a simple page at /saysaSays/.
// Run after removing web/saysaSays.njk (and its layout/data files) so the URLs do not collide:
//   npx sanity exec scripts/migrateSaysaSays.js --with-user-token
// Then remove saysaSays from the schema, desk, singleton list, and reserved slugs.

const client = getCliClient()

function key (prefix) {
  return `${prefix}${Math.random().toString(36).slice(2, 10)}`
}

async function run () {
  const existing = await client.fetch(
    '*[_type == "simplePage" && slug.current == "saysaSays"][0]{_id}'
  )
  if (existing) {
    console.log('Simple page for saysaSays already exists:', existing._id)
    return
  }

  const source = await client.fetch(
    '*[_type == "saysaSays"][0]{_id, title, description, bodyContent, cta}'
  )
  if (!source) {
    throw new Error('Could not find the Saysa Says singleton')
  }

  const doc = {
    _id: 'simplePage-saysaSays',
    _type: 'simplePage',
    title: source.title || 'Saysa Says',
    slug: {_type: 'slug', current: 'saysaSays'},
    description: source.description || 'A Lobizona deleted scene',
    pageBuilder: [
      {
        _key: key('text'),
        _type: 'textBlock',
        body: source.bodyContent || []
      },
      {
        _key: key('cta'),
        _type: 'callToAction',
        body: source.cta || []
      }
    ]
  }

  const created = await client.createIfNotExists(doc)
  console.log('Created simple page', created._id)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
