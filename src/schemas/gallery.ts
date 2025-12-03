export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Gallery Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'event',
      type: 'reference',
      title: 'Event',
      to: [{ type: 'event' }]
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'dateRange',
      type: 'string',
      title: 'Date Range'
    },
    {
      name: 'photos',
      type: 'array',
      title: 'Photos',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption'
            },
            {
              name: 'tags',
              type: 'array',
              title: 'Tags',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    }
  ]
}