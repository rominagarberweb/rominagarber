import {FiBook, FiFeather, FiFileText, FiGrid, FiSettings, FiUser} from 'react-icons/fi'
import {GiBookshelf} from 'react-icons/gi'
import {IoIosColorPalette} from 'react-icons/io'
import {MdEvent, MdHeadsetMic, MdLightbulbOutline} from 'react-icons/md'

const hiddenDocTypes = listItem =>
  ![
    'aboutPage',
    'agent',
    'author',
    'book',
    'blogPage',
    'booksPage',
    'category',
    'colorTheme',
    'event',
    'eventsPage',
    'homePage',
    'post',
    'press',
    'series',
    'siteSettings',
    'tip',
    'bioLinks',
    'saysaSays'
  ].includes(listItem.getId())

export default S =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog posts')
        .icon(FiFeather)
        .schemaType('post')
        .child(
          S.documentList('post')
            .title('Blog posts')
            .filter('_type == $type')
            .params({type: 'post'})
        ),
      S.listItem()
        .title('Books')
        .icon(FiBook)
        .schemaType('book')
        .child(
          S.documentList('book')
            .title('Books')
            .filter('_type == $type')
            .params({type: 'book'})
        ),
      S.listItem()
        .title('Events')
        .icon(MdEvent)
        .schemaType('event')
        .child(
          S.documentList('event')
            .title('Events')
            .filter('_type == $type')
            .params({type: 'event'})
            .menuItems(S.documentTypeList('event').getMenuItems())
        ),
      S.listItem()
        .title('Pages')
        .icon(FiFileText)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('About page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('About page')
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                ),
              S.listItem()
                .title('Blog page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Blog page')
                    .schemaType('blogPage')
                    .documentId('blogPage')
                ),
              S.listItem()
                .title('Books page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Books page')
                    .schemaType('booksPage')
                    .documentId('booksPage')
                ),
                S.listItem()
                .title('Series')
                .icon(GiBookshelf)
                .schemaType('series')
                .child(
                  S.documentList('series')
                    .title('Series')
                    .filter('_type == $type')
                    .params({type: 'series'})
                ),
              S.listItem()
                .title('Events page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Events page')
                    .schemaType('eventsPage')
                    .documentId('eventsPage')
                ),
              S.listItem()
                .title('Home page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Home page')
                    .schemaType('homePage')
                    .documentId('homePage')
                ),
              S.listItem()
                .title('Bio links page')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Bio links page')
                    .schemaType('bioLinks')
                    .documentId('bioLinks')
                ),
              S.listItem()
                .title('Saysa Says')
                .icon(FiFileText)
                .child(
                  S.editor()
                    .title('Saysa Says')
                    .schemaType('saysaSays')
                    .documentId('saysaSays')
                )
            ])
        ),
      // S.listItem()
      //   .title('Press items')
      //   .icon(FaRegNewspaper)
      //   .schemaType('press')
      //   .child(
      //     S.documentList('press')
      //       .title('Press items')
      //       .filter('_type == $type')
      //       .params({ type: 'press' })
      //     ),
      S.listItem()
        .title('Writing tips')
        .icon(MdLightbulbOutline)
        .schemaType('tip')
        .child(
          S.documentList('tip')
            .title('Writing tips')
            .filter('_type == $type')
            .params({type: 'tip'})
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(FiSettings)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Agent')
                .icon(MdHeadsetMic)
                .child(
                  S.editor()
                    .title('Agent')
                    .schemaType('agent')
                    .documentId('agent')
                ),
              S.listItem()
                .title('Authors')
                .icon(FiUser)
                .schemaType('author')
                .child(
                  S.documentList('author')
                    .title('Authors')
                    .filter('_type == $type')
                    .params({type: 'author'})
                ),
              S.listItem()
                .title('Categories')
                .icon(FiGrid)
                .schemaType('category')
                .child(
                  S.documentList('category')
                    .title('Categories')
                    .filter('_type == $type')
                    .params({type: 'category'})
                ),
              S.listItem()
                .title('Color themes')
                .icon(IoIosColorPalette)
                .schemaType('colorTheme')
                .child(
                  S.documentList('colorTheme')
                    .title('Color themes')
                    .filter('_type == $type')
                    .params({type: 'colorTheme'})
                )
            ])
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
