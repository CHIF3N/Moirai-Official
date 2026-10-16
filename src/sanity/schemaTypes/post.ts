const post = {
    name: 'post',
    title: 'Blog Posts',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'hiddenFromSite',
            title: 'Hide from site',
            type: 'boolean',
            description: 'Keep this post in the Studio but hide it from the Journal.',
            initialValue: false,
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
        },
        {
            name: 'body',
            title: 'Content',
            type: 'text',
        },
        {
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        },
    ],
}

export default post