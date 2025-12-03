'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const AntiAgingRoutinePlanner = () => {
  const [age, setAge] = useState('');
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState<{routine: any, ingredientInfo: any[], lifestyleTips: string[]} | null>(null);

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const planRoutine = useCallback(() => {
    if (!age || !skinType) return;

    // Create personalized anti-aging routine
    const routine = createAntiAgingRoutine(parseInt(age), skinType, concerns, budget);
    
    // Provide ingredient education
    const ingredientInfo = getIngredientInformation(concerns);
    
    // Offer lifestyle recommendations
    const lifestyleTips = getLifestyleTips(parseInt(age), concerns);

    setResult({
      routine,
      ingredientInfo,
      lifestyleTips
    });
  }, [age, skinType, concerns, budget]);

  // Helper functions
  function createAntiAgingRoutine(age: number, skinType: string, concerns: string[], budget: string) {
    const routine = {
      morning: {
        title: "Morning Routine",
        steps: [] as {step: number, name: string, description: string, recommendation: string}[]
      },
      evening: {
        title: "Evening Routine",
        steps: [] as {step: number, name: string, description: string, recommendation: string}[]
      },
      weekly: [] as {name: string, frequency: string, description: string, recommendation: string}[]
    };

    // Morning routine - basics for all ages
    routine.morning.steps.push({
      step: 1,
      name: "Gentle Cleanser",
      description: "Remove overnight buildup without stripping natural oils",
      recommendation: getCleanserRecommendation(skinType, budget)
    });

    if (age >= 25) {
      routine.morning.steps.push({
        step: 2,
        name: "Antioxidant Serum",
        description: "Protect against free radical damage and environmental stressors",
        recommendation: getAntioxidantRecommendation(budget)
      });
    }

    if (age >= 30) {
      routine.morning.steps.push({
        step: 3,
        name: "Eye Cream",
        description: "Target fine lines and puffiness around the delicate eye area",
        recommendation: getEyeCreamRecommendation(budget)
      });
    }

    routine.morning.steps.push({
      step: age >= 30 ? 4 : 3,
      name: "Moisturizer",
      description: "Hydrate and support the skin barrier",
      recommendation: getMoisturizerRecommendation(skinType, budget)
    });

    routine.morning.steps.push({
      step: age >= 30 ? 5 : 4,
      name: "Sunscreen",
      description: "The most important anti-aging step - prevents 80% of aging signs",
      recommendation: "Broad spectrum SPF 30+"
    });

    // Evening routine
    routine.evening.steps.push({
      step: 1,
      name: "Double Cleanse",
      description: "Oil cleanser followed by water-based cleanser to remove makeup and pollutants",
      recommendation: getDoubleCleanseRecommendation(skinType, budget)
    });

    if (age >= 25) {
      routine.evening.steps.push({
        step: 2,
        name: "Treatment Serum",
        description: "Target specific concerns with active ingredients",
        recommendation: getTreatmentSerumRecommendation(concerns, budget)
      });
    }

    if (age >= 35) {
      routine.evening.steps.push({
        step: 3,
        name: "Retinoid",
        description: "The gold standard for anti-aging - boosts collagen and cell turnover",
        recommendation: getRetinoidRecommendation(budget, age)
      });
    }

    if (age >= 30) {
      routine.evening.steps.push({
        step: age >= 35 ? 4 : 3,
        name: "Eye Cream",
        description: "Nourish the delicate eye area overnight",
        recommendation: getEyeCreamRecommendation(budget)
      });
    }

    routine.evening.steps.push({
      step: age >= 35 ? 5 : age >= 30 ? 4 : 3,
      name: "Night Moisturizer",
      description: "Rich, nourishing cream to support skin repair overnight",
      recommendation: getNightMoisturizerRecommendation(skinType, budget)
    });

    // Weekly treatments
    if (age >= 30) {
      routine.weekly.push({
        name: "Gentle Exfoliation",
        frequency: "1-2 times per week",
        description: "Remove dead skin cells to promote cell turnover",
        recommendation: getExfoliationRecommendation(skinType, budget)
      });
    }

    if (age >= 40 || concerns.includes('hydration')) {
      routine.weekly.push({
        name: "Hydrating Mask",
        frequency: "1-2 times per week",
        description: "Intensive hydration to plump and firm the skin",
        recommendation: getMaskRecommendation('hydrating', budget)
      });
    }

    if (concerns.includes('firmness')) {
      routine.weekly.push({
        name: "Firming Treatment",
        frequency: "2-3 times per week",
        description: "Target loss of elasticity with peptides and firming ingredients",
        recommendation: getMaskRecommendation('firming', budget)
      });
    }

    return routine;
  }

  function getCleanserRecommendation(skinType: string, budget: string) {
    if (budget === 'low') {
      return skinType === 'dry' ? "CeraVe Hydrating Cleanser" : "CeraVe Foaming Cleanser";
    } else if (budget === 'mid') {
      return skinType === 'dry' ? "La Roche-Posay Toleriane Hydrating Gentle Cleanser" : "CeraVe Foaming Facial Cleanser";
    } else {
      return skinType === 'dry' ? "Tatcha The Rice Wash" : "Fresh Soy Face Cleanser";
    }
  }

  function getAntioxidantRecommendation(budget: string) {
    if (budget === 'low') return "The Ordinary Vitamin C Suspension 23% + HA Spheres";
    if (budget === 'mid') return "SkinCeuticals C E Ferulic";
    return "Drunk Elephant C-Firma Day Serum";
  }

  function getEyeCreamRecommendation(budget: string) {
    if (budget === 'low') return "The Ordinary Caffeine Solution 5% + EGCG";
    if (budget === 'mid') return "Kiehl's Creamy Eye Treatment with Avocado";
    return "La Mer The Eye Concentrate";
  }

  function getMoisturizerRecommendation(skinType: string, budget: string) {
    if (skinType === 'oily') {
      if (budget === 'low') return "Neutrogena Hydro Boost Water Gel";
      if (budget === 'mid') return "Clinique Moisture Surge 100H";
      return "Tatcha The Water Cream";
    } else {
      if (budget === 'low') return "CeraVe Daily Moisturizing Lotion";
      if (budget === 'mid') return "First Aid Beauty Ultra Repair Cream";
      return "SkinCeuticals Triple Lipid Restore 2:4:2";
    }
  }

  function getDoubleCleanseRecommendation(skinType: string, budget: string) {
    if (budget === 'low') {
      return skinType === 'dry' ? 
        "Banila Co Clean It Zero Balm + CeraVe Hydrating Cleanser" : 
        "The Face Shop Rice Water Bright Cleansing Oil + CeraVe Foaming Cleanser";
    } else if (budget === 'mid') {
      return skinType === 'dry' ? 
        "DHC Deep Cleansing Oil + La Roche-Posay Toleriane Cleanser" : 
        "Shu Uemura Anti/Oxi+ Cleansing Oil + CeraVe Foaming Cleanser";
    } else {
      return skinType === 'dry' ? 
        "Chanel Le Lift Cleansing Oil + SK-II Facial Treatment Gentle Cleanser" : 
        "Dior Prestige Le Nobile de Dior Cleansing Oil + Fresh Soy Face Cleanser";
    }
  }

  function getTreatmentSerumRecommendation(concerns: string[], budget: string) {
    if (concerns.includes('darkSpots')) {
      if (budget === 'low') return "The Ordinary Alpha Arbutin 2% + HA";
      if (budget === 'mid') return "Paula's Choice Clinical 15% Vitamin C Booster";
      return "SkinMedica Lytera 2.0 Pigment Correcting Serum";
    }
    
    if (concerns.includes('fineLines')) {
      if (budget === 'low') return "The Ordinary Buffet";
      if (budget === 'mid') return "Olay Regenerist Micro-Sculpting Serum";
      return "La Prairie Skin Caviar Liquid Lift";
    }
    
    // Default antioxidant serum
    if (budget === 'low') return "The Ordinary Vitamin C Suspension 23% + HA Spheres";
    if (budget === 'mid') return "SkinCeuticals Phloretin CF";
    return "Drunk Elephant C-Firma Night Serum";
  }

  function getRetinoidRecommendation(budget: string, age: number) {
    if (age < 35) {
      if (budget === 'low') return "The Ordinary Granactive Retinoid 2% Emulsion";
      if (budget === 'mid') return "Differin Gel (Adapalene 0.1%)";
      return "SkinMedica Retinol Complex 0.25";
    } else {
      if (budget === 'low') return "The Ordinary Retinol 0.2% in Squalane";
      if (budget === 'mid') return "RoC Retinol Correxion Deep Wrinkle Night Cream";
      return "SkinMedica Retinol Complex 0.5";
    }
  }

  function getNightMoisturizerRecommendation(skinType: string, budget: string) {
    if (skinType === 'oily') {
      if (budget === 'low') return "Neutrogena Hydro Boost Water Gel";
      if (budget === 'mid') return "Clinique Moisture Surge 100H";
      return "Tatcha The Water Cream";
    } else {
      if (budget === 'low') return "CeraVe PM Facial Moisturizing Lotion";
      if (budget === 'mid') return "Olay Regenerist Whip Face Moisturizer";
      return "La Mer Crème de la Mer";
    }
  }

  function getExfoliationRecommendation(skinType: string, budget: string) {
    if (skinType === 'sensitive') {
      if (budget === 'low') return "The Ordinary Lactic Acid 5% + HA";
      if (budget === 'mid') return "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant";
      return "Drunk Elephant T.L.C. Framboos Glycolic Night Serum";
    } else {
      if (budget === 'low') return "The Ordinary Glycolic Acid 7% Toning Solution";
      if (budget === 'mid') return "Paula's Choice Skin Perfecting 2% BHA Liquid Exfoliant";
      return "Dr. Dennis Gross Alpha Beta Universal Daily Peel";
    }
  }

  function getMaskRecommendation(type: string, budget: string) {
    if (type === 'hydrating') {
      if (budget === 'low') return "The Ordinary Hyaluronic Acid 2% + B5";
      if (budget === 'mid') return "Laneige Water Sleeping Mask";
      return "SK-II Facial Treatment Mask";
    } else {
      if (budget === 'low') return "The Ordinary Multi-Peptide Serum for Hair Density";
      if (budget === 'mid') return "Peter Thomas Roth 24K Gold Mask";
      return "La Prairie Skin Caviar Luxe Cream Mask";
    }
  }

  function getIngredientInformation(concerns: string[]) {
    const ingredients = {
      fineLines: {
        name: "Retinoids",
        description: "Vitamin A derivatives that boost collagen production and cell turnover",
        benefits: [
          "Reduce the appearance of fine lines and wrinkles",
          "Improve skin texture and tone",
          "Unclog pores and reduce breakouts"
        ]
      },
      darkSpots: {
        name: "Vitamin C",
        description: "Powerful antioxidant that brightens skin and fades hyperpigmentation",
        benefits: [
          "Fade dark spots and even out skin tone",
          "Protect against free radical damage",
          "Boost collagen synthesis for firmer skin"
        ]
      },
      firmness: {
        name: "Peptides",
        description: "Amino acid chains that signal the skin to produce more collagen",
        benefits: [
          "Improve skin elasticity and firmness",
          "Reduce the appearance of wrinkles",
          "Strengthen the skin barrier"
        ]
      },
      hydration: {
        name: "Hyaluronic Acid",
        description: "Humectant that holds up to 1000x its weight in water",
        benefits: [
          "Provide intense hydration without greasiness",
          "Plump the skin to reduce fine lines",
          "Suitable for all skin types"
        ]
      }
    };

    const validConcerns = concerns.filter(concern => 
      concern === 'fineLines' || concern === 'darkSpots' || concern === 'firmness' || concern === 'hydration'
    );
    return validConcerns.map(concern => ingredients[concern]);
  }

  function getLifestyleTips(age: number, concerns: string[]) {
    const tips = [
      "Get 7-9 hours of quality sleep for optimal skin repair",
      "Stay hydrated by drinking at least 8 glasses of water daily",
      "Eat a balanced diet rich in antioxidants, vitamins, and healthy fats",
      "Exercise regularly to promote circulation and healthy skin",
      "Manage stress through meditation, yoga, or other relaxation techniques"
    ];

    if (age >= 40) {
      tips.push("Consider collagen supplements to support skin structure");
      tips.push("Schedule regular facial treatments with a licensed esthetician");
    }

    if (concerns.includes('darkSpots')) {
      tips.push("Always wear sunscreen, even indoors near windows");
      tips.push("Consider wearing a hat and sunglasses for additional protection");
    }

    if (concerns.includes('hydration')) {
      tips.push("Use a humidifier in dry environments to maintain moisture");
      tips.push("Limit hot showers which can strip natural oils");
    }

    return tips;
  }

  const reset = useCallback(() => {
    setAge('');
    setSkinType('');
    setConcerns([]);
    setBudget('mid');
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
          <div className="text-3xl sm:text-4xl mb-2">⏳</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Anti-Aging Routine Planner</h2>
          <p className="mobile-text-sm text-gray-600">
            Create an age-appropriate skincare routine with anti-aging focus
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your age?
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your skin type?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'dry', label: 'Dry' },
                      { id: 'oily', label: 'Oily' },
                      { id: 'combination', label: 'Combination' },
                      { id: 'normal', label: 'Normal' },
                      { id: 'sensitive', label: 'Sensitive' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSkinType(type.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          skinType === type.id
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
                    What are your main anti-aging concerns?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'fineLines', label: 'Fine Lines/Wrinkles' },
                      { id: 'darkSpots', label: 'Dark Spots' },
                      { id: 'firmness', label: 'Loss of Firmness' },
                      { id: 'hydration', label: 'Dehydration' },
                      { id: 'texture', label: 'Uneven Texture' },
                      { id: 'pores', label: 'Enlarged Pores' }
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
                    What is your budget preference?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setBudget('low')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        budget === 'low'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Budget-Friendly
                    </button>
                    <button
                      onClick={() => setBudget('mid')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        budget === 'mid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Mid-Range
                    </button>
                    <button
                      onClick={() => setBudget('high')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        budget === 'high'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Luxury
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={planRoutine}
                disabled={!age || !skinType}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Create My Anti-Aging Routine
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
                Personalized Anti-Aging Routine
              </div>
              <p className="text-gray-600">
                For age {age} with {skinType} skin
              </p>
            </div>
            
            {/* Morning Routine */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">{result.routine.morning.title}</h3>
              <div className="space-y-4">
                {result.routine.morning.steps.map((step: {step: number, name: string, description: string, recommendation: string}, index: number) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mr-3">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <p className="text-sm font-medium text-blue-600 mt-1">Recommended: {step.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Evening Routine */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">{result.routine.evening.title}</h3>
              <div className="space-y-4">
                {result.routine.evening.steps.map((step: {step: number, name: string, description: string, recommendation: string}, index: number) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold mr-3">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.name}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <p className="text-sm font-medium text-green-600 mt-1">Recommended: {step.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weekly Treatments */}
            {result.routine.weekly.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Weekly Treatments</h3>
                <div className="space-y-4">
                  {result.routine.weekly.map((treatment: {name: string, frequency: string, description: string, recommendation: string}, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium text-gray-900">{treatment.name}</h4>
                      <p className="text-sm text-gray-600">Frequency: {treatment.frequency}</p>
                      <p className="text-sm text-gray-600">{treatment.description}</p>
                      <p className="text-sm font-medium text-purple-600 mt-1">Recommended: {treatment.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Key Ingredients */}
            {result.ingredientInfo.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Key Anti-Aging Ingredients</h3>
                <div className="space-y-4">
                  {result.ingredientInfo.map((ingredient, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-md">
                      <h4 className="font-bold text-blue-800">{ingredient.name}</h4>
                      <p className="text-blue-700 text-sm mt-1">{ingredient.description}</p>
                      <ul className="mt-2 space-y-1">
                        {ingredient.benefits.map((benefit: string, benefitIndex: number) => (
                          <li key={benefitIndex} className="flex items-start text-sm text-blue-700">
                            <div className="flex-shrink-0 h-4 w-4 text-blue-500 mt-0.5">✓</div>
                            <span className="ml-1">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Lifestyle Tips */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">Lifestyle Recommendations</h3>
              <ul className="space-y-2">
                {result.lifestyleTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">★</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Important Notes */}
            <div className="p-4 bg-yellow-50 rounded-md">
              <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
              <ul className="text-yellow-700 list-disc pl-5 space-y-1 text-sm">
                <li>Introduce active ingredients gradually to avoid irritation</li>
                <li>Always patch test new products before full application</li>
                <li>Be patient - it can take 6-12 weeks to see results</li>
                <li>Consult a dermatologist for persistent skin concerns</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Create New Routine
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This routine planner provides general recommendations based on 
            dermatological best practices. Individual results may vary. Always patch test new products and 
            consult with a dermatologist for personalized advice, especially when introducing active ingredients 
            like retinoids or acids.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AntiAgingRoutinePlanner;