import S from '@sanity/desk-tool/structure-builder'
import {
  FaRegNewspaper
} from 'react-icons/fa'
import {
  FiBook,
  FiFeather,
  FiFileText,
  FiGrid,
  FiSettings,
  FiUser,
} from 'react-icons/fi'
import {
  MdEvent,
  MdLightbulbOutline
} from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['category', 'author', 'post', 'event', 'siteSettings'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog posts')
        .icon(FiFeather)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Books')
        .icon(FiBook)
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Events')
        .icon(MdEvent)
        .schemaType('event')
        .child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Pages')
        .icon(FiFileText)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.listItem()
        .title('Press items')
        .icon(FaRegNewspaper)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog posts')),
      S.listItem()
        .title('Tips')
        .icon(MdLightbulbOutline)
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(FiSettings)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Authors')
                .icon(FiUser)
                .schemaType('author')
                .child(S.documentTypeList('author').title('Authors')),
              S.listItem()
                .title('Categories')
                .icon(FiGrid)
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
            ])
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
