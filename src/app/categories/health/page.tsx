'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { healthTools } from '@/data/tools';
import { blogIndex } from '@/services/blogService';
import { Blog } from '@/types';


const HealthCategoryPage = () => {
  // Custom blogs for Health & Wellness category
  const customHealthBlogs = [
    {
       id: 'custom-health-001',
    title: 'Gut Health Problems – Bloating & Poor Digestion',
    excerpt: "Always Bloated After Meals? 7 Proven Ways to Fix Your Gut Naturally",
    content: `<h1>Always Bloated After Meals? 7 Proven Ways to Fix Your Gut Naturally</h1>
    
<p>If you feel bloated after every meal, you’re not alone. Millions struggle with poor digestion, stomach discomfort, and an unbalanced gut microbiome every single day. What most people don’t realize is that your gut health affects far more than just your stomach — it impacts your mood, energy, skin, and even your immune system.

Here’s the thing: when your digestion slows down or your gut bacteria are out of balance, your body starts sending warning signs — like gas, fatigue, or feeling heavy after eating. It’s your body’s way of saying something’s off. The good news is, you don’t need fancy supplements or strict diets to fix it. You can heal your gut naturally with simple, science-backed habits that actually work.

In this blog, we’ll break down exactly how to do that. You’ll learn how to fix gut health naturally, what foods reduce bloating, and how to improve digestion after eating. You’ll also understand what’s really causing your bloating in the first place — whether it’s stress, certain foods, or eating too fast.

The best part? These small, daily changes can reset your digestive system in just a few weeks. We’ll talk about the best foods for bloating and digestion, how mindful eating improves gut function, and why your lifestyle choices matter more than any supplement. By focusing on natural ways to heal your gut, you’ll not only improve digestion but also boost your energy and immunity long-term.

So if you’re tired of feeling sluggish or constantly bloated, stay with me. This guide will show you how to eat, move, and live in a way that supports a healthy gut every day. Once you start treating your gut like your body’s control center, everything — from your skin to your mood — begins to improve.

Your journey to better digestion starts right here.</p>

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
<p>While self-care strategies are valuable, some situations require professional intervention. Therapists, counselors, and psychiatrists can provide additional tools and support for managing mental health.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762817815/blog-5_e7i150.png',
    },
    {
      id: 'custom-health-006',
      title: 'Immunity Weakness – Frequent Colds & Fatigue',
      excerpt: "Always Getting Sick? Boost Your Immune System Naturally With These Daily Habits",
      content: `<h1>Boosting Immunity: Strengthening Your Body's Natural Defenses</h1>
<p>Your immune system is your body's defense network against infections, diseases, and harmful substances. A strong immune system doesn't just prevent illness—it supports faster recovery and better overall health.</p>

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
<p>While a balanced diet should provide most nutrients, certain supplements may be beneficial during times of increased need. Consult with a healthcare provider to determine what's right for you.</p>`,
      heroImage: 'https://res.cloudinary.com/dxg5ldzkv/image/upload/v1762818516/blog-6_sataw7.png',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              🏥 Health & Wellness
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Discover premium health products, expert wellness advice, and comprehensive tools to enhance your physical and mental well-being. Your journey to optimal health starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">{healthTools.length}+</div>
              <p className="text-gray-600">Health Tools</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <p className="text-gray-600">Health Products</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">50k+</div>
              <p className="text-gray-600">Happy Customers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">Expert Support</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Health Categories with Images */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Health & Wellness Blogs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover expert insights, tips, and guides to enhance your health and wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {customHealthBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-semibold [&_p]:font-bold">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={`/categories/health/blogs/${blog.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Education Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Health Education & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering you with knowledge and tools to make informed health decisions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Guides</h2>
              <p className="text-gray-600 mb-4">
                Comprehensive guides on nutrition, exercise, mental health, and preventive care written by medical professionals.
              </p>
              <Link href="/blogs" className="text-green-600 hover:text-green-700 font-medium">
                Read Health Guides →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🛍️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Products</h2>
              <p className="text-gray-600 mb-4">
                Discover our curated selection of premium health products designed to enhance your wellness journey.
              </p>
              <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
                Explore Products →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-teal-50 to-green-50 p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">⚕️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Tools</h2>
              <p className="text-gray-600 mb-4">
                Professional health tools and calculators to monitor and improve your wellness metrics.
              </p>
              <Link href="/tools/health" className="text-green-600 hover:text-green-700 font-medium">
                Try Health Tools →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Health Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Health Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade health calculators and assessment tools to monitor and improve your wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTools.filter(tool => tool.featured).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-6">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{tool.title}</h3>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                  <Link
                    href={`/tools/${tool.id}`}
                    className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Try Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tools/health"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              View All Health Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Health Tips
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional advice from healthcare experts to help you live your healthiest life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">💧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Hydrated</h3>
              <p className="text-gray-600">
                Drink at least 8 glasses of water daily. Use our Water Intake Calculator to find your personalized hydration needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">🏃</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Regular Exercise</h3>
              <p className="text-gray-600">
                Aim for 150 minutes of moderate exercise weekly. Calculate your target heart rate zones for optimal workouts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Sleep</h3>
              <p className="text-gray-600">
                Get 7-9 hours of quality sleep nightly. Use our Sleep Cycle Calculator to optimize your rest schedule.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their health with our premium products and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/products"
                className="bg-white text-green-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Health Products
              </Link>
              <Link
                href="/tools/health"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Try Health Tools
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HealthCategoryPage;