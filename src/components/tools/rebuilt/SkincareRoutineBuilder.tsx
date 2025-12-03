'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SkincareRoutineBuilder = () => {
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [budget, setBudget] = useState('mid');
  const [routine, setRoutine] = useState<any>(null);

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const buildRoutine = useCallback(() => {
    if (!skinType) return;

    // Define products based on skin type and concerns
    const routineStructure: any = {
      morning: {
        title: "Morning Routine",
        steps: []
      },
      evening: {
        title: "Evening Routine",
        steps: []
      }
    };

    // Morning routine basics
    routineStructure.morning.steps.push({
      step: 1,
      name: "Cleanser",
      description: "Gentle facial cleanser appropriate for your skin type",
      recommendation: getCleanseRecommendation(skinType, budget)
    });

    if (skinType !== 'oily') {
      routineStructure.morning.steps.push({
        step: 2,
        name: "Toner",
        description: "Hydrating toner to prep skin for serums",
        recommendation: getTonerRecommendation(skinType, budget)
      });
    }

    routineStructure.morning.steps.push({
      step: skinType !== 'oily' ? 3 : 2,
      name: "Serum",
      description: "Targeted treatment for your specific concerns",
      recommendation: getSerumRecommendation(skinType, concerns, budget)
    });

    routineStructure.morning.steps.push({
      step: skinType !== 'oily' ? 4 : 3,
      name: "Moisturizer",
      description: "Daily moisturizer appropriate for your skin type",
      recommendation: getMoisturizerRecommendation(skinType, budget)
    });

    routineStructure.morning.steps.push({
      step: skinType !== 'oily' ? 5 : 4,
      name: "Sunscreen",
      description: "Broad spectrum SPF 30+ for daily protection",
      recommendation: "Any broad spectrum SPF 30+ sunscreen"
    });

    // Evening routine basics
    routineStructure.evening.steps.push({
      step: 1,
      name: "Cleanser",
      description: "Double cleanse if wearing makeup, gentle cleanser otherwise",
      recommendation: getCleanseRecommendation(skinType, budget, true)
    });

    if (skinType !== 'oily') {
      routineStructure.evening.steps.push({
        step: 2,
        name: "Toner",
        description: "Hydrating or exfoliating toner depending on needs",
        recommendation: getTonerRecommendation(skinType, budget, true)
      });
    }

    // Add treatment products based on concerns
    let treatmentStep = skinType !== 'oily' ? 3 : 2;
    
    if (concerns.includes('acne')) {
      routineStructure.evening.steps.push({
        step: treatmentStep++,
        name: "Treatment",
        description: "Spot treatment for active breakouts",
        recommendation: "Salicylic acid or benzoyl peroxide spot treatment"
      });
    }

    if (concerns.includes('aging')) {
      routineStructure.evening.steps.push({
        step: treatmentStep++,
        name: "Retinoid",
        description: "Vitamin A derivative for cell turnover",
        recommendation: getRetinoidRecommendation(budget)
      });
    }

    if (concerns.includes('darkSpots')) {
      routineStructure.evening.steps.push({
        step: treatmentStep++,
        name: "Brightening Treatment",
        description: "Vitamin C or niacinamide for hyperpigmentation",
        recommendation: "Vitamin C serum or niacinamide treatment"
      });
    }

    routineStructure.evening.steps.push({
      step: treatmentStep++,
      name: "Moisturizer",
      description: "Rich nighttime moisturizer for repair",
      recommendation: getMoisturizerRecommendation(skinType, budget, true)
    });

    // Weekly treatments
    const weeklyTreatments = [];
    
    if (concerns.includes('texture') || concerns.includes('dullness')) {
      weeklyTreatments.push({
        name: "Chemical Exfoliant",
        frequency: "1-2 times per week",
        recommendation: "Gentle AHA/BHA exfoliant"
      });
    }

    if (concerns.includes('dryness')) {
      weeklyTreatments.push({
        name: "Hydrating Mask",
        frequency: "1-2 times per week",
        recommendation: "Hyaluronic acid or ceramide mask"
      });
    }

    if (concerns.includes('oiliness')) {
      weeklyTreatments.push({
        name: "Clay Mask",
        frequency: "1 time per week",
        recommendation: "Kaolin or bentonite clay mask"
      });
    }

    setRoutine({
      ...routineStructure,
      weekly: weeklyTreatments
    });
  }, [skinType, concerns, budget]);

  // Helper functions for product recommendations
  function getCleanseRecommendation(skinType: string, budget: string, evening = false) {
    if (budget === 'low') {
      return "CeraVe Hydrating Cleanser or Cetaphil Gentle Skin Cleanser";
    } else if (budget === 'mid') {
      if (skinType === 'dry') return "La Roche-Posay Toleriane Hydrating Gentle Cleanser";
      if (skinType === 'oily') return "CeraVe Foaming Facial Cleanser";
      if (skinType === 'combination') return "CeraVe Foaming Facial Cleanser";
      return "CeraVe Hydrating Cleanser";
    } else {
      if (skinType === 'dry') return "Tatcha The Rice Wash Skin-Softening Cleanser";
      if (skinType === 'oily') return "Fresh Soy Face Cleanser";
      if (skinType === 'combination') return "Tatcha The Rice Wash Skin-Softening Cleanser";
      return "Tatcha The Rice Wash Skin-Softening Cleanser";
    }
  }

  function getTonerRecommendation(skinType: string, budget: string, evening = false) {
    if (budget === 'low') {
      return "Thayers Witch Hazel Toner";
    } else if (budget === 'mid') {
      if (skinType === 'dry') return "Paula's Choice Skin Balancing Pore-Reducing Toner";
      if (skinType === 'sensitive') return "First Aid Beauty Ultra Repair Wild Oat Hydrating Toner";
      return "Paula's Choice Skin Balancing Pore-Reducing Toner";
    } else {
      if (skinType === 'dry') return "SK-II Facial Treatment Clear Lotion";
      if (skinType === 'sensitive') return "Drunk Elephant B-Hydra Intensive Hydration Serum";
      return "SK-II Facial Treatment Clear Lotion";
    }
  }

  function getSerumRecommendation(skinType: string, concerns: string[], budget: string) {
    if (concerns.includes('hydration')) {
      if (budget === 'low') return "The Ordinary Hyaluronic Acid 2% + B5";
      if (budget === 'mid') return "SkinCeuticals Hydrating B5 Gel";
      return "Drunk Elephant B-Hydra Intensive Hydration Serum";
    }
    
    if (concerns.includes('darkSpots')) {
      if (budget === 'low') return "The Ordinary Alpha Arbutin 2% + HA";
      if (budget === 'mid') return "Paula's Choice Clinical 15% Vitamin C Booster";
      return "SkinCeuticals C E Ferulic";
    }
    
    if (concerns.includes('aging')) {
      if (budget === 'low') return "The Ordinary Granactive Retinoid 2% Emulsion";
      if (budget === 'mid') return "RoC Retinol Correxion Deep Wrinkle Night Cream";
      return "SkinMedica Retinol Complex 0.5";
    }
    
    // Default serum
    if (budget === 'low') return "The Ordinary Niacinamide 10% + Zinc 1%";
    if (budget === 'mid') return "Paula's Choice 10% Niacinamide Booster";
    return "Drunk Elephant T.L.C. Framboos Glycolic Night Serum";
  }

  function getMoisturizerRecommendation(skinType: string, budget: string, evening = false) {
    if (skinType === 'oily') {
      if (budget === 'low') return "Neutrogena Hydro Boost Water Gel";
      if (budget === 'mid') return "Clinique Moisture Surge 100H Auto-Replenishing Hydrator";
      return "Tatcha The Water Cream";
    }
    
    if (skinType === 'dry') {
      if (budget === 'low') return "CeraVe Moisturizing Cream";
      if (budget === 'mid') return "First Aid Beauty Ultra Repair Cream";
      return "La Mer The Moisturizing Soft Cream";
    }
    
    // Normal/combination skin
    if (budget === 'low') return "CeraVe Daily Moisturizing Lotion";
    if (budget === 'mid') return "Clinique Moisture Surge 100H Auto-Replenishing Hydrator";
    return "Tatcha The Silk Canvas Protective Primer";
  }

  function getRetinoidRecommendation(budget: string) {
    if (budget === 'low') return "The Ordinary Granactive Retinoid 2% Emulsion";
    if (budget === 'mid') return "Differin Gel (Adapalene 0.1%)";
    return "SkinMedica Retinol Complex 0.5";
  }

  const reset = useCallback(() => {
    setSkinType('');
    setConcerns([]);
    setBudget('mid');
    setRoutine(null);
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
          <div className="text-3xl sm:text-4xl mb-2">🧴</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Skincare Routine Builder</h2>
          <p className="mobile-text-sm text-gray-600">
            Create a personalized skincare routine based on your skin type and concerns
          </p>
        </div>

        {!routine ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your skin type?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['dry', 'oily', 'combination', 'normal', 'sensitive'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSkinType(type)}
                        className={`py-3 rounded-md font-medium transition-colors capitalize ${
                          skinType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your main skin concerns? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'acne', label: 'Acne/Breakouts' },
                      { id: 'aging', label: 'Signs of Aging' },
                      { id: 'dryness', label: 'Dryness/Dehydration' },
                      { id: 'oiliness', label: 'Oiliness/Shine' },
                      { id: 'darkSpots', label: 'Dark Spots/Hyperpigmentation' },
                      { id: 'redness', label: 'Redness/Irritation' },
                      { id: 'dullness', label: 'Dullness/Lack of Radiance' },
                      { id: 'texture', label: 'Uneven Texture' }
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
                onClick={buildRoutine}
                disabled={!skinType}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Build My Routine
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
                Personalized Skincare Routine
              </div>
              <p className="text-gray-600">
                Tailored for {skinType} skin with concerns: {concerns.join(', ') || 'None specified'}
              </p>
            </div>
            
            {/* Morning Routine */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">{routine.morning.title}</h3>
              <div className="space-y-4">
                {routine.morning.steps.map((step: any, index: number) => (
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
              <h3 className="font-semibold text-gray-900 text-lg mb-4">{routine.evening.title}</h3>
              <div className="space-y-4">
                {routine.evening.steps.map((step: any, index: number) => (
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
            {routine.weekly.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Weekly Treatments</h3>
                <div className="space-y-4">
                  {routine.weekly.map((treatment: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md">
                      <h4 className="font-medium text-gray-900">{treatment.name}</h4>
                      <p className="text-sm text-gray-600">Frequency: {treatment.frequency}</p>
                      <p className="text-sm font-medium text-purple-600 mt-1">Recommended: {treatment.recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Important Tips</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Introduce new products one at a time, waiting 2-3 weeks between additions</li>
                <li>Always patch test new products before full application</li>
                <li>Start with lower concentrations of active ingredients</li>
                <li>Consistency is key—give products 6-8 weeks to show results</li>
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
            <strong>Disclaimer:</strong> These recommendations are for informational purposes only and 
            are not a substitute for professional dermatological advice. Individual results may vary. 
            Always patch test new products and consult with a healthcare provider for serious skin concerns.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SkincareRoutineBuilder;