'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SkinTypeAnalyzer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{
    skinType: string;
    description: string;
    characteristics: string[];
    recommendations: string[];
    products: string[];
    tips: string[];
  } | null>(null);

  const questions = [
    {
      question: "How does your skin feel after cleansing?",
      options: [
        { text: "Tight and sometimes flaky", value: 1 },
        { text: "Comfortable and balanced", value: 2 },
        { text: "Shiny, especially in T-zone", value: 3 },
        { text: "Shiny all over within an hour", value: 4 }
      ]
    },
    {
      question: "How often do you experience breakouts?",
      options: [
        { text: "Rarely or never", value: 1 },
        { text: "Occasionally, mostly during hormonal changes", value: 2 },
        { text: "Regularly in T-zone (forehead, nose, chin)", value: 3 },
        { text: "Frequently across the entire face", value: 4 }
      ]
    },
    {
      question: "How does your skin react to new products?",
      options: [
        { text: "Often becomes red, itchy, or irritated", value: 1 },
        { text: "Usually tolerates them well", value: 2 },
        { text: "Sometimes breaks out in oily areas", value: 3 },
        { text: "May break out but recovers quickly", value: 4 }
      ]
    },
    {
      question: "How does your skin look by midday?",
      options: [
        { text: "Still matte, sometimes looks dull", value: 1 },
        { text: "Fresh and comfortable", value: 2 },
        { text: "Shiny in T-zone, normal elsewhere", value: 3 },
        { text: "Noticeably oily and shiny overall", value: 4 }
      ]
    },
    {
      question: "How does your skin feel in different weather?",
      options: [
        { text: "Tight and dry in cold/dry weather", value: 1 },
        { text: "Adapts well to weather changes", value: 2 },
        { text: "Oilier in humid weather, drier in cold", value: 3 },
        { text: "Always tends to be oily regardless of weather", value: 4 }
      ]
    },
    {
      question: "What's the size of your pores?",
      options: [
        { text: "Small, barely visible", value: 1 },
        { text: "Normal size, visible but not prominent", value: 2 },
        { text: "Larger in T-zone, normal elsewhere", value: 3 },
        { text: "Large and visible across the face", value: 4 }
      ]
    },
    {
      question: "How does your skin age?",
      options: [
        { text: "Shows fine lines and wrinkles earlier", value: 1 },
        { text: "Ages gradually with balanced signs", value: 2 },
        { text: "Mixed - some areas age faster than others", value: 3 },
        { text: "Tends to age more slowly due to natural oils", value: 4 }
      ]
    }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateSkinType(newAnswers);
    }
  };

  const calculateSkinType = (allAnswers: number[]) => {
    const average = allAnswers.reduce((sum, answer) => sum + answer, 0) / allAnswers.length;

    let skinType = '';
    let description = '';
    let characteristics: string[] = [];
    let recommendations: string[] = [];
    let products: string[] = [];
    let tips: string[] = [];

    if (average <= 1.5) {
      skinType = 'Dry Skin';
      description = 'Your skin produces less oil than it needs, leading to tightness and potential flaking.';
      characteristics = [
        'Feels tight after cleansing',
        'Small, barely visible pores',
        'Prone to fine lines',
        'May feel rough or flaky',
        'Rarely experiences breakouts'
      ];
      recommendations = [
        'Use gentle, cream-based cleansers',
        'Apply rich moisturizers twice daily',
        'Use hydrating serums with hyaluronic acid',
        'Avoid harsh scrubs and alcohol-based products',
        'Consider overnight sleeping masks'
      ];
      products = [
        'Cream or oil-based cleansers',
        'Rich, emollient moisturizers',
        'Hydrating serums and face oils',
        'Gentle, non-foaming cleansers',
        'Ceramide-containing products'
      ];
      tips = [
        'Use lukewarm water when cleansing',
        'Pat skin dry, don\'t rub',
        'Apply moisturizer while skin is still damp',
        'Use a humidifier in dry environments',
        'Drink plenty of water'
      ];
    } else if (average <= 2.5) {
      skinType = 'Normal Skin';
      description = 'Your skin has a good balance of oil and moisture, with few imperfections.';
      characteristics = [
        'Balanced oil production',
        'Normal-sized pores',
        'Smooth, even texture',
        'Good tolerance to products',
        'Minimal sensitivity'
      ];
      recommendations = [
        'Maintain your routine with gentle products',
        'Use a balanced moisturizer',
        'Focus on prevention with antioxidants',
        'Regular exfoliation 1-2 times per week',
        'Don\'t over-complicate your routine'
      ];
      products = [
        'Gentle foaming or gel cleansers',
        'Lightweight to medium moisturizers',
        'Vitamin C serums',
        'Broad-spectrum sunscreen',
        'Gentle chemical exfoliants'
      ];
      tips = [
        'Stick to a consistent routine',
        'Introduce new products gradually',
        'Focus on sun protection',
        'Listen to your skin\'s seasonal needs',
        'Maintain a healthy lifestyle'
      ];
    } else if (average <= 3.5) {
      skinType = 'Combination Skin';
      description = 'Your skin is oily in the T-zone (forehead, nose, chin) but normal to dry elsewhere.';
      characteristics = [
        'Oily T-zone, normal cheeks',
        'Larger pores in T-zone',
        'May experience breakouts in oily areas',
        'Different needs across face zones',
        'Seasonal variations'
      ];
      recommendations = [
        'Use different products for different zones',
        'Gentle cleansing for the entire face',
        'Lightweight moisturizer on oily areas',
        'Regular moisturizer on dry areas',
        'Targeted treatments for specific concerns'
      ];
      products = [
        'Gentle gel or foam cleansers',
        'Oil-free moisturizers for T-zone',
        'Regular moisturizers for cheeks',
        'Clay masks for T-zone only',
        'Balancing toners'
      ];
      tips = [
        'Use multi-masking techniques',
        'Don\'t over-dry the oily areas',
        'Adjust routine seasonally',
        'Use blotting papers during the day',
        'Focus on balance, not elimination of oil'
      ];
    } else {
      skinType = 'Oily Skin';
      description = 'Your skin produces excess sebum, leading to shine, enlarged pores, and potential breakouts.';
      characteristics = [
        'Shiny appearance throughout the day',
        'Large, visible pores',
        'Prone to blackheads and breakouts',
        'Thick, resilient skin texture',
        'Ages more slowly due to natural oils'
      ];
      recommendations = [
        'Use oil-free, non-comedogenic products',
        'Cleanse twice daily with gel or foam cleanser',
        'Use lightweight, oil-free moisturizers',
        'Regular use of BHA (salicylic acid)',
        'Clay masks 1-2 times per week'
      ];
      products = [
        'Foaming or gel cleansers',
        'Oil-free, lightweight moisturizers',
        'Salicylic acid treatments',
        'Clay or charcoal masks',
        'Non-comedogenic sunscreens'
      ];
      tips = [
        'Don\'t skip moisturizer',
        'Avoid over-cleansing',
        'Use blotting papers, not powder',
        'Choose makeup labeled "oil-free"',
        'Be patient with treatments'
      ];
    }

    setResult({
      skinType,
      description,
      characteristics,
      recommendations,
      products,
      tips
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">✨</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Skin Type</h2>
            <div className="text-2xl font-semibold text-blue-600 mb-4">{result.skinType}</div>
            <p className="text-gray-600 max-w-2xl mx-auto">{result.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Characteristics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-purple-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                🔍 Characteristics
              </h3>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-green-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                💡 Recommendations
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Product Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-4">
                🧴 Product Types
              </h3>
              <ul className="space-y-2">
                {result.products.map((product, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{product}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-yellow-50 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                🌟 Care Tips
              </h3>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This analysis is for general guidance only. 
              Individual skin needs may vary. For persistent skin concerns, consult with a dermatologist.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">✨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skin Type Analyzer</h2>
          <p className="text-gray-600">
            Answer a few questions to discover your skin type and get personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Start Over
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SkinTypeAnalyzer;