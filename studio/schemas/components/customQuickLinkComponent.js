import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'part:@sanity/base/router'
import FormField from 'part:@sanity/components/formfields/default'

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
    const {slug} = type.options

    return (
      <FormField label={type.title} description={`You can manage ${type.title.toLowerCase()} from its own section in the content menu.`}>
        <Link href={`/desk/${slug}`}>
          Go to {type.title.toLowerCase()} section
        </Link>
      </FormField>
    )
  }
}
