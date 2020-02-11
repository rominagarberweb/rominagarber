export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-eleventy-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5e42d092e1fc53d6daed66dc',
                  title: 'Sanity Studio',
                  name: 'rominagarber-studio',
                  apiId: 'ea96b6d7-07e2-4399-b12e-bfbdbac7e184'
                },
                {
                  buildHookId: '5e42d092d533bec6b2d81d38',
                  title: 'Blog Website',
                  name: 'rominagarber',
                  apiId: '7f1d2ebe-12b4-4386-a4a0-18fe38778bb2'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/rominagarberweb/rominagarber',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://rominagarber.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
