import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'sanity/router'
import {FormField} from 'sanity'

export default class QuickLink extends React.Component {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    description: PropTypes.string
  }

  render() {
    const {type} = this.props
    const {description, slug} = type.options
    return (
      <FormField label={type.title} description={type.description}>
        <Link href={`/desk/${slug}`}>
          Go to {type.title.toLowerCase()} section
        </Link>
      </FormField>
    )
  }
}
