'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ProductIngredientChecker = () => {
  const [ingredients, setIngredients] = useState('');
  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);

  const toggleConcern = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const checkIngredients = useCallback(() => {
    if (!ingredients.trim()) return;

    // Parse ingredients (split by comma or newline)
    const ingredientList = ingredients
      .split(/[,|\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Analyze ingredients
    const analysis = analyzeIngredients(ingredientList, skinType, concerns);
    
    // Get recommendations
    const recommendations = getRecommendations(analysis, skinType, concerns);

    setResult({
      analysis,
      recommendations
    });
  }, [ingredients, skinType, concerns]);

  // Helper functions
  function analyzeIngredients(ingredients: string[], skinType: string, concerns: string[]) {
    const problematicIngredients: any[] = [];
    const beneficialIngredients: any[] = [];
    const neutralIngredients: string[] = [];

    ingredients.forEach(ingredient => {
      const lowerIngredient = ingredient.toLowerCase();
      
      // Check for problematic ingredients
      const problem = getIngredientProblem(lowerIngredient, skinType, concerns);
      if (problem) {
        problematicIngredients.push({
          name: ingredient,
          problem
        });
        return;
      }
      
      // Check for beneficial ingredients
      const benefit = getIngredientBenefit(lowerIngredient, concerns);
      if (benefit) {
        beneficialIngredients.push({
          name: ingredient,
          benefit
        });
        return;
      }
      
      // Otherwise, it's neutral
      neutralIngredients.push(ingredient);
    });

    return {
      problematic: problematicIngredients,
      beneficial: beneficialIngredients,
      neutral: neutralIngredients
    };
  }

  function getIngredientProblem(ingredient: string, skinType: string, concerns: string[]) {
    // Common problematic ingredients
    if (ingredient.includes('alcohol') && !ingredient.includes('fatty alcohol')) {
      return 'Can be drying and irritating, especially for dry or sensitive skin';
    }
    
    if (ingredient.includes('sulfate') || ingredient.includes('sodium laureth sulfate') || ingredient.includes('sodium lauryl sulfate')) {
      return 'Can strip natural oils and cause irritation, particularly for sensitive skin';
    }
    
    if (ingredient.includes('fragrance') || ingredient.includes('parfum')) {
      return 'Common allergen that can cause irritation and sensitivity reactions';
    }
    
    if (ingredient.includes('synthetic dye') || /\d+-\d+-\d+/.test(ingredient)) {
      return 'Artificial colors can cause allergic reactions and skin irritation';
    }
    
    // Skin type specific issues
    if (skinType === 'sensitive' && (
      ingredient.includes('menthol') || 
      ingredient.includes('eucalyptus') || 
      ingredient.includes('camphor') ||
      ingredient.includes('peppermint')
    )) {
      return 'Can cause tingling or irritation on sensitive skin';
    }
    
    if (skinType === 'dry' && (
      ingredient.includes('clay') || 
      ingredient.includes('charcoal') || 
      ingredient.includes('isopropyl alcohol')
    )) {
      return 'Can be overly drying for dry skin types';
    }
    
    if (skinType === 'oily' && ingredient.includes('coconut oil')) {
      return 'Can clog pores and increase oiliness in acne-prone skin';
    }
    
    // Concern specific issues
    if (concerns.includes('acne') && (
      ingredient.includes('cocoa butter') || 
      ingredient.includes('shea butter') || 
      ingredient.includes('wax')
    )) {
      return 'Comedogenic ingredient that may clog pores and cause breakouts';
    }
    
    if (concerns.includes('aging') && ingredient.includes('isopropyl alcohol')) {
      return 'Can be drying and may accelerate signs of aging with long-term use';
    }
    
    return null;
  }

  function getIngredientBenefit(ingredient: string, concerns: string[]) {
    // Hydration benefits
    if (ingredient.includes('hyaluronic acid') || ingredient.includes('sodium hyaluronate')) {
      return 'Powerful humectant that holds up to 1000x its weight in water';
    }
    
    if (ingredient.includes('glycerin') || ingredient.includes('glycerol')) {
      return 'Natural humectant that draws moisture to the skin';
    }
    
    if (ingredient.includes('ceramide')) {
      return 'Helps restore the skin barrier and retain moisture';
    }
    
    // Anti-aging benefits
    if (concerns.includes('aging') && (
      ingredient.includes('retinol') || 
      ingredient.includes('vitamin a') || 
      ingredient.includes('retinyl')
    )) {
      return 'Proven anti-aging ingredient that boosts collagen production';
    }
    
    if (concerns.includes('aging') && (
      ingredient.includes('vitamin c') || 
      ingredient.includes('ascorbic acid') || 
      ingredient.includes('magnesium ascorbyl phosphate')
    )) {
      return 'Antioxidant that brightens skin and boosts collagen synthesis';
    }
    
    if (concerns.includes('aging') && (
      ingredient.includes('niacinamide') || 
      ingredient.includes('vitamin b3')
    )) {
      return 'Improves skin elasticity and reduces fine lines';
    }
    
    // Acne benefits
    if (concerns.includes('acne') && (
      ingredient.includes('salicylic acid') || 
      ingredient.includes('bha')
    )) {
      return 'BHA that exfoliates inside pores and reduces breakouts';
    }
    
    if (concerns.includes('acne') && (
      ingredient.includes('benzoyl peroxide')
    )) {
      return 'Kills acne-causing bacteria and reduces inflammation';
    }
    
    // Brightening benefits
    if (concerns.includes('darkSpots') && (
      ingredient.includes('alpha arbutin') || 
      ingredient.includes('kojic acid') || 
      ingredient.includes('azelaic acid')
    )) {
      return 'Helps fade dark spots and even out skin tone';
    }
    
    // Soothing benefits
    if (ingredient.includes('aloe vera') || ingredient.includes('centella asiatica')) {
      return 'Soothing ingredient that calms irritated skin';
    }
    
    if (ingredient.includes('niacinamide')) {
      return 'Reduces redness and strengthens the skin barrier';
    }
    
    return null;
  }

  function getRecommendations(analysis: any, skinType: string, concerns: string[]) {
    const recommendations: string[] = [];
    
    // General recommendations based on analysis
    if (analysis.problematic.length > 0) {
      recommendations.push(`Avoid or use caution with ${analysis.problematic.length} potentially problematic ingredients`);
    }
    
    if (analysis.beneficial.length > 0) {
      recommendations.push(`This product contains ${analysis.beneficial.length} beneficial ingredients for your concerns`);
    }
    
    // Skin type specific recommendations
    if (skinType === 'sensitive') {
      recommendations.push('Patch test this product before full application');
      recommendations.push('Introduce one new product at a time');
    }
    
    if (skinType === 'dry') {
      recommendations.push('Look for products with ceramides and hyaluronic acid');
      recommendations.push('Avoid products with high alcohol content');
    }
    
    if (skinType === 'oily') {
      recommendations.push('Choose non-comedogenic products');
      recommendations.push('Look for water-based formulations');
    }
    
    // Concern specific recommendations
    if (concerns.includes('acne')) {
      recommendations.push('Check that this product is non-comedogenic');
      recommendations.push('Avoid heavy oils and butters');
    }
    
    if (concerns.includes('aging')) {
      recommendations.push('Look for antioxidants like vitamin C and E');
      recommendations.push('Consider products with peptides for collagen support');
    }
    
    if (concerns.includes('darkSpots')) {
      recommendations.push('Look for brightening ingredients like niacinamide and vitamin C');
      recommendations.push('Always use sunscreen to prevent further darkening');
    }
    
    // Overall rating
    let rating = 'caution';
    let ratingText = 'Use with Caution';
    let ratingColor = 'yellow';
    
    if (analysis.problematic.length === 0 && analysis.beneficial.length > 0) {
      rating = 'good';
      ratingText = 'Good Choice';
      ratingColor = 'green';
    } else if (analysis.problematic.length > analysis.beneficial.length) {
      rating = 'avoid';
      ratingText = 'Consider Avoiding';
      ratingColor = 'red';
    }
    
    return {
      recommendations,
      rating,
      ratingText,
      ratingColor
    };
  }

  const reset = useCallback(() => {
    setIngredients('');
    setSkinType('');
    setConcerns([]);
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
          <div className="text-3xl sm:text-4xl mb-2">🔍</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Product Ingredient Checker</h2>
          <p className="mobile-text-sm text-gray-600">
            Check if beauty products contain ingredients that might irritate your skin
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter product ingredients (comma or line separated)
                  </label>
                  <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Water, Glycerin, Niacinamide, Alcohol Denat., Fragrance..."
                    rows={6}
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
                    What are your main skin concerns?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'acne', label: 'Acne/Breakouts' },
                      { id: 'aging', label: 'Signs of Aging' },
                      { id: 'dryness', label: 'Dryness/Dehydration' },
                      { id: 'darkSpots', label: 'Dark Spots' },
                      { id: 'sensitivity', label: 'Sensitivity/Irritation' },
                      { id: 'dullness', label: 'Dullness' }
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
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={checkIngredients}
                disabled={!ingredients.trim() || !skinType}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Check Ingredients
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
                result.recommendations.ratingColor === 'green' ? 'bg-green-100 text-green-800' :
                result.recommendations.ratingColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {result.recommendations.ratingText}
              </div>
              <p className="text-gray-600">
                Based on your skin type and concerns
              </p>
            </div>
            
            {/* Problematic Ingredients */}
            {result.analysis.problematic.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">⚠️ Potentially Problematic Ingredients</h3>
                <div className="space-y-3">
                  {result.analysis.problematic.map((item: any, index: number) => (
                    <div key={index} className="p-3 bg-red-50 rounded-md border border-red-200">
                      <h4 className="font-medium text-red-800">{item.name}</h4>
                      <p className="text-red-700 text-sm mt-1">{item.problem}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Beneficial Ingredients */}
            {result.analysis.beneficial.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">✅ Beneficial Ingredients</h3>
                <div className="space-y-3">
                  {result.analysis.beneficial.map((item: any, index: number) => (
                    <div key={index} className="p-3 bg-green-50 rounded-md border border-green-200">
                      <h4 className="font-medium text-green-800">{item.name}</h4>
                      <p className="text-green-700 text-sm mt-1">{item.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Neutral Ingredients */}
            {result.analysis.neutral.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">⚪ Neutral Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {result.analysis.neutral.map((ingredient: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">📋 Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* General Tips */}
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">General Tips</h3>
              <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
                <li>Always patch test new products before full application</li>
                <li>Introduce one new product at a time to identify reactions</li>
                <li>Consult a dermatologist for persistent skin concerns</li>
                <li>Less is often more - avoid overloading your skin with products</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Check Another Product
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This analysis is for informational purposes only and 
            is not a substitute for professional dermatological advice. Individual reactions to 
            ingredients can vary greatly. Always patch test new products and consult with a 
            healthcare provider for serious skin concerns.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductIngredientChecker;