import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'sanity/router'
import {FormField} from 'sanity'

export default class QuickLink extends React.Component {
  static propTypes = {
    schemaType: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      options: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  render() {
    const {schemaType} = this.props
    const {options, title} = schemaType
    const {slug} = options
    return (
      <div style={{padding: '1rem 0'}}>
        <Link href={`/desk/${slug}`}>
          Go to {title.toLowerCase()} section
        </Link>
      </div>
    )
  }
}
