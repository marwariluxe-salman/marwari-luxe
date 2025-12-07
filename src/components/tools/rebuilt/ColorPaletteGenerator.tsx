'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const ColorPaletteGenerator = () => {
  const [undertone, setUndertone] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [result, setResult] = useState<{palette: {description: string, bestColors: {name: string, colors: string[]}[], avoidColors: {name: string, colors: string[]}[]}, stylingTips: string[]} | null>(null);

  const generatePalette = useCallback(() => {
    if (!undertone) return;

    // Generate color palette based on characteristics
    const palette = generateColorPalette(undertone);
    
    // Provide styling tips
    const stylingTips = getStylingTips(undertone, eyeColor, hairColor);

    setResult({
      palette,
      stylingTips
    });
  }, [undertone, eyeColor, hairColor]);

  // Helper functions
  function generateColorPalette(undertone: string) {
    const palettes = {
      cool: {
        description: 'Colors with blue, pink, or purple undertones',
        bestColors: [
          { name: 'Blues', colors: ['#4A90E2', '#5DADE2', '#85C1E9', '#AED6F1'] },
          { name: 'Pinks', colors: ['#F1948A', '#F5B7B1', '#FADBD8', '#FDEDEC'] },
          { name: 'Purples', colors: ['#8E44AD', '#A569BD', '#BB8FCE', '#D2B4DE'] },
          { name: 'Greens', colors: ['#27AE60', '#58D68D', '#82E0AA', '#A9DFBF'] },
          { name: 'Neutrals', colors: ['#E5E7E9', '#D6DBDF', '#85929E', '#566573'] }
        ],
        avoidColors: [
          { name: 'Warm Oranges', colors: ['#E67E22', '#EB984E'] },
          { name: 'Golden Yellows', colors: ['#F1C40F', '#F7DC6F'] },
          { name: 'Warm Browns', colors: ['#D35400', '#E59866'] }
        ]
      },
      warm: {
        description: 'Colors with yellow, golden, or peach undertones',
        bestColors: [
          { name: 'Oranges', colors: ['#E67E22', '#EB984E', '#F0B27A', '#F5CBA7'] },
          { name: 'Yellows', colors: ['#F1C40F', '#F7DC6F', '#F9E79F', '#FCF3CF'] },
          { name: 'Corals', colors: ['#FF6B6B', '#FF8C69', '#FFA07A', '#FFD580'] },
          { name: 'Earth Tones', colors: ['#D35400', '#E59866', '#F0B27A', '#F5CBA7'] },
          { name: 'Warm Neutrals', colors: ['#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63'] }
        ],
        avoidColors: [
          { name: 'Cool Blues', colors: ['#4A90E2', '#5DADE2'] },
          { name: 'True Purples', colors: ['#8E44AD', '#A569BD'] },
          { name: 'Cool Grays', colors: ['#85929E', '#566573'] }
        ]
      },
      neutral: {
        description: 'Colors that work well with both warm and cool tones',
        bestColors: [
          { name: 'Jewel Tones', colors: ['#2980B9', '#27AE60', '#8E44AD', '#C0392B'] },
          { name: 'Classic Neutrals', colors: ['#F2F3F4', '#E5E7E9', '#CCD1D1', '#99A3A4'] },
          { name: 'Soft Pastels', colors: ['#FADBD8', '#D2B4DE', '#A9DFBF', '#AED6F1'] },
          { name: 'Rich Jewel Tones', colors: ['#1F618D', '#1E8449', '#6C3483', '#922B21'] },
          { name: 'Versatile Browns', colors: ['#6E2C00', '#9C640C', '#935116', '#9C640C'] }
        ],
        avoidColors: [
          { name: 'Harsh Neons', colors: ['#FF00FF', '#00FFFF'] },
          { name: 'Overly Bright Colors', colors: ['#FF0000', '#00FF00'] }
        ]
      }
    };

    const validUndertone = (undertone === 'cool' || undertone === 'warm' || undertone === 'neutral') ? undertone : 'cool';
    return palettes[validUndertone];
  }

  function getStylingTips(undertone: string, eyeColor: string, hairColor: string) {
    const generalTips = [
      'Test colors near your face in natural light before purchasing',
      'Consider your lifestyle and the colors you wear most often',
      'Accessories in your best colors can enhance any outfit',
      'Your best colors may vary depending on season and lighting'
    ];

    const undertoneTips = {
      cool: [
        'Silver jewelry tends to look better on you than gold',
        'Choose blue-based reds like berry or rose over orange-based reds',
        'Opt for jewel tones like sapphire, emerald, and amethyst',
        'Cool-toned makeup (blues, purples, pinks) will complement your coloring'
      ],
      warm: [
        'Gold jewelry tends to look better on you than silver',
        'Choose orange-based reds like coral or tomato over blue-based reds',
        'Opt for earth tones like olive, terracotta, and warm browns',
        'Warm-toned makeup (peaches, corals, golden browns) will complement your coloring'
      ],
      neutral: [
        'You can wear both gold and silver jewelry successfully',
        'You have flexibility with both warm and cool color palettes',
        'Focus on the intensity and saturation of colors rather than undertones',
        'Both warm and cool makeup tones can work well on you'
      ]
    };

    const eyeColorTips = {
      blue: [
        'Copper and bronze tones make blue eyes pop',
        'Warm browns and taupes complement blue eyes',
        'Avoid very pale blues that compete with your eye color'
      ],
      green: [
        'Purples and lavenders enhance green eyes',
        'Warm golds and coppers bring out green flecks',
        'Avoid very bright greens that compete with your eyes'
      ],
      brown: [
        'Jewel tones like purples and teals complement brown eyes',
        'Warm golds and caramels enhance brown eyes',
        'Earth tones create harmony with brown eyes'
      ],
      hazel: [
        'Purples and deep plums make hazel eyes stand out',
        'Gold and bronze tones bring out the green in hazel eyes',
        'Jewel tones complement the complexity of hazel eyes'
      ]
    };

    const hairColorTips = {
      blonde: [
        'Soft pastels and cool tones complement blonde hair',
        'Avoid colors that wash out your complexion',
        'Consider your skin undertone more than your hair color'
      ],
      brunette: [
        'Rich, deep colors complement brunette hair',
        'Jewel tones enhance the contrast with dark hair',
        'Warm earth tones create beautiful harmony'
      ],
      redhead: [
        'Earthy tones and jewel tones complement red hair',
        'Avoid orange tones that compete with your hair',
        'Cool tones can balance warm hair undertones'
      ],
      black: [
        'Bright, bold colors create beautiful contrast with black hair',
        'Jewel tones and neons can be stunning',
        'Classic neutrals provide sophisticated elegance'
      ]
    };

    const validUndertone = (undertone === 'cool' || undertone === 'warm' || undertone === 'neutral') ? undertone : 'cool';
    let tips = [...generalTips, ...(undertoneTips[validUndertone] || [])];
    
    if (eyeColor) {
      const validEyeColor = (eyeColor === 'blue' || eyeColor === 'green' || eyeColor === 'brown' || eyeColor === 'hazel') ? eyeColor : 'blue';
      tips = [...tips, ...(eyeColorTips[validEyeColor] || [])];
    }
    
    if (hairColor) {
      const validHairColor = (hairColor === 'blonde' || hairColor === 'brunette' || hairColor === 'redhead' || hairColor === 'black') ? hairColor : 'blonde';
      tips = [...tips, ...(hairColorTips[validHairColor] || [])];
    }

    return tips;
  }

  const reset = useCallback(() => {
    setUndertone('');
    setEyeColor('');
    setHairColor('');
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
          <div className="text-3xl sm:text-4xl mb-2">🎨</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Color Palette Generator</h2>
          <p className="mobile-text-sm text-gray-600">
            Find colors that complement your skin tone for makeup and clothing
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your undertone?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setUndertone('cool')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'cool'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cool (Pink/Red)
                    </button>
                    <button
                      onClick={() => setUndertone('warm')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'warm'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Warm (Yellow/Golden)
                    </button>
                    <button
                      onClick={() => setUndertone('neutral')}
                      className={`py-3 rounded-md font-medium transition-colors ${
                        undertone === 'neutral'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Neutral
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your eye color? (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'blue', label: 'Blue' },
                      { id: 'green', label: 'Green' },
                      { id: 'brown', label: 'Brown' },
                      { id: 'hazel', label: 'Hazel' }
                    ].map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setEyeColor(color.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          eyeColor === color.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is your hair color? (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'blonde', label: 'Blonde' },
                      { id: 'brunette', label: 'Brunette' },
                      { id: 'redhead', label: 'Red/Auburn' },
                      { id: 'black', label: 'Black' }
                    ].map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setHairColor(color.id)}
                        className={`py-3 rounded-md font-medium transition-colors text-sm ${
                          hairColor === color.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {color.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={generatePalette}
                disabled={!undertone}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Generate My Color Palette
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
                Your Color Palette
              </div>
              <p className="text-gray-600">
                {result.palette.description}
              </p>
            </div>
            
            {/* Best Colors */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Colors That Look Great On You</h3>
              <div className="space-y-4">
                {result.palette.bestColors.map((colorGroup: {name: string, colors: string[]}, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">{colorGroup.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {colorGroup.colors.map((color: string, colorIndex: number) => (
                        <div key={colorIndex} className="flex flex-col items-center">
                          <div 
                            className="w-10 h-10 rounded-md border border-gray-300" 
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-gray-600 mt-1">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Colors to Avoid */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Colors to Avoid</h3>
              <div className="space-y-4">
                {result.palette.avoidColors.map((colorGroup: {name: string, colors: string[]}, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">{colorGroup.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {colorGroup.colors.map((color: string, colorIndex: number) => (
                        <div key={colorIndex} className="flex flex-col items-center">
                          <div 
                            className="w-10 h-10 rounded-md border border-gray-300" 
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-gray-600 mt-1">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Styling Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Styling Tips</h3>
              <ul className="space-y-2">
                {result.stylingTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Testing Advice */}
            <div className="p-4 bg-yellow-50 rounded-md">
              <h3 className="font-semibold text-yellow-800 mb-2">Pro Tip</h3>
              <ul className="text-yellow-700 list-disc pl-5 space-y-1 text-sm">
                <li>Test colors near your face in natural light for the most accurate assessment</li>
                <li>Bring a friend to help you decide between similar shades</li>
                <li>Consider seasonal changes in your coloring when building your wardrobe</li>
                <li>Your best colors may change slightly with age and lifestyle factors</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Generate New Palette
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> These recommendations are based on general color theory and may not 
            perfectly match your unique coloring. Individual results may vary. Always test colors in natural 
            light and consider your personal style preferences when making fashion choices.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ColorPaletteGenerator;