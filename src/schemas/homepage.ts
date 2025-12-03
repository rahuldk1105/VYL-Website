export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title'
    },
    {
      name: 'heroCarousel',
      type: 'array',
      title: 'Hero Carousel',
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
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'subtitle',
              type: 'string',
              title: 'Subtitle'
            },
            {
              name: 'ctaText',
              type: 'string',
              title: 'CTA Text'
            },
            {
              name: 'ctaLink',
              type: 'string',
              title: 'CTA Link'
            }
          ]
        }
      ]
    },
    {
      name: 'missionText',
      type: 'text',
      title: 'Mission Text'
    },
    {
      name: 'missionImages',
      type: 'array',
      title: 'Mission Images',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'statistics',
      type: 'array',
      title: 'Statistics',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label'
            },
            {
              name: 'value',
              type: 'number',
              title: 'Value'
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon (optional)'
            }
          ]
        }
      ]
    }
  ]
}