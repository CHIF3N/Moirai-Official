/* eslint-disable @typescript-eslint/no-explicit-any */
const imageWithAlt = {
    type: 'image',
    options: { hotspot: true },
    fields: [
        {
            name: 'alt',
            title: 'Alt text',
            type: 'string',
            description: 'Describe the garment for screen readers and search engines, e.g. "Ivory corseted bridal gown with lace train".',
        },
    ],
}

const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Product Name',
            type: 'string',
            validation: (r: any) => r.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (r: any) => r.required(),
        },
        {
            name: 'hiddenFromSite',
            title: 'Hide from site',
            type: 'boolean',
            description: 'Keep this product in the Studio but hide it from every public page.',
            initialValue: false,
        },
        {
            name: 'featured',
            title: 'Show on Homepage',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }]
        },
        {
            name: 'priceType',
            title: 'Pricing',
            type: 'string',
            description: 'Use "Price on request" for bridal, bespoke commissions and corsetry.',
            options: {
                list: [
                    { title: 'Fixed price', value: 'fixed' },
                    { title: 'Price on request', value: 'on_request' },
                ],
                layout: 'radio',
            },
            initialValue: 'fixed',
        },
        {
            name: 'price',
            title: 'Price (XAF)',
            type: 'number',
            description: 'The real price in FCFA, e.g. 45000. USD shown on the site is converted from this.',
            hidden: ({ document }: any) => document?.priceType === 'on_request',
            validation: (r: any) => r.custom((value: number | undefined, ctx: any) => {
                if (ctx.document?.priceType === 'on_request') return true
                if (typeof value !== 'number') return 'Set a price, or switch Pricing to "Price on request".'
                return true
            }).warning().custom((value: number | undefined) => {
                if (typeof value === 'number' && value > 0 && value < 1000) return `${value} FCFA looks too low. Check for missing zeros.`
                return true
            }).warning(),
        },
        {
            name: 'available',
            title: 'Available to order',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'image',
            title: 'Image',
            ...imageWithAlt,
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [imageWithAlt]
        },
        {
            name: 'sizes',
            title: 'Available Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            description: 'Leave empty for made-to-measure pieces.',
        },
        {
            name: 'colors',
            title: 'Available Colours',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        },
        {
            name: 'sizeGuide',
            title: 'Size Guide',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'fabricDetails',
            title: 'Fabric Details',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'deliveryInfo',
            title: 'Delivery Info',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'relatedProducts',
            title: 'Related Products (You May Also Like)',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }]
        },
    ],
    preview: {
        select: { title: 'title', price: 'price', priceType: 'priceType', media: 'image' },
        prepare({ title, price, priceType, media }: any) {
            const subtitle = priceType === 'on_request' ? 'Price on request' : (typeof price === 'number' ? `${price} FCFA` : 'No price set')
            return { title, subtitle, media }
        },
    },
}

export default product
