'use client';

import Image from 'next/image';

const IntroSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 transition-opacity duration-700 opacity-100">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Welcome to <span className="text-purple-600">Marwari Luxe</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
             At Marwari Luxe, we combine ancient wellness traditions with modern science. We offer premium health supplements, natural beauty products, and smart wellness tools to help you feel and look your best. Our products include high-quality vitamins, organic skincare, anti-aging serums, and health calculators that support your wellness journey.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We blend Ayurvedic wisdom with modern science to connect tradition and innovation. Every product is carefully tested for purity, safety, and effectiveness. Whether you need supplements, skincare, or wellness tools, our collection offers authentic, high-quality products you can trust.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 transition-opacity duration-700">
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <div className="text-gray-600">Premium Health & Beauty Products</div>
              </div>
              <div className="text-center p-4 transition-opacity duration-700">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600">Satisfied Global Customers</div>
              </div>
              <div className="text-center p-4 transition-opacity duration-700">
                <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                <div className="text-gray-600">Health & Fitness Tools</div>
              </div>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative transition-opacity duration-700 opacity-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1761864928/marwari2_hs4y31.jpg"
                  alt="Wellness Products"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-purple-600/20 rounded-lg"></div>
              </div>
              <div className="relative h-48 mt-8 hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1762858786/blogb-3_bq9zlh.png"
                  alt="Beauty Products"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-pink-600/20 rounded-lg"></div>
              </div>
              <div className="relative h-48 -mt-8 hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1762860104/blogb-5_pmytov.png"
                  alt="Traditional Heritage"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                  // Add dimensions to prevent CLS
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-orange-600/20 rounded-lg"></div>
              </div>
              <div className="relative h-48 hover:scale-105 transition-transform duration-300">
                <Image
                  src="https://res.cloudinary.com/dxg5ldzkv/image/upload/f_auto,q_auto,w_800,dpr_auto,c_fill,g_auto/v1762805385/blog-1_uwxwim.png"
                  alt="Modern Innovation"
                  fill
                  className="rounded-lg shadow-lg object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={75}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                  // Add dimensions to prevent CLS
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-2xl">✨</span>
            </div>

            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xl">🌿</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;