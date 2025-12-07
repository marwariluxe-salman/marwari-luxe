'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SkinTypeAnalyzer = () => {
  const [answers, setAnswers] = useState<number[]>(Array(6).fill(0));
  const [result, setResult] = useState<{
    skinType: string;
    description: string;
    characteristics: string[];
    routine: string[];
  } | null>(null);

  const questions = [
    {
      question: "How does your skin typically feel throughout the day?",
      options: [
        "Tight and uncomfortable, especially after cleansing",
        "Shiny or greasy, particularly in the T-zone",
        "Comfortable and balanced",
        "Flaky or rough in some areas",
        "Combination of tight and oily"
      ]
    },
    {
      question: "How often do you experience breakouts?",
      options: [
        "Rarely or never",
        "Frequently, especially in the T-zone",
        "Occasionally, but not consistently",
        "Often, with persistent dry patches",
        "In specific areas only"
      ]
    },
    {
      question: "How does your skin react to new products?",
      options: [
        "Often becomes red, itchy, or irritated",
        "Usually adjusts well without issues",
        "Sometimes reacts, but not severely",
        "Rarely reacts, but can feel tight",
        "Mixed reactions depending on the product"
      ]
    },
    {
      question: "How does your skin look after cleansing?",
      options: [
        "Appears dull or grayish",
        "Looks shiny or oily within an hour",
        "Looks fresh and radiant",
        "Appears flaky or patchy",
        "Oily in some areas, dry in others"
      ]
    },
    {
      question: "How does your skin respond to seasonal changes?",
      options: [
        "Becomes more sensitive or reactive",
        "Gets oilier in summer, drier in winter",
        "Generally remains consistent",
        "Becomes flakier or rougher in cold weather",
        "Varies significantly with seasons"
      ]
    },
    {
      question: "How would you describe the texture of your skin?",
      options: [
        "Thin, delicate, and prone to redness",
        "Thick, with enlarged pores visible",
        "Smooth and even-textured",
        "Rough or bumpy in certain areas",
        "Combination of smooth and rough areas"
      ]
    }
  ];

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const analyzeSkinType = useCallback(() => {
    // Calculate scores for each skin type based on answers
    let dryScore = 0;
    let oilyScore = 0;
    let combinationScore = 0;
    let normalScore = 0;
    let sensitiveScore = 0;

    // Question 1: Feel throughout the day
    if (answers[0] === 0) dryScore += 3;
    if (answers[0] === 1) oilyScore += 3;
    if (answers[0] === 2) normalScore += 3;
    if (answers[0] === 3) dryScore += 2;
    if (answers[0] === 4) combinationScore += 3;

    // Question 2: Breakouts frequency
    if (answers[1] === 0) normalScore += 2;
    if (answers[1] === 1) oilyScore += 3;
    if (answers[1] === 2) normalScore += 1;
    if (answers[1] === 3) dryScore += 2;
    if (answers[1] === 4) combinationScore += 2;

    // Question 3: Reaction to new products
    if (answers[2] === 0) sensitiveScore += 3;
    if (answers[2] === 1) normalScore += 2;
    if (answers[2] === 2) normalScore += 1;
    if (answers[2] === 3) dryScore += 1;
    if (answers[2] === 4) combinationScore += 1;

    // Question 4: Appearance after cleansing
    if (answers[3] === 0) dryScore += 3;
    if (answers[3] === 1) oilyScore += 3;
    if (answers[3] === 2) normalScore += 3;
    if (answers[3] === 3) dryScore += 2;
    if (answers[3] === 4) combinationScore += 3;

    // Question 5: Seasonal response
    if (answers[4] === 0) sensitiveScore += 2;
    if (answers[4] === 1) oilyScore += 1;
    if (answers[4] === 2) normalScore += 3;
    if (answers[4] === 3) dryScore += 2;
    if (answers[4] === 4) combinationScore += 2;

    // Question 6: Skin texture
    if (answers[5] === 0) sensitiveScore += 2;
    if (answers[5] === 1) oilyScore += 2;
    if (answers[5] === 2) normalScore += 3;
    if (answers[5] === 3) dryScore += 2;
    if (answers[5] === 4) combinationScore += 2;

    // Determine dominant skin type
    const scores = [
      { type: 'Dry', score: dryScore },
      { type: 'Oily', score: oilyScore },
      { type: 'Combination', score: combinationScore },
      { type: 'Normal', score: normalScore },
      { type: 'Sensitive', score: sensitiveScore }
    ];

    const dominantType = scores.reduce((prev, current) => 
      (prev.score > current.score) ? prev : current
    );

    // Define results based on skin type
    let skinTypeResult: {
      skinType: string;
      description: string;
      characteristics: string[];
      routine: string[];
    };

    switch (dominantType.type) {
      case 'Dry':
        skinTypeResult = {
          skinType: 'Dry Skin',
          description: 'Your skin lacks moisture and lipids, leading to a dehydrated appearance.',
          characteristics: [
            'Feels tight and uncomfortable, especially after washing',
            'May appear flaky or rough in texture',
            'Fine lines are more noticeable',
            'Less resilient to environmental stressors'
          ],
          routine: [
            'Use a gentle, hydrating cleanser twice daily',
            'Apply a rich moisturizer immediately after cleansing',
            'Incorporate a hydrating serum with hyaluronic acid',
            'Use a humidifier in dry environments',
            'Avoid hot water and harsh exfoliants'
          ]
        };
        break;
      case 'Oily':
        skinTypeResult = {
          skinType: 'Oily Skin',
          description: 'Your skin produces excess sebum, resulting in a shiny complexion and enlarged pores.',
          characteristics: [
            'Appears shiny, especially in the T-zone (forehead, nose, chin)',
            'Enlarged pores that may become clogged',
            'Prone to blackheads and acne breakouts',
            'Makeup tends to slide off more quickly'
          ],
          routine: [
            'Cleanse with a foaming or gel-based cleanser twice daily',
            'Use a lightweight, oil-free moisturizer',
            'Incorporate salicylic acid products to unclog pores',
            'Use blotting papers throughout the day to absorb excess oil',
            'Avoid over-cleansing which can stimulate more oil production'
          ]
        };
        break;
      case 'Combination':
        skinTypeResult = {
          skinType: 'Combination Skin',
          description: 'Your skin has both oily and dry areas, requiring targeted treatments for different zones.',
          characteristics: [
            'Oily T-zone (forehead, nose, chin) and dry cheeks',
            'Different products may be needed for different areas',
            'Pores appear larger in oily areas',
            'May experience breakouts in oily zones'
          ],
          routine: [
            'Use a gentle, balancing cleanser suitable for all skin types',
            'Apply different moisturizers to different areas of the face',
            'Use targeted treatments for oily and dry zones separately',
            'Exfoliate gently 1-2 times per week',
            'Consider using a mattifying product on the T-zone'
          ]
        };
        break;
      case 'Normal':
        skinTypeResult = {
          skinType: 'Normal Skin',
          description: 'Your skin is well-balanced with optimal hydration and minimal sensitivity.',
          characteristics: [
            'Comfortable and balanced throughout the day',
            'Few imperfections and barely visible pores',
            'Good circulation and healthy color',
            'Minimal sensitivity to products or environmental factors'
          ],
          routine: [
            'Maintain a simple routine with gentle cleansing',
            'Use a lightweight moisturizer morning and night',
            'Apply sunscreen daily to protect your healthy skin',
            'Exfoliate gently 1-2 times per week',
            'Introduce new products slowly to maintain balance'
          ]
        };
        break;
      case 'Sensitive':
        skinTypeResult = {
          skinType: 'Sensitive Skin',
          description: 'Your skin reacts easily to internal and external factors with irritation or discomfort.',
          characteristics: [
            'Prone to redness, stinging, or burning sensations',
            'Reacts to certain ingredients or environmental changes',
            'May feel tight, itchy, or uncomfortable',
            'Visible blood vessels or rosacea-like symptoms'
          ],
          routine: [
            'Use fragrance-free, hypoallergenic products',
            'Patch test new products before full application',
            'Avoid harsh exfoliants and extreme temperatures',
            'Incorporate calming ingredients like aloe vera or chamomile',
            'Simplify your routine to minimize potential irritants'
          ]
        };
        break;
      default:
        skinTypeResult = {
          skinType: 'Unknown',
          description: 'We couldn\'t determine your skin type. Please retake the quiz.',
          characteristics: [],
          routine: []
        };
    }

    setResult(skinTypeResult);
  }, [answers]);

  const reset = useCallback(() => {
    setAnswers(Array(6).fill(0));
    setResult(null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">✨</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Skin Type Analyzer</h2>
          <p className="mobile-text-sm text-gray-600">
            Determine your skin type with our comprehensive questionnaire
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-center mb-6">
                Answer the following questions honestly for the most accurate analysis:
              </p>
              
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900 mb-3">
                      {index + 1}. {q.question}
                    </h3>
                    
                    <div className="space-y-2">
                      {q.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswer(index, optionIndex)}
                          className={`w-full text-left p-3 rounded-md transition-colors ${
                            answers[index] === optionIndex
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={analyzeSkinType}
                disabled={answers.some(answer => answer === 0)}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Analyze My Skin Type
              </button>
              <button
                onClick={reset}
                className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t pt-6"
          >
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result.skinType}
              </div>
              <p className="text-gray-600">
                {result.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Characteristics</h3>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{char}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommended Routine</h3>
              <ul className="space-y-2">
                {result.routine.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                    <p className="ml-2 text-gray-700">{step}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Introduce new products gradually to test compatibility</li>
                <li>Consult a dermatologist for persistent skin concerns</li>
                <li>Adjust your routine seasonally as your skin changes</li>
                <li>Be patient—it can take 6-8 weeks to see results</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Retake Analysis
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This analysis provides general guidance based on your responses. 
            Individual skin types can be complex and may require professional evaluation by a dermatologist. 
            Results may vary, and it&apos;s important to patch test new products before full application.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SkinTypeAnalyzer;