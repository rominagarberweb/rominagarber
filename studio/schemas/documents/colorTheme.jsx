import React from 'react'
import { IoIosColorPalette } from 'react-icons/io'

export default {
  name: 'colorTheme',
  type: 'document',
  title: 'Color theme',
  icon: IoIosColorPalette,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required()
    },
    {
      title: 'Primary color',
      name: 'primary',
      type: 'color',
      validation: Rule => Rule.required()
    },
    {
      title: 'Secondary color',
      name: 'secondary',
      type: 'color',
      validation: Rule => Rule.required()
    },
    {
      title: 'Tertiary color',
      name: 'tertiary',
      type: 'color',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      colour1: 'primary.hex',
      colour2: 'secondary.hex',
      colour3: 'tertiary.hex'
    },
    prepare(selection) {
      const {title, colour1, colour2, colour3} = selection
      return {
        title,
        media:
          <div style={{'display': 'flex', 'flex-direction': 'column', 'width': '100%'}}>
            <span style={{'background-color': colour1, 'width': '100%'}}>&nbsp;</span>
            <span style={{'background-color': colour2, 'width': '100%'}}>&nbsp;</span>
            <span style={{'background-color': colour3, 'width': '100%'}}>&nbsp;</span>
          </div>
      }
    }
  }
}
