'use client';

import Link from 'next/link';
import Image from 'next/image';
import { healthTools } from '@/data/tools';

const HealthCategoryClient = () => {
  // Custom blogs for Health & Wellness category
  const customHealthBlogs = [
    {
      id: 'custom-health-001',
      title: 'Gut Health Problems – Bloating & Poor Digestion',
      excerpt: "Always Bloated After Meals? 7 Proven Ways to Fix Your Gut Naturally",
      content: `<h1>Always Bloated After Meals? 7 Proven Ways to Fix Your Gut Naturally</h1>
      
<p>If you feel bloated after every meal, you’re not alone. Millions struggle with poor digestion, stomach discomfort, and an unbalanced gut microbiome every single day. What most people don’t realize is that your gut health affects far more than just your stomach — it impacts your mood, energy, skin, and even your immune system.
</p>

<p>Here’s the thing: when your digestion slows down or your gut bacteria are out of balance, your body starts sending warning signs — like gas, fatigue, or feeling heavy after eating. It’s your body’s way of saying something’s off. The good news is, you don’t need fancy supplements or strict diets to fix it. You can heal your gut naturally with simple, science-backed habits that actually work.
</p>

<p>In this blog, we’ll break down exactly how to do that. You’ll learn how to fix gut health naturally, what foods reduce bloating, and how to improve digestion after eating. You’ll also understand what’s really causing your bloating in the first place — whether it’s stress, certain foods, or eating too fast.
</p>

<p>The best part? These small, daily changes can reset your digestive system in just a few weeks. We’ll talk about the best foods for bloating and digestion, how mindful eating improves gut function, and why your lifestyle choices matter more than any supplement. By focusing on natural ways to heal your gut, you’ll not only improve digestion but also boost your energy and immunity long-term.
</p>

<p>So if you’re tired of feeling sluggish or constantly bloated, stay with me. This guide will show you how to eat, move, and live in a way that supports a healthy gut every day. Once you start treating your gut like your body’s control center, everything — from your skin to your mood — begins to improve.
</p>

<p>Your journey to better digestion starts right here.</p>

<h2>What Causes Bloating and Digestive Discomfort?</h2>
<p>Bloating after meals is a common complaint that can stem from various factors including food intolerances, eating too quickly, or an imbalance of gut bacteria. Understanding the root cause is the first step toward relief.</p>

<h2>The Role of Probiotics in Gut Health</h2>
<p>Probiotics are beneficial bacteria that help restore balance to your digestive system. They can improve nutrient absorption, reduce inflammation, and support immune function.</p>

<h2>Foods That Promote Healthy Digestion</h2>
<p>Certain foods can naturally support gut health. Fermented foods like yogurt, kefir, and sauerkraut are rich in probiotics, while fiber-rich foods feed beneficial bacteria.</p>

<h2>Foods to Avoid for Better Digestion</h2>
<p>Some foods can worsen digestive issues. Processed foods, artificial sweeteners, and high-fat meals can disrupt gut bacteria and lead to inflammation.</p>

<h2>Lifestyle Changes for Improved Gut Health</h2>
<p>Beyond diet, factors like stress management, regular exercise, and adequate sleep all play a role in maintaining a healthy digestive system.</p>

<h2>Natural Remedies for Immediate Relief</h2>
<p>For immediate relief from bloating, natural remedies like ginger tea, peppermint oil, and gentle abdominal massage can provide comfort.</p>

<h2>When to Seek Professional Help</h2>
<p>Persistent digestive issues may indicate an underlying condition that requires medical attention. Don't hesitate to consult a healthcare provider if symptoms persist.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762805385/blog-1_uwxwim.png',
    },
    {
      id: 'custom-health-002',
      title: 'Heart Health Issues – High Blood Pressure & Cholesterol',
      excerpt: "10 Simple Daily Habits to Lower Blood Pressure Without Medication",
      content: `<h1>Understanding Heart Health: Blood Pressure and Cholesterol</h1>
<p>Heart disease remains the leading cause of death globally, but the good news is that many risk factors are within your control. Understanding blood pressure and cholesterol is the first step toward protecting your cardiovascular health.</p>

<h2>What is Blood Pressure and Why Does It Matter?</h2>
<p>Blood pressure measures the force of blood against your artery walls. High blood pressure (hypertension) forces your heart to work harder and increases the risk of heart attack, stroke, and kidney disease.</p>

<h2>Understanding Cholesterol Levels</h2>
<p>Cholesterol is a waxy substance found in your blood. While your body needs cholesterol to build healthy cells, high levels can lead to fatty deposits in your blood vessels, increasing heart disease risk.</p>

<h2>Natural Ways to Lower Blood Pressure</h2>
<p>Dietary changes can significantly impact blood pressure. Reducing sodium intake, increasing potassium-rich foods, and following the DASH diet are proven strategies for lowering blood pressure naturally.</p>

<h2>Foods That Improve Cholesterol Profiles</h2>
<p>Certain foods can help improve your cholesterol levels. Oats, nuts, fatty fish, and foods rich in soluble fiber can help reduce LDL (bad) cholesterol while maintaining HDL (good) cholesterol.</p>

<h2>The Role of Exercise in Heart Health</h2>
<p>Regular physical activity strengthens the heart muscle, lowers blood pressure, and improves cholesterol levels. Even moderate exercise like brisk walking can provide significant cardiovascular benefits.</p>

<h2>Stress Management for Heart Health</h2>
<p>Chronic stress can contribute to high blood pressure and unhealthy habits. Techniques like meditation, deep breathing, and regular relaxation can support heart health.</p>

<h2>When to Consider Medical Intervention</h2>
<p>While lifestyle changes are powerful, some people may need medication to manage blood pressure or cholesterol. Work with your healthcare provider to determine the best approach for your situation.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762812134/blog-2_lviexx.png',
    },
    {
      id: 'custom-health-003',
      title: 'Sleep Disorders – Insomnia & Restless Nights',
      excerpt: "Can’t Sleep at Night? Here’s How to Reset Your Body Clock Naturally",
      content: `<h1>Mastering Sleep: Understanding Insomnia and Sleep Disorders</h1>
<p>Sleep is essential for physical recovery, mental clarity, and emotional well-being. When sleep is disrupted, it affects every aspect of your life. Understanding the root causes of sleep disorders is key to finding effective solutions.</p>

<h2>Common Types of Sleep Disorders</h2>
<p>Insomnia, sleep apnea, restless leg syndrome, and narcolepsy are among the most common sleep disorders. Each has unique symptoms and requires different approaches for treatment and management.</p>

<h2>The Science of Sleep Cycles</h2>
<p>Your sleep is divided into cycles of REM and non-REM sleep. Disruptions to these cycles can result in non-restorative sleep, leaving you feeling tired even after a full night's rest.</p>

<h2>Creating the Perfect Sleep Environment</h2>
<p>Your bedroom environment plays a crucial role in sleep quality. Temperature, lighting, noise levels, and comfort all contribute to how well you sleep and how rested you feel in the morning.</p>

<h2>Diet and Sleep: What to Eat and Avoid</h2>
<p>Certain foods and beverages can promote or disrupt sleep. Understanding the relationship between nutrition and sleep can help you make better choices for better rest.</p>

<h2>Technology's Impact on Sleep Quality</h2>
<p>Blue light from screens can interfere with melatonin production, making it harder to fall asleep. Establishing a technology curfew before bedtime can significantly improve sleep quality.</p>

<h2>Relaxation Techniques for Better Sleep</h2>
<p>Mindfulness, progressive muscle relaxation, and breathing exercises can help calm your mind and prepare your body for sleep. These techniques are particularly helpful for those with racing thoughts at bedtime.</p>

<h2>When to Seek Professional Sleep Help</h2>
<p>If sleep problems persist despite lifestyle changes, it may be time to consult a sleep specialist. Sleep studies and professional evaluation can identify underlying conditions and guide treatment.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762814682/blog-3_xmvsmn.png',
    },
    {
      id: 'custom-health-004',
      title: 'Hormonal Imbalance – Fatigue, Mood Swings, and Weight Gain',
      excerpt: "Feeling Drained and Moody? 9 Natural Ways to Balance Your Hormones.",
      content: `<h1>Hormonal Balance: Understanding and Managing Imbalances</h1>
<p>Hormones are chemical messengers that regulate virtually every process in your body, from metabolism to mood. When hormones are out of balance, it can lead to a wide range of symptoms that impact quality of life.</p>

<h2>Common Signs of Hormonal Imbalance</h2>
<p>Fatigue, weight changes, mood swings, sleep disturbances, and changes in appetite are common indicators of hormonal imbalance. Recognizing these signs early can lead to more effective treatment.</p>

<h2>Key Hormones and Their Functions</h2>
<p>Thyroid hormones, insulin, cortisol, estrogen, progesterone, and testosterone all play vital roles in maintaining health. Understanding how each functions helps identify potential imbalances.</p>

<h2>Lifestyle Factors That Affect Hormones</h2>
<p>Diet, exercise, stress, sleep, and environmental factors all influence hormone production and balance. Making positive changes in these areas can naturally support hormonal health.</p>

<h2>Nutrition for Hormonal Health</h2>
<p>Certain nutrients are essential for hormone production. Healthy fats, adequate protein, and specific vitamins and minerals support optimal hormone function and balance.</p>

<h2>The Stress-Hormone Connection</h2>
<p>Chronic stress leads to elevated cortisol levels, which can disrupt the production and balance of other hormones. Managing stress is crucial for maintaining hormonal harmony.</p>

<h2>Natural Approaches to Hormone Balance</h2>
<p>Herbs, supplements, and lifestyle modifications can support hormone balance naturally. However, it's important to work with a healthcare provider when addressing hormonal issues.</p>

<h2>When to Seek Medical Evaluation</h2>
<p>Persistent symptoms may indicate underlying conditions like thyroid disorders, PCOS, or menopause. Blood tests and professional evaluation can identify specific imbalances and guide treatment.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762816421/blog-4_gjtcpo.png',
    },
    {
      id: 'custom-health-005',
      title: 'Mental Health Problems – Stress & Anxiety',
      excerpt: 'Struggling With Overthinking? 7 Daily Habits That Calm Your Mind Instantly',
      content: `<h1>Mental Wellness: Managing Stress and Anxiety Naturally</h1>
<p>In our fast-paced world, stress and anxiety have become common experiences. While some stress is normal, chronic stress can take a toll on mental and physical health. Learning to manage these feelings is essential for overall well-being.</p>

<h2>Understanding the Stress Response</h2>
<p>The body's stress response is designed to protect us in dangerous situations. However, when this response is constantly activated, it can lead to anxiety, fatigue, and various health problems.</p>

<h2>Recognizing Anxiety Symptoms</h2>
<p>Anxiety can manifest in many ways, including excessive worry, restlessness, difficulty concentrating, irritability, muscle tension, and sleep disturbances. Recognizing these symptoms is the first step toward management.</p>

<h2>Mindfulness and Meditation Techniques</h2>
<p>Mindfulness practices help anchor you in the present moment, reducing rumination and worry. Regular meditation practice can literally rewire the brain to respond more calmly to stress.</p>

<h2>Physical Activity for Mental Health</h2>
<p>Exercise is one of the most effective natural remedies for stress and anxiety. Physical activity releases endorphins, reduces stress hormones, and improves sleep quality.</p>

<h2>Nutrition and Mental Wellness</h2>
<p>Certain foods can either exacerbate or alleviate anxiety symptoms. A balanced diet rich in omega-3 fatty acids, complex carbohydrates, and magnesium can support mental health.</p>

<h2>Building a Support Network</h2>
<p>Strong social connections are vital for mental health. Having people to talk to, share experiences with, and lean on during difficult times provides emotional resilience.</p>

<h2>When Professional Help is Needed</h2>
<p>While self-care strategies are valuable, some situations require professional intervention. Therapists, counselors, and psychiatrists can provide additional tools and support for managing mental health.`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762817815/blog-5_e7i150.png'
    },
    {
      id: 'custom-health-006',
      title: 'Immunity Weakness – Frequent Colds & Fatigue',
      excerpt: "Feeling run-down and frequently getting sick? Discover 6 daily habits including nutrition, exercise, sleep, stress management, hydration, and lifestyle adjustments to naturally boost your immune system and improve overall health and vitality.",
      content: `<h1>Always Getting Sick? Boost Your Immune System Naturally With These Daily Habits</h1>
<p>Frequent colds, fatigue, and feeling run-down are signs of a weakened immune system. Modern lifestyle factors, stress, poor nutrition, and lack of sleep can compromise immunity. Strengthening your body's natural defenses is essential. Daily habits focused on nutrition, exercise, sleep, and stress management can significantly improve immune function and overall health.</p>

<h2>How the Immune System Works</h2>
<p>The immune system consists of white blood cells, antibodies, the complement system, the lymphatic system, and organs like the spleen and thymus. These components work together to identify and eliminate threats.</p>

<h2>Nutrition for Immune Support</h2>
<p>Certain vitamins and minerals are crucial for immune function. Vitamin C, vitamin D, zinc, and selenium play key roles in supporting immune responses and maintaining immune cell function.</p>

<h2>The Gut-Immune Connection</h2>
<p>Approximately 70% of immune cells reside in the gut. Maintaining a healthy gut microbiome through probiotics, prebiotics, and fiber-rich foods is essential for optimal immune function.</p>

<h2>Sleep and Immune Function</h2>
<p>Quality sleep is when your body repairs and regenerates. During sleep, immune cells are produced and distributed throughout the body, making adequate rest crucial for immune health.</p>

<h2>Exercise and Immunity</h2>
<p>Regular moderate exercise can boost immune function by promoting good circulation, which allows immune cells to move freely throughout the body and do their job efficiently.</p>

<h2>Stress Management for Better Immunity</h2>
<p>Chronic stress suppresses immune function by elevating cortisol levels. Managing stress through relaxation techniques, hobbies, and social support helps maintain immune balance.</p>

<h2>When to Consider Immune Support Supplements</h2>
<p>While a balanced diet should provide most nutrients, certain supplements may be beneficial during times of increased need. Consult with a healthcare provider to determine what's right for you.</p>

<h2>Final Thoughts</h2>
<p>Boosting immunity naturally requires consistent daily effort. Eating nutrient-rich foods, exercising, sleeping well, managing stress, staying hydrated, and avoiding harmful habits work together to strengthen your body's defenses. Over time, these habits reduce illness frequency, enhance energy, and promote long-term physical and mental well-being effectively.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762818516/blog-6_sataw7.png',
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Health & Wellness
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover premium health products, expert wellness advice, and comprehensive tools 
              to enhance your physical and mental well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-gray-600">Health Tools</p>
            </div>
            <div
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">30+</div>
              <p className="text-gray-600">Health Products</p>
            </div>
            <div
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">100k+</div>
              <p className="text-gray-600">Wellness Enthusiasts</p>
            </div>
            <div
              className="p-6"
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Premium Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Blogs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Health & Wellness Blogs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with expert insights on health, nutrition, and wellness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customHealthBlogs.map((blog, index) => (
              <article
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`${blog.heroImage}?f_auto&q_auto:w_600&dpr_auto&c_fill,g_auto`}
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
                    href={`/categories/health/blogs/${blog.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Read More
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Health Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Health Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Scientifically-backed calculators and analyzers to help you monitor your health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthTools.slice(0, 4).map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>
                <Link
                  href={`/tools/${tool.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Use Tool
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tools/health"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Health Tools
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Health Tips</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional health advice from doctors and wellness experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Balanced Nutrition</h3>
              <p className="text-gray-600">
                Learn how to build a balanced plate with the right proportions of proteins, carbs, and healthy fats for optimal health.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exercise Guidelines</h3>
              <p className="text-gray-600">
                Discover the best types of exercise for your age, fitness level, and health goals with our personalized recommendations.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sleep Hygiene</h3>
              <p className="text-gray-600">
                Improve your sleep quality with evidence-based techniques for better rest and recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Take Control of Your Health Journey
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover premium products and expert advice to enhance your wellness and vitality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Health Products
              </Link>
              <Link
                href="/tools/health"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Health Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCategoryClient;
