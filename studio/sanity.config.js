import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'
import {colorInput} from '@sanity/color-input'
import {
  dashboardTool,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

export default defineConfig({
  title: 'rominagarbar',
  projectId: 'hic407cy',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: deskStructure
    }),
    colorInput(),
    dashboardTool({
      widgets: [
        netlifyWidget({
          layout: 'medium',
          title: 'Website Deploy',
          sites: [
            // {
            //   title: 'Rominagarber Studio',
            //   apiId: 'ea96b6d7-07e2-4399-b12e-bfbdbac7e184',
            //   buildHookId: '5e42d092e1fc53d6daed66dc',
            //   name: 'rominagarber-studio',
            //   url: 'https://rominagarber-studio.netlify.app'
            // },
            {
              title: 'Website',
              apiId: '888eddbc-bff0-4896-a29b-409fbf35dea8',
              buildHookId: '6424e735fa67466e2403b344',
              name: 'rominagarber',
              url: 'https://rominagarber.netlify.app',
            },
          ]
        }),
        // projectInfoWidget(),
        projectUsersWidget({layout: 'medium'}),
      ]
    })
  ],
  schema: {
    types: schemas
  }
})
