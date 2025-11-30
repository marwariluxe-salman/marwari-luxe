'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { beautyTools } from '@/data/tools';

const BeautyCategoryClient = () => {
  const beautyImages = [
    {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop",
      alt: "Skincare products and routine",
      title: "Skincare & Anti-Aging"
    },
    {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=300&fit=crop",
      alt: "Professional makeup and cosmetics",
      title: "Makeup & Cosmetics"
    },
    {
      src: "https://images.unsplash.com/photo-1560869713-7d0b29837158?w=500&h=300&fit=crop",
      alt: "Hair care and styling",
      title: "Hair Care & Styling"
    },
    {
      src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=300&fit=crop",
      alt: "Nail care and manicure",
      title: "Nail Care & Art"
    },
    {
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=300&fit=crop",
      alt: "Natural beauty and organic products",
      title: "Natural & Organic Beauty"
    }
  ];

  // Custom blogs for Beauty & Cosmetics category
  const customBeautyBlogs = [
    {
      id: 'custom-beauty-001',
      title: 'Waterless Skincare & Minimalist Beauty ',
      excerpt: "Discover the future of beauty with waterless skincare and minimalist routines. Learn how concentrated, eco-friendly products simplify your regimen, nourish your skin, and support sustainability. Try 7 must-have products in 2026 for radiant, healthy skin with minimal effort and maximum impact.",
      content: `<h1>Why Waterless Skincare Is the Future: 7 Must-Try Products for 2026</h1>
      
<p><p>Waterless skincare is revolutionizing beauty routines worldwide. With environmental concerns rising, brands are creating concentrated formulas without water, reducing waste and packaging. Minimalist beauty is also gaining momentum, emphasizing fewer, multifunctional products. Understanding this trend helps you choose sustainable options that enhance skin health while simplifying your daily routine.</p>

<p>These products are nutrient-dense, delivering potent ingredients directly to your skin. From balms to oils, waterless formulas prevent dilution and preserve efficacy. They are perfect for eco-conscious consumers who care about results and sustainability. By switching to waterless skincare, you can enjoy healthier skin while contributing to environmental conservation.</p>

<p>Minimalist beauty encourages using multi-purpose products to cut down clutter. A single cream or oil can replace multiple items in your routine. This approach saves time, money, and reduces decision fatigue. By combining minimalist beauty with waterless skincare, you get a practical, efficient routine tailored for modern lifestyles.</p>

<p>Many waterless products have longer shelf life since water is a primary source of bacterial growth. They often come in solid or oil-based formats, reducing preservatives and chemicals. This makes them ideal for sensitive skin types. Adopting these products ensures your skin receives concentrated care without unnecessary additives.</p>

<p>Eco-friendly packaging complements waterless formulations. Brands now use recyclable jars, glass bottles, and refillable containers. Minimalist design enhances aesthetic appeal and reduces environmental footprint. Choosing such products aligns with ethical consumption while keeping your beauty routine simple, functional, and effective.</p>

<p>Travel-friendly waterless products are another advantage. Solid cleansers, oils, and serums are compact and leak-proof, making them ideal for busy lifestyles. You can maintain a consistent skincare routine even while traveling. These products combine convenience, sustainability, and efficacy—perfect for the modern beauty enthusiast.</p>

<p>Transitioning to waterless skincare may require some experimentation. Test different textures and ingredients to find what suits your skin type. Multi-purpose products like cleansing balms or facial oils simplify routine without compromising results. Gradually, you’ll notice improved skin hydration, radiance, and overall texture.</p>

<p>Ultimately, waterless skincare and minimalist beauty reflect the future of conscious beauty. They provide effective solutions while prioritizing sustainability and simplicity. By embracing this trend, you can simplify your routine, reduce environmental impact, and enjoy healthier, glowing skin naturally and efficiently.</p>

<h2>1. Understanding Waterless Skincare</h2>
<p>Waterless skincare eliminates water from formulas, concentrating active ingredients. This improves efficacy and shelf life while minimizing preservatives. Products include solid cleansers, oils, and serums. Knowing how these work helps you select the best items for your skin type, ensuring hydration, nourishment, and visible results with minimal effort.</p>

<h2>2. Benefits of Minimalist Beauty</h2>
<p>Minimalist beauty focuses on multifunctional products that simplify routines. Using fewer items reduces clutter and decision fatigue. It also encourages choosing high-quality formulations over quantity. Combining minimalist principles with waterless skincare maximizes efficiency, delivering both eco-conscious and skin-nourishing results.</p>

<h2>3. Must-Try Waterless Cleansers</h2>
<p>Solid cleansing balms and powders are perfect examples of waterless products. They remove impurities without over-drying the skin. Many contain natural oils and botanical extracts, leaving skin soft and balanced. Their compact design makes them convenient for travel while providing eco-friendly alternatives to liquid cleansers.</p>

<h2>4. Concentrated Oils and Serums</h2>
<p>Waterless oils and serums deliver potent ingredients directly to the skin. Facial oils rich in vitamins and antioxidants help hydrate and repair skin. These concentrated formulas ensure maximum absorption and efficacy, reducing the need for multiple products while supporting healthy, radiant skin.</p>

<h2>5. Eco-Friendly Packaging and Sustainability</h2>
<p>Waterless skincare often comes in recyclable or refillable packaging. This reduces environmental impact and encourages conscious consumption. Choosing brands that prioritize sustainability ensures your beauty routine contributes positively to the planet while maintaining high-quality skincare benefits.</p>

<h2>6. How to Transition to Waterless Skincare</h2>
<p>Start gradually by replacing one or two products with waterless alternatives. Experiment with different textures like solid cleansers, oils, or balms. Observe how your skin reacts and adjust accordingly. Gradual transition helps maintain skin balance while embracing minimalist and sustainable beauty practices.</p>


</p>

<h2>Understanding Your Skin Type</h2>
<p>Before diving into any skincare routine, it's crucial to identify your skin type. Whether you have oily, dry, combination, or sensitive skin, each type requires a tailored approach. Oily skin benefits from lightweight, non-comedogenic products, while dry skin needs rich, hydrating formulas. Combination skin requires a balance of both, and sensitive skin needs gentle, fragrance-free options.</p>

<h2>The Essential 5-Step Routine</h2>
<p>Every effective skincare routine follows five fundamental steps: cleanse, tone, treat, moisturize, and protect. Start with a gentle cleanser to remove dirt and impurities without stripping natural oils. Follow with a toner to balance pH levels and prep the skin for treatment products. Apply serums or treatments targeting specific concerns like aging or hyperpigmentation. Lock in moisture with a suitable moisturizer, and always finish with broad-spectrum SPF during the day.</p>

<h2>Choosing the Right Products</h2>
<p>Ingredient selection is more important than brand loyalty. Look for proven actives like hyaluronic acid for hydration, vitamin C for brightening, retinoids for anti-aging, and niacinamide for overall skin health. Patch test new products and introduce them gradually to avoid irritation. Remember that consistency trumps intensity – gentle, regular care produces better long-term results than harsh treatments.</p>

<h2>Advanced Techniques for Enhanced Results</h2>
<p>Once you've mastered the basics, consider incorporating advanced techniques like facial massage, gua sha, or LED light therapy. These methods can boost circulation, promote lymphatic drainage, and enhance product absorption. Additionally, professional treatments like chemical peels or microdermabrasion can accelerate results when performed by qualified specialists.</p>

<h2>Maintaining Your Glow Long-Term</h2>
<p>Sustainable skincare is about more than just products. Adequate sleep, proper hydration, a balanced diet, and stress management all contribute to healthy skin. Avoid over-exfoliating or using too many active ingredients simultaneously, as this can compromise the skin barrier. Listen to your skin and adjust your routine seasonally or as needed.</p>

<h2>Common Mistakes to Avoid</h2>
<p>Many people sabotage their skincare efforts with common mistakes. Over-cleansing can strip the skin's natural barrier, leading to increased oil production and sensitivity. Skipping sunscreen, even on cloudy days, accelerates aging and increases skin cancer risk. Using too many products at once makes it difficult to identify what's working and can cause irritation. Finally, expecting immediate results leads to frustration – healthy skin is a long-term investment.</p>

<h2>Final Thoughts</h2>
<p>Waterless skincare and minimalist beauty represent the future of conscious, effective routines. By choosing concentrated, multifunctional products in eco-friendly packaging, you simplify your routine, support sustainability, and enjoy healthier, radiant skin. Embrace this trend in 2026 to experience long-lasting results and a more mindful beauty lifestyle.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762857789/blogb-1_utllwn.png',
    },
    {
      id: 'custom-beauty-002',
      title: 'Monochrome Makeup Looks',
      excerpt: "Discover the simplicity of monochrome makeup—one color, endless possibilities. Learn how to choose the right shade for your skin tone, master daily looks, and find top 2026 product picks that simplify your beauty routine while keeping it modern, radiant, and naturally effortless.",
      content: `<h1>Master the Monochrome Makeup Trend: Easy Daily Looks for Every Skin Tone</h1>
    
<p><p>Monochrome makeup is one of the most flattering and effortless beauty trends of 2026. It focuses on using a single color palette across eyes, lips, and cheeks. This technique creates a balanced, polished, and cohesive look that enhances your natural features without overwhelming your face with too many contrasting tones.</p>

<p>The appeal of monochrome makeup lies in its simplicity. Whether you love soft peach, warm bronze, or rosy pink, you can create a complete look using just one shade family. It’s perfect for busy mornings, minimal makeup lovers, or anyone looking for a fresh, modern way to enhance their style.</p>

<p>What makes this trend so versatile is its adaptability. From subtle daytime neutrals to bold evening glam, monochrome makeup suits every mood, skin tone, and occasion. It’s also beginner-friendly—no complicated blending or advanced skills required, just a bit of creativity and the right shades for your complexion.</p>

<p>Monochrome makeup also complements minimalist beauty routines. You don’t need a dozen products; just one well-chosen blush, eyeshadow, or lip tint can do the trick. It’s a sustainable and time-saving trend, ideal for people who prefer clean, efficient, and eco-conscious beauty habits that still look stylish and put-together.</p>

<p>This approach not only saves time but also helps achieve a harmonious, balanced appearance. Using similar tones throughout your face ensures a seamless transition between features, enhancing your natural glow. It also works beautifully for photography, giving your complexion an even, radiant finish that feels professional yet effortless.</p>

<p>Monochrome doesn’t mean boring—it’s all about personalization. You can go for soft pinks for a romantic vibe, coral for a sun-kissed glow, or mauve for an elegant, cool-toned look. The key is choosing shades that complement your undertone and make your skin look naturally illuminated.</p>

<p>To master this look, it’s essential to experiment with texture. Mixing matte, shimmer, or satin finishes can add dimension without using multiple colors. A glossy lid with a creamy blush and satin lipstick in the same shade family can elevate your makeup instantly while maintaining the monochrome concept.</p>

<p>Monochrome makeup celebrates simplicity, individuality, and balance. Whether you prefer earthy tones, rosy hues, or bronzed shades, this trend allows endless creativity while keeping your look cohesive and chic. Let’s explore how to master monochrome makeup for every skin tone and create effortless daily looks that never fail.</p>

<h2>1. What Is Monochrome Makeup?</h2>
<p>Monochrome makeup means using the same color palette across your face—eyes, cheeks, and lips. Instead of contrasting shades, it focuses on harmony. The result is a unified, natural look that enhances your features. It’s modern, quick to apply, and works beautifully for both everyday wear and special occasions.</p>

<h2>2. Choosing the Right Color for Your Skin Tone</h2>
<p>Skin tone matters when picking your base color. Peach and coral flatter warm tones, while rose and mauve complement cool tones. Bronze and beige suit neutral undertones. Experiment with shades that bring warmth or depth to your complexion for a flattering, natural finish that glows in any light.</p>

<h2>3. Step-by-Step: Creating a Monochrome Look</h2>
<p>Start with clean, hydrated skin. Apply a lightweight foundation and use your chosen shade as eyeshadow, blush, and lip color. Blend softly for a seamless finish. You can use the same cream or tint across all areas for uniformity. Add mascara and highlighter to complete your effortless, glowing look.</p>

<h2>4. Day to Night Monochrome Makeup</h2>
<p>For daytime, stick to soft, dewy finishes in muted tones. For nighttime, add a shimmery layer to your lids and glossy lips. The monochrome concept stays intact, but the textures create depth. Switching finishes helps you transform your look easily without changing the color palette.</p>

<h2>5. Best Monochrome Shades by Skin Tone</h2>
<p>Fair skin tones glow with peach, pink, and champagne shades. Medium tones shine with coral, rose, or bronze. Deep tones look stunning in berry, terracotta, and plum hues. The goal is to pick a tone that enhances your natural undertone while adding radiance and balance to your overall look.</p>

<h2>6. Product Recommendations for 2026</h2>
<p>Top brands now offer all-in-one monochrome palettes. Look for creamy blush sticks, multipurpose lip-and-cheek tints, or eyeshadow creams. Popular 2026 launches include hydrating formulas with skin-loving ingredients like hyaluronic acid and squalane. Choose long-wear, buildable textures that deliver color and hydration while keeping your skin looking fresh and healthy.</p>


</p>


<h2>Final Thoughts</h2>
<p>Monochrome makeup is more than a trend—it’s timeless. It simplifies beauty routines, promotes sustainability, and enhances natural features effortlessly. By learning to work with tones and textures, anyone can master this look. Embrace the monochrome movement in 2026 for fresh, radiant, and easy-to-create daily beauty that fits every lifestyle.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762858256/blogb-2_qnyvv6.png',
    },
    {
      id: 'custom-beauty-003',
      title: 'Sustainable & Eco-Friendly Beauty',
      excerpt: "Discover the top 10 sustainable beauty brands of 2025 revolutionizing skincare and makeup. Learn how to make eco-conscious swaps, choose ethical products, and embrace a cleaner, greener beauty routine that supports your skin and the planet effortlessly.",
      content: `<h1>Eco-Friendly Beauty 2026: Top 10 Sustainable Skincare & Makeup Brands to Try</h1>
    
<p><p>The beauty industry is evolving, and 2025 marks a major shift toward sustainability. Consumers today want clean, ethical, and eco-friendly products that care for both their skin and the planet. From zero-waste packaging to biodegradable ingredients, sustainable beauty is no longer a niche—it's becoming the new global standard.</p>

<p>Eco-friendly beauty means more than just natural ingredients. It’s about reducing plastic waste, sourcing responsibly, and ensuring cruelty-free testing. Many innovative brands are leading the way, using refillable containers, carbon-neutral shipping, and plant-based formulas that deliver powerful results without harming the environment. Conscious beauty is now a lifestyle choice.</p>

<p>People are paying attention to ingredient sourcing, transparency, and brand ethics. This movement is reshaping how products are made and marketed. With growing awareness, consumers are actively supporting brands that prioritize both performance and planet. It’s not just about looking good anymore—it’s about doing good through daily choices.</p>

<p>Another key factor driving sustainable beauty’s growth is climate change. More consumers are choosing local, waterless, or low-impact formulas to reduce their carbon footprint. Brands are responding by using compostable packaging, renewable energy production, and recyclable containers—ensuring every step from creation to disposal is environmentally responsible.</p>

<p>Waterless skincare is becoming especially popular. These concentrated formulas last longer, use less packaging, and require fewer preservatives. They also minimize transportation emissions. Combined with refillable and plastic-free packaging, these innovations are redefining what clean beauty truly means in 2025 and beyond.</p>

<p>Vegan and cruelty-free beauty continues to dominate, with brands eliminating animal-derived ingredients and avoiding harmful chemicals like parabens and sulfates. This ensures that products are safe for sensitive skin and free from unethical practices. As a result, eco-beauty is becoming mainstream across the USA, UK, Canada, Australia, and Europe.</p>

<p>Social media has amplified this movement. Influencers now highlight eco-conscious routines, inspiring millions to make small, sustainable swaps. Reusable cleansing pads, solid shampoos, and bamboo brushes are replacing wasteful alternatives. These accessible changes help individuals make a big collective impact through mindful beauty choices every day.</p>

<p>In 2025, sustainable beauty isn’t a passing trend—it’s a global standard. Whether you’re switching to refillable skincare or exploring carbon-neutral makeup brands, your choices matter. Let’s look at 10 top sustainable brands leading this eco-friendly revolution and transforming how we define beauty, responsibility, and self-care this year.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762858455/blogb-3_hf2jzy.png',
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Beauty & Cosmetics
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Unleash your natural beauty with our premium cosmetics, expert beauty advice, 
              and personalized tools.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Beauty Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of beauty products and tools for every need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {beautyImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-center">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Beauty Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked premium products for your beauty routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop"
                  alt="Premium Skincare Set"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Skincare
                  </span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Skincare Set</h3>
                <p className="text-gray-600 mb-4">
                  Complete anti-aging routine with natural ingredients for radiant skin.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$89.99</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Product 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop"
                  alt="Professional Makeup Kit"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Makeup
                  </span>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Makeup Kit</h3>
                <p className="text-gray-600 mb-4">
                  All-in-one kit with premium pigments for flawless coverage.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$129.99</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Product 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1560869713-7d0b29837158?w=600&h=400&fit=crop"
                  alt="Luxury Hair Care Collection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Hair Care
                  </span>
                  <span className="text-yellow-500">★★★★☆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Luxury Hair Care Collection</h3>
                <p className="text-gray-600 mb-4">
                  Nourishing formulas with natural extracts for healthy, shiny hair.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">$79.99</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beauty Tools */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beauty Tools & Analyzers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personalized tools to enhance your beauty routine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beautyTools.slice(0, 4).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-block bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors"
                >
                  Use Tool
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tools/beauty"
              className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            >
              View All Beauty Tools
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Beauty Advice */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Beauty Advice</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest beauty trends and expert tips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customBeautyBlogs.slice(0, 3).map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center"
                  >
                    Read More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Beauty Routine
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Discover premium products and expert advice to enhance your natural beauty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Beauty Products
              </Link>
              <Link
                href="/tools/beauty"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Try Beauty Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BeautyCategoryClient;