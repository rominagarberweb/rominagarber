import { from, merge, of } from 'rxjs'
import { createEventHandler } from 'react-props-stream'
import { catchError, map, startWith, switchMap, mergeMap, toArray } from 'rxjs/operators'
import { deploy } from './datastores/deploy'
import { Site, WidgetOptions } from './types'
import { stateReducer$ } from './reducers'

const noop = () => void 0

const INITIAL_PROPS = {
  title: 'Deploy site',
  sites: [],
  isLoading: true,
  onDeploy: noop
}

export const props$ = () => {
  const options = {
    description:
      'Because the site is a static build, it needs to be re-deployed to see the changes when documents are published.',
    sites: [
      {
        buildHookId: '5e42d092d533bec6b2d81d38',
        title: 'Website',
        name: 'rominagarber',
        apiId: '7f1d2ebe-12b4-4386-a4a0-18fe38778bb2'
      },
      // {
      //   buildHookId: '5e42d092e1fc53d6daed66dc',
      //   title: 'Sanity Studio',
      //   name: 'rominagarber-studio',
      //   apiId: 'ea96b6d7-07e2-4399-b12e-bfbdbac7e184'
      // }
    ]
  }
  const sites = (options.sites || []).map(site => ({
    id: site.apiId,
    name: site.name,
    title: site.title,
    buildHookId: site.buildHookId,
    url: site.name && `https://${site.name}.netlify.com/`,
    adminUrl: site.name && `https://app.netlify.com/sites/${site.name}`
  }))
  const [onDeploy$, onDeploy] = createEventHandler<Site>()
  const setSitesAction$ = of(sites).pipe(map(sites => ({ type: 'setSites', sites })))
  const deployAction$ = onDeploy$.pipe(map(site => ({ type: 'deploy/started', site })))
  const deployResult$ = onDeploy$.pipe(switchMap(site => deploy(site)))
  const deployCompletedAction$ = deployResult$.pipe(
    map(
      result => ({ type: 'deploy/completed', ...result }),
      catchError(error => of({ type: 'deploy/failed', error }))
    )
  )

  merge(setSitesAction$, deployAction$, deployCompletedAction$)
    .pipe(stateReducer$)
    .subscribe()

  return of(sites).pipe(
    map(sites => {
      return {
        sites,
        title: options.title || INITIAL_PROPS.title,
        description: options.description,
        isLoading: false,
        onDeploy
      }
    }),
    startWith(INITIAL_PROPS)
  )
}
