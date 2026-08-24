import React from 'react'
import {Link} from 'sanity/router'

export default function QuickLink(props) {
  const {schemaType} = props
  const {options, title} = schemaType
  const {slug} = options

  return (
    <div style={{padding: '1rem 0'}}>
      <Link href={`/structure/${slug}`}>Go to {title.toLowerCase()} section</Link>
    </div>
  )
}
