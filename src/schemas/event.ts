export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Event Title',
      validation: (Rule: any) => Rule.required()
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
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Event Logo'
    },
    {
      name: 'startDate',
      type: 'date',
      title: 'Start Date'
    },
    {
      name: 'endDate',
      type: 'date',
      title: 'End Date'
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location'
    },
    {
      name: 'tier',
      type: 'string',
      title: 'Competition Tier',
      options: {
        list: [
          { title: 'Lions', value: 'lions' },
          { title: 'Tigers', value: 'tigers' },
          { title: 'Panthers', value: 'panthers' }
        ]
      }
    },
    {
      name: 'tagline',
      type: 'string',
      title: 'Tagline'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'formats',
      type: 'array',
      title: 'Match Formats',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ageGroup',
              type: 'string',
              title: 'Age Group'
            },
            {
              name: 'format',
              type: 'string',
              title: 'Format Details'
            },
            {
              name: 'duration',
              type: 'string',
              title: 'Match Duration'
            }
          ]
        }
      ]
    },
    {
      name: 'gallery',
      type: 'reference',
      title: 'Gallery',
      to: [{ type: 'gallery' }]
    }
  ]
}