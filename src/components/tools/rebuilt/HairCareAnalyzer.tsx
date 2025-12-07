'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const HairCareAnalyzer = () => {
  const [hairType, setHairType] = useState('');
  const [scalpCondition, setScalpCondition] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState('');
  const [result, setResult] = useState<{hairCharacteristics: {type: string, description: string, characteristics: string[]}, scalpRecommendations: {condition: string, description: string, recommendations: string[]}, concernSolutions: Array<{title: string, solutions: string[]}>, lifestyleTips: {title: string, tips: string[]}, routine: {washing: {frequency: string, products: string[]}, treatments: string[], styling: string[]}} | null>(null);

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const analyzeHair = useCallback(() => {
    if (!hairType || !scalpCondition) return;

    // Determine hair type characteristics
    const hairCharacteristics = getHairCharacteristics(hairType);
    
    // Determine scalp condition recommendations
    const scalpRecommendations = getScalpRecommendations(scalpCondition);
    
    // Determine concerns-based solutions
    const concernSolutions = getConcernSolutions(concerns);
    
    // Determine lifestyle impact
    const lifestyleTips = getLifestyleTips(lifestyle);
    
    // Create personalized routine
    const routine = createHairRoutine(hairType, scalpCondition, concerns, lifestyle);

    setResult({
      hairCharacteristics,
      scalpRecommendations,
      concernSolutions,
      lifestyleTips,
      routine
    });
  }, [hairType, scalpCondition, concerns, lifestyle]);

  // Helper functions
  function getHairCharacteristics(hairType: string) {
    switch (hairType) {
      case 'straight':
        return {
          type: 'Straight Hair',
          description: 'Hair that lies flat and has minimal natural curl pattern.',
          characteristics: [
            'Tends to get oily quickly as oils travel easily down the shaft',
            'May appear limp or lack volume',
            'Generally easier to manage and style'
          ]
        };
      case 'wavy':
        return {
          type: 'Wavy Hair',
          description: 'Hair with a loose S-pattern that begins to curl at the ends.',
          characteristics: [
            'Can be prone to frizz in humid conditions',
            'Often has a combination of oily roots and dry ends',
            'May appear voluminous when styled correctly'
          ]
        };
      case 'curly':
        return {
          type: 'Curly Hair',
          description: 'Hair with distinct S-shaped curls that form throughout the length.',
          characteristics: [
            'Prone to dryness as oils have difficulty traveling down the shaft',
            'Requires more moisture to maintain curl definition',
            'Can be prone to tangling and shrinkage'
          ]
        };
      case 'coily':
        return {
          type: 'Coily Hair',
          description: 'Hair with tight, zigzag patterns that form compact curls or coils.',
          characteristics: [
            'Requires significant moisture to prevent breakage',
            'Often has a cotton-like texture',
            'Shrinkage is common, making length appear shorter'
          ]
        };
      default:
        return {
          type: 'Unknown',
          description: 'Hair type not specified',
          characteristics: []
        };
    }
  }

  function getScalpRecommendations(scalpCondition: string) {
    switch (scalpCondition) {
      case 'oily':
        return {
          condition: 'Oily Scalp',
          description: 'Excess sebum production leads to greasy appearance and potential buildup.',
          recommendations: [
            'Use a clarifying shampoo 1-2 times per week',
            'Avoid over-massaging the scalp during washing',
            'Choose lightweight, water-based products',
            'Consider scalp treatments with salicylic acid'
          ]
        };
      case 'dry':
        return {
          condition: 'Dry Scalp',
          description: 'Lack of moisture causes flakiness, itchiness, and irritation.',
          recommendations: [
            'Use a moisturizing shampoo and conditioner',
            'Apply scalp oils or treatments 1-2 times per week',
            'Avoid hot water which can strip natural oils',
            'Consider a humidifier in dry environments'
          ]
        };
      case 'sensitive':
        return {
          condition: 'Sensitive Scalp',
          description: 'Prone to irritation, redness, and reactions to products or environmental factors.',
          recommendations: [
            'Choose fragrance-free, hypoallergenic products',
            'Patch test new products before full application',
            'Avoid harsh sulfates and alcohol-based products',
            'Use lukewarm water for washing'
          ]
        };
      case 'normal':
        return {
          condition: 'Normal Scalp',
          description: 'Balanced oil production with minimal issues or concerns.',
          recommendations: [
            'Maintain current routine with gentle products',
            'Deep condition monthly for continued health',
            'Protect from environmental stressors with UV filters',
            'Regular trims to prevent split ends'
          ]
        };
      default:
        return {
          condition: 'Unknown',
          description: 'Scalp condition not specified',
          recommendations: []
        };
    }
  }

  function getConcernSolutions(concerns: string[]) {
    const solutions: Record<string, {title: string, solutions: string[]}> = {
      hairLoss: {
        title: 'Hair Loss/Thinning',
        solutions: [
          'Use products with ingredients like biotin, caffeine, or niacinamide',
          'Consider scalp massage to stimulate blood circulation',
          'Maintain a balanced diet rich in protein and vitamins',
          'Consult a dermatologist for persistent hair loss'
        ]
      },
      dandruff: {
        title: 'Dandruff/Flakiness',
        solutions: [
          'Use anti-dandruff shampoos with zinc pyrithione or ketoconazole',
          'Wash hair regularly to prevent buildup',
          'Apply apple cider vinegar rinse once a week',
          'Avoid harsh styling products that can irritate the scalp'
        ]
      },
      frizz: {
        title: 'Frizz/Unmanageability',
        solutions: [
          'Use sulfate-free shampoos to preserve natural oils',
          'Apply leave-in conditioners or anti-frizz serums',
          'Sleep on silk or satin pillowcases to reduce friction',
          'Avoid brushing hair when wet'
        ]
      },
      damage: {
        title: 'Damage/Breakage',
        solutions: [
          'Trim split ends regularly to prevent further damage',
          'Use protein treatments to strengthen hair',
          'Minimize heat styling and always use heat protectants',
          'Switch to gentler hair ties and avoid tight hairstyles'
        ]
      },
      colorFading: {
        title: 'Color Fading',
        solutions: [
          'Use color-safe shampoos and conditioners',
          'Wash hair in cooler water to preserve color',
          'Limit sun exposure and use UV protection sprays',
          'Deep condition weekly to maintain hair health'
        ]
      }
    };

    const validConcerns = concerns.filter(concern => 
      concern === 'hairLoss' || concern === 'dandruff' || concern === 'frizz' || concern === 'damage' || concern === 'colorFading'
    );
    return validConcerns.map(concern => solutions[concern]);
  }

  function getLifestyleTips(lifestyle: string) {
    switch (lifestyle) {
      case 'frequentStyler':
        return {
          title: 'Frequent Styler',
          tips: [
            'Invest in quality heat protectants for all styling tools',
            'Deep condition weekly to counteract heat damage',
            'Alternate between heat-free styling days when possible',
            'Use lower heat settings and keep tools moving'
          ]
        };
      case 'athlete':
        return {
          title: 'Athlete',
          tips: [
            'Rinse hair with clean water after sweating',
            'Use dry shampoo between washes to absorb excess oil',
            'Wear breathable hair accessories during workouts',
            'Consider protective styles for intense training periods'
          ]
        };
      case 'traveler':
        return {
          title: 'Frequent Traveler',
          tips: [
            'Pack travel-sized moisturizing products',
            'Use hotel water filters or bottled water for washing',
            'Protect hair from different climates with leave-in treatments',
            'Minimize product changes between locations'
          ]
        };
      case 'minimalist':
        return {
          title: 'Minimalist',
          tips: [
            'Choose multi-purpose products to simplify routine',
            'Focus on quality over quantity in your hair care',
            'Establish a consistent routine with 2-3 essential products',
            'Invest in good tools that reduce styling time'
          ]
        };
      default:
        return {
          title: 'General',
          tips: [
            'Maintain a consistent hair care routine',
            'Listen to your hair and adjust products as needed',
            'Protect hair from environmental stressors',
            'Regular trims help maintain healthy ends'
          ]
        };
    }
  }

  function createHairRoutine(hairType: string, scalpCondition: string, concerns: string[]) {
    const routine = {
      washing: {
        frequency: '',
        products: [] as string[]
      },
      treatments: [] as string[],
      styling: [] as string[]
    };

    // Washing frequency based on hair type and scalp condition
    if (scalpCondition === 'oily') {
      routine.washing.frequency = 'Every other day or daily';
    } else if (scalpCondition === 'dry') {
      routine.washing.frequency = '2-3 times per week';
    } else {
      routine.washing.frequency = '2-3 times per week';
    }

    // Product recommendations
    if (scalpCondition === 'oily') {
      routine.washing.products.push('Clarifying shampoo (1-2 times per week)');
      routine.washing.products.push('Balancing shampoo for regular washes');
    } else if (scalpCondition === 'dry') {
      routine.washing.products.push('Moisturizing shampoo and conditioner');
      routine.washing.products.push('Leave-in conditioner');
    } else {
      routine.washing.products.push('Gentle, sulfate-free shampoo');
      routine.washing.products.push('Lightweight conditioner');
    }

    // Treatment recommendations based on concerns
    if (concerns.includes('damage')) {
      routine.treatments.push('Protein treatment weekly');
    }
    
    if (concerns.includes('frizz') || hairType === 'curly' || hairType === 'coily') {
      routine.treatments.push('Deep conditioning treatment weekly');
    }
    
    if (concerns.includes('dandruff')) {
      routine.treatments.push('Anti-dandruff treatment 2-3 times per week');
    }

    // Styling recommendations
    if (hairType === 'curly' || hairType === 'coily') {
      routine.styling.push('Leave-in conditioner or curl cream');
      routine.styling.push('Gentle detangling with wide-tooth comb');
    } else {
      routine.styling.push('Heat protectant before styling');
      routine.styling.push('Light serum or oil for shine');
    }

    return routine;
  }

  const reset = useCallback(() => {
    setHairType('');
    setScalpCondition('');
    setConcerns([]);
    setLifestyle('');
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
          <div className="text-3xl sm:text-4xl mb-2">💇</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Hair Care Analyzer</h2>
          <p className="mobile-text-sm text-gray-600">
            Get personalized hair care recommendations based on your hair type
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your hair type?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'straight', label: 'Straight' },
                      { id: 'wavy', label: 'Wavy' },
                      { id: 'curly', label: 'Curly' },
                      { id: 'coily', label: 'Coily/Kinky' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setHairType(type.id)}
                        className={`py-3 rounded-md font-medium transition-colors ${
                          hairType === type.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your scalp condition?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'oily', label: 'Oily' },
                      { id: 'dry', label: 'Dry' },
                      { id: 'sensitive', label: 'Sensitive' },
                      { id: 'normal', label: 'Normal' }
                    ].map((condition) => (
                      <button
                        key={condition.id}
                        onClick={() => setScalpCondition(condition.id)}
                        className={`py-3 rounded-md font-medium transition-colors ${
                          scalpCondition === condition.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {condition.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your main hair concerns? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'hairLoss', label: 'Hair Loss/Thinning' },
                      { id: 'dandruff', label: 'Dandruff/Flakiness' },
                      { id: 'frizz', label: 'Frizz/Unmanageability' },
                      { id: 'damage', label: 'Damage/Breakage' },
                      { id: 'colorFading', label: 'Color Fading' }
                    ].map((concern) => (
                      <button
                        key={concern.id}
                        onClick={() => toggleConcern(concern.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          concerns.includes(concern.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {concern.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What best describes your lifestyle?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'frequentStyler', label: 'Frequent Styler' },
                      { id: 'athlete', label: 'Athlete' },
                      { id: 'traveler', label: 'Frequent Traveler' },
                      { id: 'minimalist', label: 'Minimalist' }
                    ].map((life) => (
                      <button
                        key={life.id}
                        onClick={() => setLifestyle(life.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          lifestyle === life.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {life.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={analyzeHair}
                disabled={!hairType || !scalpCondition}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Analyze My Hair Care Needs
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
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Personalized Hair Care Analysis
              </div>
              <p className="text-gray-600">
                Based on your {result.hairCharacteristics.type.toLowerCase()} with {result.scalpRecommendations.condition.toLowerCase()}
              </p>
            </div>
            
            {/* Hair Type Characteristics */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Hair Type: {result.hairCharacteristics.type}</h3>
              <p className="text-gray-600 mb-3">{result.hairCharacteristics.description}</p>
              <ul className="space-y-2">
                {result.hairCharacteristics.characteristics.map((char: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{char}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Scalp Condition Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Scalp Condition: {result.scalpRecommendations.condition}</h3>
              <p className="text-gray-600 mb-3">{result.scalpRecommendations.description}</p>
              <ul className="space-y-2">
                {result.scalpRecommendations.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                    <p className="ml-2 text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Concern Solutions */}
            {result.concernSolutions.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Addressing Your Concerns</h3>
                <div className="space-y-4">
                  {result.concernSolutions.map((solution: {title: string, solutions: string[]}, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-2">{solution.title}</h4>
                      <ul className="space-y-1">
                        {solution.solutions.map((sol: string, solIndex: number) => (
                          <li key={solIndex} className="flex items-start text-sm">
                            <div className="flex-shrink-0 h-4 w-4 text-purple-500 mt-0.5">→</div>
                            <p className="ml-2 text-gray-700">{sol}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Lifestyle Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Lifestyle Recommendations: {result.lifestyleTips.title}</h3>
              <ul className="space-y-2">
                {result.lifestyleTips.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">★</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Personalized Routine */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Your Personalized Routine</h3>
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="font-medium text-blue-800 mb-2">Washing Schedule</p>
                <p className="text-blue-700 mb-3">Frequency: {result.routine.washing.frequency}</p>
                <p className="font-medium text-blue-800 mb-2">Recommended Products</p>
                <ul className="space-y-1">
                  {result.routine.washing.products.map((product: string, index: number) => (
                    <li key={index} className="text-blue-700 text-sm">• {product}</li>
                  ))}
                </ul>
              </div>
              
              {result.routine.treatments.length > 0 && (
                <div className="p-4 bg-green-50 rounded-md mt-3">
                  <p className="font-medium text-green-800 mb-2">Weekly Treatments</p>
                  <ul className="space-y-1">
                    {result.routine.treatments.map((treatment: string, index: number) => (
                      <li key={index} className="text-green-700 text-sm">• {treatment}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {result.routine.styling.length > 0 && (
                <div className="p-4 bg-purple-50 rounded-md mt-3">
                  <p className="font-medium text-purple-800 mb-2">Styling Tips</p>
                  <ul className="space-y-1">
                    {result.routine.styling.map((style: string, index: number) => (
                      <li key={index} className="text-purple-700 text-sm">• {style}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Important Reminders</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Introduce new products gradually to test compatibility</li>
                <li>Be patient—it can take 6-8 weeks to see improvements</li>
                <li>Consult a trichologist for persistent hair or scalp issues</li>
                <li>Regular trims help maintain healthy hair ends</li>
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
            Individual hair needs can be complex and may require professional evaluation by a trichologist 
            or dermatologist. Results may vary, and it&apos;s important to patch test new products before full application.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default HairCareAnalyzer;