'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const NailHealthAnalyzer = () => {
  const [appearance, setAppearance] = useState<string[]>([]);
  const [texture, setTexture] = useState<string[]>([]);
  const [growth, setGrowth] = useState('');
  const [habits, setHabits] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const toggleAppearance = (option: string) => {
    if (appearance.includes(option)) {
      setAppearance(appearance.filter(item => item !== option));
    } else {
      setAppearance([...appearance, option]);
    }
  };

  const toggleTexture = (option: string) => {
    if (texture.includes(option)) {
      setTexture(texture.filter(item => item !== option));
    } else {
      setTexture([...texture, option]);
    }
  };

  const toggleHabits = (option: string) => {
    if (habits.includes(option)) {
      setHabits(habits.filter(item => item !== option));
    } else {
      setHabits([...habits, option]);
    }
  };

  const analyzeNails = useCallback(() => {
    // Analyze nail health based on inputs
    const analysis = analyzeNailHealth(appearance, texture, growth, habits);
    
    // Provide recommendations
    const recommendations = getRecommendations(analysis, habits);
    
    // Offer preventive tips
    const preventiveTips = getPreventiveTips();

    setResult({
      analysis,
      recommendations,
      preventiveTips
    });
  }, [appearance, texture, growth, habits]);

  // Helper functions
  function analyzeNailHealth(appearance: string[], texture: string[], growth: string, habits: string[]) {
    const issues: any[] = [];
    const strengths: string[] = [];

    // Analyze appearance
    if (appearance.includes('discoloration')) {
      issues.push({
        issue: 'Discoloration',
        description: 'Yellow, white, or brown spots may indicate fungal infections, staining, or nutritional deficiencies',
        severity: 'moderate'
      });
    }
    
    if (appearance.includes('verticalLines')) {
      strengths.push('Vertical ridges are often normal signs of aging');
    }
    
    if (appearance.includes('horizontalLines')) {
      issues.push({
        issue: 'Horizontal Lines (Beau\'s Lines)',
        description: 'May indicate illness, injury, or nutritional deficiency',
        severity: 'moderate'
      });
    }
    
    if (appearance.includes('whiteSpots')) {
      strengths.push('White spots are usually harmless and caused by minor injuries');
    }
    
    if (appearance.includes('brittle')) {
      issues.push({
        issue: 'Brittle Nails',
        description: 'May indicate dehydration, nutritional deficiency, or overexposure to water/chemicals',
        severity: 'high'
      });
    }

    // Analyze texture
    if (texture.includes('ridged')) {
      issues.push({
        issue: 'Ridges',
        description: 'Vertical ridges are normal with aging, but horizontal ridges may indicate health issues',
        severity: 'low'
      });
    }
    
    if (texture.includes('rough')) {
      issues.push({
        issue: 'Rough Texture',
        description: 'Could be due to lack of moisture or over-filing',
        severity: 'low'
      });
    }
    
    if (texture.includes('peeling')) {
      issues.push({
        issue: 'Peeling Layers',
        description: 'May indicate trauma, chemical exposure, or nutritional deficiency',
        severity: 'moderate'
      });
    }

    // Analyze growth
    if (growth === 'slow') {
      issues.push({
        issue: 'Slow Growth',
        description: 'Normal variation, but could indicate nutritional deficiency or health issues',
        severity: 'low'
      });
    } else if (growth === 'uneven') {
      issues.push({
        issue: 'Uneven Growth',
        description: 'May indicate injury to the nail matrix or nutritional imbalance',
        severity: 'moderate'
      });
    }

    // Analyze habits
    if (habits.includes('biting')) {
      issues.push({
        issue: 'Nail Biting',
        description: 'Can lead to infections, damage to cuticles, and uneven growth',
        severity: 'high'
      });
    }
    
    if (habits.includes('harshPolishes')) {
      issues.push({
        issue: 'Harsh Polish Use',
        description: 'Frequent use of dark polishes or removers can stain and weaken nails',
        severity: 'moderate'
      });
    }
    
    if (habits.includes('cuticleRemoval')) {
      issues.push({
        issue: 'Aggressive Cuticle Care',
        description: 'Overzealous cuticle removal can lead to infection and damage',
        severity: 'moderate'
      });
    }

    // Overall health assessment
    let overallHealth = 'Good';
    let healthDescription = 'Your nails show mostly healthy characteristics';
    
    if (issues.length > 3) {
      overallHealth = 'Needs Attention';
      healthDescription = 'Several issues detected that may require changes to your nail care routine';
    } else if (issues.length > 0) {
      overallHealth = 'Fair';
      healthDescription = 'Some minor issues detected but nothing concerning';
    }

    return {
      issues,
      strengths,
      overallHealth,
      healthDescription
    };
  }

  function getRecommendations(analysis: any, habits: string[]) {
    const recommendations: string[] = [];

    // General recommendations based on issues
    if (analysis.issues.some((issue: any) => issue.severity === 'high')) {
      recommendations.push('Consult a dermatologist for persistent or severe nail issues');
    }

    // Specific recommendations
    if (analysis.issues.some((issue: any) => issue.issue === 'Brittle Nails')) {
      recommendations.push('Increase biotin intake through supplements or foods like eggs and nuts');
      recommendations.push('Use gloves when cleaning or exposed to water for long periods');
      recommendations.push('Apply cuticle oil daily to hydrate nails and cuticles');
    }

    if (analysis.issues.some((issue: any) => issue.issue === 'Discoloration')) {
      recommendations.push('Consider antifungal treatments if discoloration is accompanied by thickening');
      recommendations.push('Limit use of dark nail polishes and always use a base coat');
    }

    if (analysis.issues.some((issue: any) => issue.issue === 'Ridges')) {
      recommendations.push('Use ridge-filling base coats for smoother polish application');
      recommendations.push('Gently buff nails instead of filing aggressively');
    }

    if (habits.includes('biting')) {
      recommendations.push('Try bitter-tasting nail polish deterrents');
      recommendations.push('Identify triggers for nail biting and develop alternative habits');
    }

    if (habits.includes('harshPolishes')) {
      recommendations.push('Choose acetone-free nail polish removers');
      recommendations.push('Give your nails a break between polish applications');
    }

    if (habits.includes('cuticleRemoval')) {
      recommendations.push('Instead of cutting, gently push back cuticles after softening them');
      recommendations.push('Use cuticle removers rather than clippers for safer care');
    }

    // General health recommendations
    recommendations.push('Maintain a balanced diet rich in biotin, iron, and protein');
    recommendations.push('Stay hydrated to support overall nail health');
    recommendations.push('Take biotin supplements if recommended by a healthcare provider');

    return recommendations;
  }

  function getPreventiveTips() {
    return [
      'Keep nails clean and dry to prevent bacterial and fungal infections',
      'Trim nails regularly with clean, sharp clippers',
      'File nails in one direction to prevent splitting',
      'Moisturize hands and nails daily, especially after washing',
      'Wear gloves when cleaning or gardening to protect nails',
      'Avoid using nails as tools to prevent damage',
      'Choose nail polishes and removers free of harmful chemicals',
      'Give nails a break from polish occasionally to breathe',
      'Gently push back cuticles instead of cutting them',
      'Maintain a healthy, balanced diet for optimal nail growth'
    ];
  }

  const reset = useCallback(() => {
    setAppearance([]);
    setTexture([]);
    setGrowth('');
    setHabits([]);
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
          <div className="text-3xl sm:text-4xl mb-2">💅</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Nail Health Analyzer</h2>
          <p className="mobile-text-sm text-gray-600">
            Assess your nail health and get care recommendations
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What does your nail appearance look like?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'discoloration', label: 'Discoloration (yellow, brown, white spots)' },
                      { id: 'verticalLines', label: 'Vertical lines or ridges' },
                      { id: 'horizontalLines', label: 'Horizontal lines across nails' },
                      { id: 'whiteSpots', label: 'White spots or dots' },
                      { id: 'brittle', label: 'Brittle or cracking easily' },
                      { id: 'normal', label: 'Normal appearance' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleAppearance(option.id)}
                        className={`p-3 rounded-md font-medium transition-colors text-sm text-left ${
                          appearance.includes(option.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How does your nail texture feel?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'ridged', label: 'Ridged or grooved' },
                      { id: 'rough', label: 'Rough or sandpaper-like' },
                      { id: 'peeling', label: 'Peeling or layered' },
                      { id: 'smooth', label: 'Smooth and even' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleTexture(option.id)}
                        className={`p-3 rounded-md font-medium transition-colors text-sm text-left ${
                          texture.includes(option.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you describe your nail growth?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setGrowth('fast')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        growth === 'fast'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Fast
                    </button>
                    <button
                      onClick={() => setGrowth('average')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        growth === 'average'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Average
                    </button>
                    <button
                      onClick={() => setGrowth('slow')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        growth === 'slow'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Slow
                    </button>
                    <button
                      onClick={() => setGrowth('uneven')}
                      className={`py-3 rounded-md font-medium transition-colors col-span-1 sm:col-span-3 ${
                        growth === 'uneven'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Uneven growth among fingers
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your nail care habits?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'biting', label: 'Nail biting or picking' },
                      { id: 'harshPolishes', label: 'Frequent use of dark polishes/removers' },
                      { id: 'cuticleRemoval', label: 'Cutting or aggressively removing cuticles' },
                      { id: 'gelAcrylic', label: 'Regular gel/acrylic manicures' },
                      { id: 'moisturize', label: 'Daily moisturizing' },
                      { id: 'healthy', label: 'Generally healthy habits' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleHabits(option.id)}
                        className={`p-3 rounded-md font-medium transition-colors text-sm text-left ${
                          habits.includes(option.id)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={analyzeNails}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Analyze My Nail Health
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
              <div className={`inline-block px-4 py-2 rounded-full text-lg font-bold mb-2 ${
                result.analysis.overallHealth === 'Good' ? 'bg-green-100 text-green-800' :
                result.analysis.overallHealth === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.analysis.overallHealth} Nail Health
              </div>
              <p className="text-gray-600">
                {result.analysis.healthDescription}
              </p>
            </div>
            
            {/* Strengths */}
            {result.analysis.strengths.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">✅ Positive Signs</h3>
                <ul className="space-y-2">
                  {result.analysis.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                      <p className="ml-2 text-gray-700">{strength}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Issues */}
            {result.analysis.issues.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">⚠️ Areas for Improvement</h3>
                <div className="space-y-3">
                  {result.analysis.issues.map((issue: any, index: number) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md border ${
                        issue.severity === 'high' ? 'border-red-200 bg-red-50' :
                        issue.severity === 'moderate' ? 'border-yellow-200 bg-yellow-50' :
                        'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <h4 className="font-medium text-gray-900">{issue.issue}</h4>
                      <p className={`text-sm mt-1 ${
                        issue.severity === 'high' ? 'text-red-700' :
                        issue.severity === 'moderate' ? 'text-yellow-700' :
                        'text-gray-700'
                      }`}>
                        {issue.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Care Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Preventive Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">🛡️ Preventive Tips</h3>
              <ul className="space-y-2">
                {result.preventiveTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">★</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* When to See a Professional */}
            <div className="p-4 bg-red-50 rounded-md">
              <h3 className="font-semibold text-red-800 mb-2">When to See a Professional</h3>
              <ul className="text-red-700 list-disc pl-5 space-y-1 text-sm">
                <li>Persistent discoloration or thickening that worsens over time</li>
                <li>Painful or swollen nails or surrounding skin</li>
                <li>Nails separating from the nail bed</li>
                <li>Sudden changes in nail appearance without explanation</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Analyze Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This analysis is for informational purposes only and 
            is not a substitute for professional medical advice. Persistent or concerning nail 
            changes should be evaluated by a dermatologist or healthcare provider. Individual 
            results may vary based on overall health and underlying conditions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NailHealthAnalyzer;