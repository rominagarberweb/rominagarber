export default {
  name: 'pageBuilder',
  type: 'array',
  title: 'Page content',
  of: [
    {type: 'introBlock'},
    {type: 'textBlock'},
    {type: 'downloadList'},
    {type: 'callToAction'},
    {type: 'imageBlock'}
  ],
  options: {
    insertMenu: {
      filter: true,
      views: [{name: 'list'}]
    }
  }
}
