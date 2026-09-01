import React, {useEffect} from 'react'
import {useEditor} from '@portabletext/editor'
import {defineBehavior, forward, raise} from '@portabletext/editor/behaviors'

const EXCLUSIVE_GROUPS = [
  ['alignLeft', 'alignCenter', 'alignRight'],
  ['lowercase', 'uppercase', 'capitalize', 'smallCaps', 'allSmallCaps']
]

function ExclusiveDecoratorBehaviorPlugin() {
  const editor = useEditor()

  useEffect(() => {
    return editor.registerBehavior({
      behavior: defineBehavior({
        on: 'decorator.add',
        guard: ({event}) => {
          const group = EXCLUSIVE_GROUPS.find(names => names.includes(event.decorator))
          if (!group) {
            return false
          }
          return {others: group.filter(name => name !== event.decorator)}
        },
        actions: [
          ({event}, {others}) => [
            forward(event),
            ...others.map(decorator =>
              raise({
                type: 'decorator.remove',
                decorator
              })
            )
          ]
        ]
      })
    })
  }, [editor])

  return null
}

export function exclusiveDecoratorPlugins(props) {
  return (
    <>
      {props.renderDefault(props)}
      <ExclusiveDecoratorBehaviorPlugin />
    </>
  )
}
