// The Moirai Journal — editorial articles published with the site.
// Educational and brand-voice writing only: no invented interviews, clients,
// awards or claims about internal operations. Images are existing Moirai
// photographs (Sanity asset ids), used as editorial imagery.
// Posts written in the Sanity Studio appear in the Journal alongside these.

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }

export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string // ISO date of publication on the site
  topic: string
  image: string // Sanity asset id or a file in /public
  imageAlt: string
  body: Block[]
}

const PUBLISHED = '2026-10-16'

export const ARTICLES: Article[] = [
  {
    slug: 'not-a-trend-identity',
    title: 'Not a Trend. Identity.',
    excerpt: 'Trends ask what everyone is wearing this season. Identity asks a better question: what do you want your clothes to say about who you are becoming?',
    publishedAt: PUBLISHED,
    topic: 'Philosophy',
    image: 'image-b6a50a0988279ec0e989bb6a301a027fef592b29-1024x1280-jpg',
    imageAlt: 'Woman in a red printed dress with sculpted off-shoulder sleeves, standing on a staircase',
    body: [
      { type: 'p', text: 'Every morning starts with a small decision that most people make on autopilot: what to wear. It feels practical — weather, plans, what is clean — but it is also the first statement you make to the world before you have said a word. Clothes are how you introduce yourself to rooms you have not entered yet.' },
      { type: 'p', text: 'Trends turn that statement into a borrowed sentence. They are useful for designers and retailers, because they tell large numbers of people what to buy at the same time. They are less useful for the person wearing them, because a trend is, by definition, about everyone else.' },
      { type: 'h2', text: 'Dressing as self-description' },
      { type: 'p', text: 'Identity-led dressing starts from the opposite end. Instead of asking what is current, it asks what is true: Which silhouettes make you stand differently? Which colours feel like you on a good day? Which pieces have you kept for years while others came and went?' },
      { type: 'p', text: 'Those answers rarely come from a lookbook. They come from paying attention to how you feel in what you wear — and noticing the gap between the person in the mirror and the person you are working towards.' },
      { type: 'quote', text: 'Fashion is not simply what someone wears. It is an expression of who they are becoming.' },
      { type: 'h2', text: 'Becoming, not arriving' },
      { type: 'p', text: '“Made for who you are becoming” is not a slogan about perfection. Identity moves. A graduation, a wedding, a first big role, a new city — each one changes how you want to be seen, and your wardrobe should be allowed to change with you.' },
      { type: 'p', text: 'This is why considered pieces matter. A garment designed around your body and your moment carries meaning long after the event. It reminds you who you were deciding to be when you wore it.' },
      { type: 'h2', text: 'A simple practice' },
      { type: 'list', items: [
        'Pick out the three pieces you reach for when you want to feel most like yourself. Look for what they share — a neckline, a colour, a structure.',
        'Notice what you only bought because it was everywhere. Ask whether it still feels like yours.',
        'Before your next important occasion, start with the feeling you want to carry into the room, not the outfit.',
      ] },
      { type: 'p', text: 'Trends will keep arriving. You do not have to follow them to be well dressed. You only have to know what you want your clothes to say — and choose pieces that say it clearly.' },
    ],
  },
  {
    slug: 'the-art-of-corsetry',
    title: 'The Art of Corsetry: Structure, Silhouette and Craft',
    excerpt: 'A well-made corset is architecture for the body. Here is what goes into one — and what to look for when you choose yours.',
    publishedAt: PUBLISHED,
    topic: 'Craft',
    image: 'image-30c127df06aa843a2b9b77b1d75f5741d833185c-1024x1280-jpg',
    imageAlt: 'Red corseted dress photographed against a deep green backdrop',
    body: [
      { type: 'p', text: 'Few garments are as misunderstood as the corset. For many people the word still brings to mind discomfort and restriction. Contemporary corsetry is something else entirely: a structured garment that shapes, supports and frames the body — and, when it is made well, one that feels secure rather than tight.' },
      { type: 'h2', text: 'What makes a corset a corset' },
      { type: 'p', text: 'At its core, a corset is a fitted bodice built from several shaped panels, reinforced with vertical boning and closed firmly at the front, back or side. The panels create the curve; the boning holds it; the closure lets the wearer adjust the fit. Remove any one of those and you have a different garment.' },
      { type: 'list', items: [
        'Panels — individually cut pieces that follow the lines of the torso. More panels generally allow a more precise shape.',
        'Boning — flexible steel, synthetic or spiral bones inserted into channels to keep the structure upright and smooth.',
        'Strength layer — a firm, tightly woven fabric that does the structural work beneath the outer fabric.',
        'Closure — lacing, hooks, zips or a busk, chosen for both function and the line of the finished piece.',
      ] },
      { type: 'h2', text: 'Fit is everything' },
      { type: 'p', text: 'Because a corset sits so close to the body, small differences in measurement make a visible difference in the result. Ready-to-wear corsets are cut for an average figure; a made-to-measure corset is drafted around one. That is why fittings matter: they are the moment the pattern is adjusted to the way you actually stand, sit and move.' },
      { type: 'p', text: 'A good fit should feel firm and supportive, with no pinching at the top or bottom edge and no gaping at the bust. You should be able to breathe, sit and move your arms freely.' },
      { type: 'h2', text: 'From underwear to statement' },
      { type: 'p', text: 'Today corsets are worn openly — over shirts, with tailored trousers, as the bodice of an evening gown or as a centrepiece for a celebration. Structure gives a garment presence: it changes how you hold yourself and how a fabric falls.' },
      { type: 'quote', text: 'A corset should not change who you are. It should help you stand like you mean it.' },
      { type: 'h2', text: 'Questions to ask before you commission one' },
      { type: 'list', items: [
        'Where will you wear it, and for how long? A piece for an evening and a piece for daily wear are built differently.',
        'Do you want it visible, as a statement, or worn beneath another garment?',
        'Which neckline and length suit the rest of the look you have in mind?',
        'How many fittings will the process include, and how far ahead of your date should you start?',
      ] },
      { type: 'p', text: 'Corsetry rewards patience. Given time and an honest conversation about how you want to feel, it becomes one of the most personal garments you can own.' },
    ],
  },
  {
    slug: 'bespoke-fashion-explained',
    title: 'Bespoke Fashion Explained: From First Conversation to Final Fitting',
    excerpt: 'Bespoke means a garment designed and made for one person. Here is how the process usually unfolds, step by step.',
    publishedAt: PUBLISHED,
    topic: 'Bespoke',
    image: '/collections/bespoke-blue-suit-3.jpg',
    imageAlt: 'Woman in a tailored sky-blue Moirai power suit, seated against a peach backdrop',
    body: [
      { type: 'p', text: '“Bespoke” is used loosely in fashion, sometimes for anything with a monogram. In its truest sense it means a garment designed and made for one specific person: their measurements, their posture, their occasion and their taste. Nothing about it starts from a standard size.' },
      { type: 'h2', text: 'Bespoke, made-to-measure and ready-to-wear' },
      { type: 'list', items: [
        'Ready-to-wear is produced in standard sizes for many people.',
        'Made-to-measure adapts an existing design or pattern to your measurements.',
        'Bespoke begins with a new conversation and a pattern drafted for you, refined through fittings.',
      ] },
      { type: 'h2', text: '1. The consultation' },
      { type: 'p', text: 'Everything begins with a conversation. What is the occasion? How do you want to feel? What do you already love wearing, and what do you never want to wear again? Reference images help, but so does describing a feeling. This is also when practical questions are settled: your date, your budget and how many fittings you can attend.' },
      { type: 'h2', text: '2. Design and fabric' },
      { type: 'p', text: 'The ideas become a direction — a silhouette, a neckline, a length — and fabrics are chosen to suit both the design and the way the garment will be worn. A fabric that photographs beautifully may not be the one you want to dance in for six hours.' },
      { type: 'h2', text: '3. Measurements and pattern' },
      { type: 'p', text: 'Detailed measurements are taken and a pattern is drafted from them. For structured pieces, a test version in plain fabric may be made first, so the shape can be checked before the final fabric is cut.' },
      { type: 'h2', text: '4. Fittings' },
      { type: 'p', text: 'Fittings are where a garment becomes yours. Seams are taken in or let out, hems are set, and the balance of the piece is adjusted to how you actually stand and move. Complex garments may need several fittings; simpler ones fewer.' },
      { type: 'h2', text: '5. The finished piece' },
      { type: 'p', text: 'Final details are completed, the garment is pressed, and it is handed over ready for its moment.' },
      { type: 'quote', text: 'The most valuable part of a bespoke garment is not the label. It is the attention.' },
      { type: 'h2', text: 'How long does it take?' },
      { type: 'p', text: 'It depends on the design, the materials and the number of fittings, so any honest atelier will agree a timeline with you at the consultation rather than quote one blindly. The best advice is simple: start earlier than you think you need to.' },
    ],
  },
  {
    slug: 'preparing-for-a-bespoke-consultation',
    title: 'How to Prepare for a Bespoke Consultation',
    excerpt: 'A little preparation turns a first meeting into a productive one. Use this checklist before you get in touch.',
    publishedAt: PUBLISHED,
    topic: 'Bespoke',
    image: 'image-870b382ac4b95e942d3b3f91989da7c8939541c8-1033x1280-jpg',
    imageAlt: 'Portrait of a woman in a sculptural black lace headpiece and printed garment',
    body: [
      { type: 'p', text: 'You do not need a finished design to commission a bespoke piece — working that out together is part of the point. But arriving with a few things in mind makes the first conversation clearer, and helps the design reflect you from the very beginning.' },
      { type: 'h2', text: 'Know your occasion and your date' },
      { type: 'p', text: 'Start with the event. A wedding, a gala, a graduation and a photoshoot all ask different things of a garment: how long you will wear it, how much you will move, how it will look on camera. Share your date as early as possible so there is time for fittings.' },
      { type: 'h2', text: 'Collect references — and say why' },
      { type: 'p', text: 'Save images of garments, details or even colours you are drawn to. The useful part is the reason behind each one: “I love the neckline here”, “I like how this fabric moves”, “this colour feels like me”. A designer can work with reasons far better than with a copy request.' },
      { type: 'h2', text: 'Think about what you never want' },
      { type: 'p', text: 'Dislikes are just as informative as likes. If you never feel comfortable in a particular length, a strapless top or a certain colour, say so at the start.' },
      { type: 'h2', text: 'Be open about your budget' },
      { type: 'p', text: 'Fabric, structure and handwork all affect the cost of a bespoke piece. Sharing a realistic range early lets the design be shaped to fit it, rather than revised later.' },
      { type: 'h2', text: 'Your checklist' },
      { type: 'list', items: [
        'The occasion and the date',
        'Three to five reference images, with a note on what you like about each',
        'Anything you know you do not want',
        'Colours or fabrics you are drawn to',
        'A budget range',
        'Your availability for fittings',
      ] },
      { type: 'p', text: 'When you are ready, send a message with whatever you have. A first conversation is exactly that — the beginning of one.' },
    ],
  },
  {
    slug: 'cameroonian-traditional-fashion-and-contemporary-couture',
    title: 'Cameroonian Traditional Fashion and the Future of Couture',
    excerpt: 'From the embroidered toghu to the flowing kaba, Cameroon’s dress traditions are a living vocabulary — and a powerful starting point for contemporary design.',
    publishedAt: PUBLISHED,
    topic: 'Heritage',
    image: 'image-b3286dd4eaa4c861c263cb3cb9616cc02186dc1c-1080x1080-jpg',
    imageAlt: 'Woman in a blue headwrap and flowing printed gown seated outside a weathered wooden house',
    body: [
      { type: 'p', text: 'Cameroon is often called “Africa in miniature”, and its clothing reflects that diversity. Across its regions and communities, dress carries information: where you are from, what you are celebrating, the respect you are showing. These traditions are not museum pieces. They are worn, adapted and reinvented every day.' },
      { type: 'h2', text: 'A vocabulary of cloth' },
      { type: 'list', items: [
        'Toghu — the richly embroidered attire associated with the Grassfields of the North-West, recognisable by its dark base cloth and vivid, intricate embroidery.',
        'Kaba (or kaba ngondo) — the loose, flowing dress associated with the Sawa peoples of the coast, made for movement and generous with fabric.',
        'Ndop — indigo resist-dyed cloth from the Grassfields, with bold patterns that have long been tied to status and ceremony.',
      ] },
      { type: 'p', text: 'Each of these carries its own history, techniques and meanings, and each deserves to be understood before it is reinterpreted.' },
      { type: 'h2', text: 'Contemporary, not costume' },
      { type: 'p', text: 'The most interesting contemporary African fashion does not simply print a pattern onto a Western silhouette. It takes the logic of a tradition — its proportions, its embroidery, its way of moving — and lets that shape something new. A toghu-inspired motif might become the focus of a structured bodice; the ease of a kaba might inform the drape of an evening gown.' },
      { type: 'quote', text: 'Heritage is not a theme. It is a language — and fluency matters.' },
      { type: 'h2', text: 'Wearing tradition with intention' },
      { type: 'p', text: 'For many people, a traditional or traditionally inspired piece is reserved for the moments that matter most — weddings, cultural celebrations, homecomings. That makes it even more important that it fits well and feels personal. A garment that honours where you come from should also reflect who you are now.' },
      { type: 'p', text: 'The future of Cameroonian couture lies in that balance: deep respect for the cloth and craft that came before, and the confidence to carry them somewhere new.' },
    ],
  },
  {
    slug: 'the-modern-cocktail-dress',
    title: 'The Modern Cocktail Dress: Expressing Your Own Style',
    excerpt: 'The cocktail dress was invented for in-between hours. Today it is one of the most personal pieces in a wardrobe — if you choose it well.',
    publishedAt: PUBLISHED,
    topic: 'Style',
    image: 'image-bffaef3c90af019078755055f649ad3b2c8ba9a4-1024x1280-jpg',
    imageAlt: 'Woman in a red strapless cocktail dress with an embellished neckline, seated on a white studio floor',
    body: [
      { type: 'p', text: 'The cocktail dress was created for the hours between day and night: dressier than daywear, less formal than a full evening gown. That in-between quality is exactly what makes it so expressive. There are fewer rules — which means the choices say more about you.' },
      { type: 'h2', text: 'Start with the silhouette' },
      { type: 'p', text: 'Silhouette sets the mood before colour or detail. A structured, fitted bodice reads confident and sculptural; a fuller skirt feels playful; a column shape feels sleek and modern. Think about how you want to move through the evening as much as how you want to look standing still.' },
      { type: 'h2', text: 'Let one detail lead' },
      { type: 'p', text: 'The strongest cocktail dresses usually have one clear focal point — a neckline, a sleeve, an embellished edge, a dramatic colour. When everything competes, nothing stands out. Choose the detail that feels most like you and let the rest support it.' },
      { type: 'h2', text: 'Colour as a statement' },
      { type: 'p', text: 'Black is timeless for good reason, but colour is where a cocktail dress can become unforgettable. Deep reds, rich purples and jewel tones photograph beautifully and carry real presence in a room.' },
      { type: 'h2', text: 'Fit makes the difference' },
      { type: 'p', text: 'A cocktail dress sits close to the body and is seen from every angle, so fit is what separates a good dress from a great one. A bespoke or made-to-measure piece removes the compromise of standard sizing entirely.' },
      { type: 'list', items: [
        'Can you sit, reach and dance comfortably?',
        'Does the neckline stay in place without constant adjusting?',
        'Does the hem fall where you want it with the shoes you will wear?',
      ] },
      { type: 'quote', text: 'The right dress does not wear you. It gives you the room.' },
    ],
  },
  {
    slug: 'caring-for-your-garments',
    title: 'Caring for Your Garments: Making Considered Fashion Last',
    excerpt: 'The most sustainable garment is the one you keep. Simple habits that protect structured, embellished and delicate pieces for years.',
    publishedAt: PUBLISHED,
    topic: 'Care',
    image: 'image-57ba95dc162fe8eb8e144b9554f42337f8388769-1080x1080-jpg',
    imageAlt: 'Man in a textured black jacket, photographed in profile',
    body: [
      { type: 'p', text: 'Sustainability in fashion is often discussed in terms of materials and production. Those matter. But one of the most effective things anyone can do is simpler: keep what you own, and look after it well enough that you want to keep wearing it.' },
      { type: 'h2', text: 'Read the label — and ask' },
      { type: 'p', text: 'Care labels exist for a reason, but bespoke and handmade pieces may combine several fabrics and techniques. When you receive a special garment, ask how it should be cleaned and stored. If in doubt, a professional cleaner experienced with delicate fabrics is the safest choice.' },
      { type: 'h2', text: 'Storing structured pieces' },
      { type: 'list', items: [
        'Store corsets and structured bodices flat or on a padded hanger so the boning keeps its shape.',
        'Avoid folding along boning channels, which can create permanent creases.',
        'Give heavy gowns a hanger with straps or support at the waist so the shoulders do not stretch.',
      ] },
      { type: 'h2', text: 'Protecting embellishment and delicate fabrics' },
      { type: 'list', items: [
        'Keep beaded and embroidered pieces away from rough surfaces and jewellery that can snag.',
        'Use breathable cotton garment bags rather than plastic, which can trap moisture.',
        'Keep garments out of direct sunlight, which fades colour over time.',
      ] },
      { type: 'h2', text: 'In humid climates' },
      { type: 'p', text: 'Heat and humidity can encourage mould and mildew. Let garments air fully before putting them away, avoid storing anything damp, and choose a well-ventilated wardrobe where you can.' },
      { type: 'h2', text: 'Repair before replace' },
      { type: 'p', text: 'A loose bead, a dropped hem or a stuck zip is not the end of a garment. Small repairs made early prevent bigger damage later — and a piece that has been cared for tells its own story.' },
      { type: 'quote', text: 'Considered fashion is not only how a piece is made. It is how long it is loved.' },
    ],
  },
  {
    slug: 'learning-the-craft-fashion-design',
    title: 'Learning the Craft: An Introduction to Fashion Design',
    excerpt: 'What does it actually take to make clothes? A look at the core skills behind every garment — and how to start learning them.',
    publishedAt: PUBLISHED,
    topic: 'Fashion School',
    image: 'image-6a80879942fadc61568f1903d1f00badcd2b7d0e-1024x1280-jpg',
    imageAlt: 'Woman in a red draped dress with a dark fur wrap against a deep green backdrop',
    body: [
      { type: 'p', text: 'Fashion design looks like drawing beautiful pictures. In practice, it is a combination of very concrete skills — measuring, cutting, constructing — guided by an eye for proportion and a sense of who the clothes are for. The good news is that every one of those skills can be learned.' },
      { type: 'h2', text: 'The foundations' },
      { type: 'list', items: [
        'Design foundations — understanding silhouette, proportion, colour and how to develop an idea into a garment.',
        'Pattern making and cutting — translating a design into flat pieces that become a three-dimensional shape on the body.',
        'Sewing and construction — from basic hand stitches to the techniques used in structured and couture garments.',
        'Fabrics and materials — how different textiles drape, stretch, crease and wear.',
        'Styling — how a garment is presented, worn and photographed.',
        'The business of fashion — pricing, clients and building a label.',
      ] },
      { type: 'h2', text: 'Why construction comes first' },
      { type: 'p', text: 'Many aspiring designers want to skip straight to designing. But understanding how a garment is built changes how you design: you start to see seams, darts and grain lines inside every sketch, and your ideas become things that can actually be made.' },
      { type: 'h2', text: 'Learning by making' },
      { type: 'p', text: 'There is no substitute for practice. Simple projects — a skirt, a fitted top — teach the fundamentals that every complex piece depends on. Mistakes are part of the curriculum: a seam unpicked and resewn teaches more than a page of instructions.' },
      { type: 'h2', text: 'Studying with Moirai' },
      { type: 'p', text: 'The Moirai Fashion School covers design foundations, pattern making and cutting, sewing techniques, fabrics and materials, styling and the business of fashion. For details on the next intake, schedule and fees, send us a message and we will share them.' },
      { type: 'quote', text: 'Everyone who makes clothes beautifully started by making them badly. Begin anyway.' },
    ],
  },
]

export function getArticle(slug: string) {
  return ARTICLES.find(a => a.slug === slug) ?? null
}
