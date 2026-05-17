require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const User = require('./src/models/User');
const Blog = require('./src/models/Blog');
const Deal = require('./src/models/Deal');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rustik-plank';

// Furniture image URLs from Unsplash (free to use)
const CHAIR_IMGS = [
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400',
];
const BED_IMGS = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400',
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
];
const TABLE_IMGS = [
  'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
];
const CABINET_IMGS = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400',
];
const BOOKCASE_IMGS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?w=400',
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400',
];
const BOX_IMGS = [
  'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
];

const BLOG_IMGS = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600',
  'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600',
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    Product.deleteMany({}), Category.deleteMany({}),
    Blog.deleteMany({}), Deal.deleteMany({})
  ]);
  console.log('Cleared existing data');

  // Create admin user
  let admin = await User.findOne({ email: 'admin@rustikplank.com' });
  if (!admin) {
    admin = await User.create({
      name: 'Admin', email: 'admin@rustikplank.com',
      password: 'admin123', role: 'admin'
    });
    console.log('Admin created: admin@rustikplank.com / admin123');
  }

  // Create categories
  const categoryData = [
    { name: 'Chairs', slug: 'chairs', description: 'Handcrafted wooden chairs for every room', sortOrder: 1 },
    { name: 'Beds', slug: 'beds', description: 'Solid wood beds for a peaceful sleep', sortOrder: 2 },
    { name: 'Tables', slug: 'tables', description: 'Dining and coffee tables in reclaimed wood', sortOrder: 3 },
    { name: 'Cabinets', slug: 'cabinets', description: 'Storage cabinets and wardrobes', sortOrder: 4 },
    { name: 'Bookcases', slug: 'bookcases', description: 'Solid wood bookcases and shelving', sortOrder: 5 },
    { name: 'Boxes', slug: 'boxes', description: 'Decorative and storage boxes', sortOrder: 6 },
  ];
  const categories = await Category.insertMany(categoryData);
  const catMap = Object.fromEntries(categories.map(c => [c.slug, c._id]));
  console.log('Categories created');

  const desc = `Crafted from sustainably sourced solid wood, this piece exemplifies the rustic charm and durability that Rustik Plank is known for. Each item is hand-finished to bring out the natural grain and character of the wood. Built to last generations, with mortise and tenon joinery and traditional craftsmanship techniques.`;

  // Build products
  const productData = [];

  const mkProducts = (catSlug, imgs, names, featured, special, popular, hotDeal, basePrice) => {
    names.forEach((name, i) => {
      const p = imgs[i % imgs.length];
      const compare = Math.round(basePrice * 1.3 * 100) / 100;
      productData.push({
        name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: desc,
        shortDescription: name + ' - handcrafted solid wood furniture',
        price: basePrice + i * 5,
        comparePrice: compare + i * 5,
        category: catMap[catSlug],
        mainImage: p,
        images: [{ url: p, alt: name }],
        stock: 10 + i * 3, sku: `RP-${catSlug.toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
        material: 'Solid Oak', tags: ['handcrafted', 'rustic', 'wooden', catSlug],
        featured: featured.includes(i), special: special.includes(i),
        popular: popular.includes(i), hotDeal: hotDeal.includes(i),
        rating: 3.5 + Math.random() * 1.5, numReviews: Math.floor(Math.random() * 30 + 1)
      });
    });
  };

  mkProducts('chairs',
    CHAIR_IMGS,
    ['Windsor Oak Dining Chair', 'Rustic Farmhouse Chair', 'Country Oak Arm Chair', 'Ladder Back Chair',
      'Spindle Back Chair', 'Cross Back Oak Chair', 'Slat Back Chair', 'Windsor Carver Chair'],
    [0, 1, 2, 3], [1, 2, 4, 5], [0, 3, 6, 7], [2, 5],
    89.99
  );
  mkProducts('beds',
    BED_IMGS,
    ['Solid Oak King Bed', 'Rustic Plank Double Bed', 'Reclaimed Wood Bed Frame', 'Country Pine Single Bed',
      'Oak Super King Bed', 'Shaker Style Bed', 'Sleigh Oak Bed', 'Low Platform Oak Bed'],
    [0, 1, 2, 3], [0, 2, 4, 6], [1, 3, 5, 7], [0, 3],
    349.99
  );
  mkProducts('tables',
    TABLE_IMGS,
    ['Farmhouse Dining Table', 'Rustic Coffee Table', 'Extending Oak Table', 'Solid Oak Console Table',
      'Round Dining Table', 'Trestle Table', 'Side Table Set', 'Sofa Table'],
    [0, 1, 2, 3], [0, 1, 4, 5], [2, 3, 6, 7], [1, 4],
    199.99
  );
  mkProducts('cabinets',
    CABINET_IMGS,
    ['Solid Oak Wardrobe', 'Rustic TV Cabinet', 'Oak Sideboard', 'Bookshelf Cabinet',
      'Corner Cabinet', 'Shoe Cabinet', 'Display Cabinet', 'Filing Cabinet'],
    [0, 1], [2, 3], [4, 5], [6, 7],
    249.99
  );
  mkProducts('bookcases',
    BOOKCASE_IMGS,
    ['Tall Oak Bookcase', 'Wide Bookshelf', 'Ladder Bookcase', 'Cube Bookcase',
      'Low Bookshelf', 'Corner Bookcase', 'Floating Shelves Set', 'Industrial Bookcase'],
    [0, 1], [2, 3], [4, 5], [6, 7],
    149.99
  );
  mkProducts('boxes',
    BOX_IMGS,
    ['Oak Storage Box', 'Rustic Trinket Box', 'Blanket Box', 'Keepsake Box'],
    [0], [1], [2], [3],
    49.99
  );

  const products = await Product.insertMany(productData);
  console.log(`${products.length} products created`);

  // Blog posts
  await Blog.insertMany([
    {
      title: 'The Art of Reclaimed Wood Furniture',
      slug: 'art-of-reclaimed-wood-furniture',
      excerpt: 'Discover the beauty and sustainability of reclaimed wood and how we craft each piece with care and tradition.',
      content: `<p>At Rustik Plank, we believe that every piece of wood tells a story. Our craftsmen source timber from old barns, mills, and historic buildings, giving new life to wood that has already weathered decades of history.</p><h2>Why Reclaimed Wood?</h2><p>Reclaimed wood is not only environmentally responsible — it's often stronger and more beautiful than new timber. The natural aging process creates unique grain patterns, rich colours, and character marks that simply cannot be replicated.</p><p>Each plank carries the marks of its history: nail holes, saw marks, and the patina of age. These "imperfections" are what make each piece truly one-of-a-kind.</p><h2>Our Process</h2><p>Every piece of reclaimed timber is carefully inspected, cleaned, and de-nailed before it ever reaches our workshop. Our craftsmen then select the finest sections to build our furniture, ensuring structural integrity alongside visual beauty.</p>`,
      image: BLOG_IMGS[0], published: true, authorName: 'Rustik Plank', tags: ['reclaimed wood', 'sustainability', 'craftsmanship']
    },
    {
      title: 'How to Care for Your Solid Wood Furniture',
      slug: 'care-for-solid-wood-furniture',
      excerpt: 'Keep your Rustik Plank furniture looking beautiful for generations with these simple care tips.',
      content: `<p>Solid wood furniture is an investment that, with proper care, will last for generations. Here's how to keep your Rustik Plank pieces looking their best.</p><h2>Daily Care</h2><p>Dust regularly with a soft, dry cloth. For deeper cleaning, use a slightly damp cloth and dry immediately. Avoid harsh chemical cleaners that can strip the natural oils from the wood.</p><h2>Protecting from the Elements</h2><p>Wood is a natural material that responds to its environment. Keep furniture away from direct sunlight, radiators, and air conditioning vents. Use coasters and placemats to prevent water rings and heat damage.</p><h2>Annual Maintenance</h2><p>Once a year, treat your furniture with a quality beeswax polish or Danish oil. This nourishes the wood and provides a protective barrier against moisture and everyday wear.</p>`,
      image: BLOG_IMGS[1], published: true, authorName: 'Rustik Plank', tags: ['care', 'maintenance', 'tips']
    },
    {
      title: 'Designing Your Perfect Rustic Living Room',
      slug: 'designing-rustic-living-room',
      excerpt: 'Interior design tips for creating a warm, inviting rustic living space with our furniture collection.',
      content: `<p>The rustic aesthetic is all about warmth, natural materials, and a sense of lived-in comfort. Here's how to create a space that feels both stylish and inviting.</p><h2>Start with Wood</h2><p>Solid wood furniture forms the backbone of any rustic interior. Our Windsor Oak chairs and farmhouse dining tables set the tone for the whole room. Mix different wood tones for an eclectic, authentic look.</p><h2>Layer Natural Textures</h2><p>Combine wood with stone, linen, wool, and jute to create a rich tapestry of natural textures. A chunky knit throw over our Windsor Carver Chair or a sisal rug beneath the farmhouse table adds warmth and depth.</p><h2>Embrace Imperfection</h2><p>The beauty of rustic design lies in its authenticity. Don't try to create a too-perfect space — let the knots, grain, and character of the wood shine through.</p>`,
      image: BLOG_IMGS[2], published: true, authorName: 'Rustik Plank', tags: ['interior design', 'rustic', 'living room']
    }
  ]);
  console.log('Blog posts created');

  // Deals
  await Deal.insertMany([
    {
      title: 'Reclaimed and Hand Crafted',
      subtitle: 'Summer Sale',
      description: 'Elite Collection — Design Furniture',
      discountPercent: 50,
      badge: '50% Sale OFF',
      image: TABLE_IMGS[0],
      type: 'hot', isActive: true
    },
    {
      title: 'Weekend Special',
      subtitle: '35% Off Selected Items',
      discountPercent: 35,
      badge: '35% Sale OFF',
      image: CHAIR_IMGS[0],
      type: 'promo', isActive: true
    }
  ]);
  console.log('Deals created');

  console.log('\nDatabase seeded successfully!');
  console.log('Admin login: admin@rustikplank.com / admin123');
  mongoose.connection.close();
}

seed().catch(err => { console.error(err); process.exit(1); });
