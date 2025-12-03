'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const FaceShapeAnalyzer = () => {
  const [measurements, setMeasurements] = useState({
    forehead: '',
    cheekbones: '',
    jaw: '',
    faceLength: ''
  });
  const [result, setResult] = useState<{faceShape: string, description: string, features: string[], makeupTips: string[], hairstyleTips: string[], measurements: {forehead: number, cheekbones: number, jaw: number, faceLength: number}, ratios: {widthRatio: string, lengthWidthRatio: string}} | null>(null);

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const analyzeFaceShape = useCallback(() => {
    const { forehead, cheekbones, jaw, faceLength } = measurements;
    
    if (!forehead || !cheekbones || !jaw || !faceLength) return;

    // Convert to numbers
    const f = parseFloat(forehead);
    const c = parseFloat(cheekbones);
    const j = parseFloat(jaw);
    const l = parseFloat(faceLength);

    // Calculate ratios
    const widthRatio = Math.max(f, c, j) / Math.min(f, c, j);
    const lengthWidthRatio = l / Math.max(f, c, j);

    // Determine face shape
    let faceShape = '';
    let description = '';
    let features: string[] = [];
    let makeupTips: string[] = [];
    let hairstyleTips: string[] = [];

    // Analyze based on measurements
    if (Math.abs(f - c) < 2 && Math.abs(c - j) < 2 && Math.abs(f - j) < 2) {
      // All widths are similar
      if (lengthWidthRatio > 1.1) {
        faceShape = 'Oblong';
        description = 'Characterized by a forehead, cheekbones, and jawline of similar widths with a longer face length.';
        features = [
          'Longer face length compared to width',
          'Forehead, cheekbones, and jaw are similar widths',
          'Straight cheek line',
          'Minimal curves'
        ];
        makeupTips = [
          'Add width with contouring on the temples and under the cheekbones',
          'Emphasize eyes with bold eyeshadow and liner',
          'Use blush to create the illusion of width',
          'Avoid center-parted hairstyles that elongate the face further'
        ];
        hairstyleTips = [
          'Opt for shoulder-length or longer styles',
          'Choose side parts to shorten the face visually',
          'Consider layered cuts that add volume to the sides',
          'Avoid straight, sleek styles that elongate the face'
        ];
      } else {
        faceShape = 'Square';
        description = 'Features a strong, angular jawline with roughly equal measurements across forehead, cheekbones, and jaw.';
        features = [
          'Strong, angular jawline',
          'Forehead, cheekbones, and jaw are similar widths',
          'Minimal curvature',
          'Defined angles'
        ];
        makeupTips = [
          'Soften angles with rounded blush application',
          'Use highlighter on the center of the forehead and chin',
          'Create softness with curved eyeliner',
          'Contour the jawline to soften sharp angles'
        ];
        hairstyleTips = [
          'Choose styles that soften angular features',
          'Opt for side parts to break up strong lines',
          'Consider soft waves or curls',
          'Avoid blunt cuts that emphasize squareness'
        ];
      }
    } else if (c > f && c > j) {
      // Cheekbones are widest
      if (j > f) {
        faceShape = 'Diamond';
        description = 'Defined by high, prominent cheekbones with a narrow forehead and jawline.';
        features = [
          'High, prominent cheekbones',
          'Narrow forehead and jawline',
          'Smallest measurements at forehead and jaw',
          'Distinctive triangular eye area'
        ];
        makeupTips = [
          'Highlight the cheekbones prominently',
          'Broaden the forehead and jawline with highlighter',
          'Use eyeshadow to draw attention upward',
          'Apply blush in a circular motion on apples of cheeks'
        ];
        hairstyleTips = [
          'Choose styles that add width to forehead and jaw',
          'Opt for side-swept bangs to broaden the forehead',
          'Consider chin-length styles to widen the jawline',
          'Avoid hairstyles that pull attention away from cheekbones'
        ];
      } else {
        faceShape = 'Heart';
        description = 'Widest at the forehead and temples, tapering to a narrow chin.';
        features = [
          'Widest at the forehead',
          'Narrow, pointed chin',
          'Cheekbones wider than the jawline',
          'Triangular shape'
        ];
        makeupTips = [
          'Minimize the forehead with contouring',
          'Add width to the jawline with highlighting',
          'Draw attention to the eyes and lips',
          'Use soft, rounded blush application'
        ];
        hairstyleTips = [
          'Choose styles that add width to the lower half of the face',
          'Opt for chin-length or longer styles',
          'Consider side-swept bangs to minimize forehead width',
          'Avoid volume at the crown which emphasizes width'
        ];
      }
    } else if (f > c && f > j) {
      // Forehead is widest
      faceShape = 'Triangle/Inverted Triangle';
      description = 'Widest at the forehead, narrowing toward the jawline.';
      features = [
        'Widest at the forehead',
        'Narrow jawline',
        'Cheekbones narrower than forehead',
        'Upside-down triangle shape'
      ];
      makeupTips = [
        'Minimize the forehead with contouring',
        'Add width to the jawline with highlighting',
        'Draw attention to the eyes and lips',
        'Use soft, rounded blush application'
      ];
      hairstyleTips = [
        'Choose styles that add width to the lower half of the face',
        'Opt for chin-length or longer styles',
        'Consider side-swept bangs to minimize forehead width',
        'Avoid volume at the crown which emphasizes width'
      ];
    } else {
      // Jaw is widest or other combinations
      if (lengthWidthRatio < 0.9) {
        faceShape = 'Round';
        description = 'Characterized by curved lines and roughly equal face length and width.';
        features = [
          'Roughly equal face length and width',
          'Curved hairline and jawline',
          'Full cheeks',
          'Soft angles'
        ];
        makeupTips = [
          'Create angles with contouring along the hairline and jawline',
          'Apply blush in an angular shape toward the ears',
          'Use darker eyeshadow to create depth',
          'Highlight the center of the forehead and chin'
        ];
        hairstyleTips = [
          'Choose styles that add height and create angles',
          'Opt for long layers or asymmetrical cuts',
          'Consider side parts to create diagonal lines',
          'Avoid blunt cuts that emphasize roundness'
        ];
      } else {
        faceShape = 'Oval';
        description = 'Considered the ideal face shape with balanced proportions and gently curved lines.';
        features = [
          'Gently curved hairline',
          'Forehead slightly wider than the jawline',
          'Balanced proportions',
          'Slightly longer than wide'
        ];
        makeupTips = [
          'Enhance natural features rather than dramatically changing them',
          'Use classic makeup techniques that flatter most face shapes',
          'Apply blush in a natural smile position',
          'Experiment with various styles since oval faces are versatile'
        ];
        hairstyleTips = [
          'Most hairstyles will flatter this face shape',
          'Experiment with different partings',
          'Consider styles that maintain balance',
          'Both straight and curly styles work well'
        ];
      }
    }

    setResult({
      faceShape,
      description,
      features,
      makeupTips,
      hairstyleTips,
      measurements: {
        forehead: f,
        cheekbones: c,
        jaw: j,
        faceLength: l
      },
      ratios: {
        widthRatio: widthRatio.toFixed(2),
        lengthWidthRatio: lengthWidthRatio.toFixed(2)
      }
    });
  }, [measurements]);

  const reset = useCallback(() => {
    setMeasurements({
      forehead: '',
      cheekbones: '',
      jaw: '',
      faceLength: ''
    });
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
          <div className="text-3xl sm:text-4xl mb-2">👤</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Face Shape Analyzer</h2>
          <p className="mobile-text-sm text-gray-600">
            Determine your face shape and get personalized makeup and hairstyle tips
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-semibold text-blue-800 mb-2">How to Measure</h3>
                  <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
                    <li>Use a flexible measuring tape or a string and ruler</li>
                    <li>Measure across your forehead at the widest point</li>
                    <li>Measure across your cheekbones at the widest point</li>
                    <li>Measure across your jawline from point to point</li>
                    <li>Measure from your hairline to the bottom of your chin</li>
                    <li>All measurements should be in the same unit (inches or centimeters)</li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Forehead Width
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={measurements.forehead}
                      onChange={(e) => handleMeasurementChange('forehead', e.target.value)}
                      placeholder="e.g., 5.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cheekbone Width
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={measurements.cheekbones}
                      onChange={(e) => handleMeasurementChange('cheekbones', e.target.value)}
                      placeholder="e.g., 6.0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jawline Width
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={measurements.jaw}
                      onChange={(e) => handleMeasurementChange('jaw', e.target.value)}
                      placeholder="e.g., 5.0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Face Length
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={measurements.faceLength}
                      onChange={(e) => handleMeasurementChange('faceLength', e.target.value)}
                      placeholder="e.g., 7.5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={analyzeFaceShape}
                disabled={!measurements.forehead || !measurements.cheekbones || !measurements.jaw || !measurements.faceLength}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Analyze My Face Shape
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
                {result.faceShape} Face Shape
              </div>
              <p className="text-gray-600">
                {result.description}
              </p>
            </div>
            
            {/* Measurements Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-gray-900 mb-2">Your Measurements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div className="text-center">
                  <div className="font-medium text-gray-900">Forehead</div>
                  <div className="text-gray-600">{result.measurements.forehead}&#34;</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">Cheekbones</div>
                  <div className="text-gray-600">{result.measurements.cheekbones}&#34;</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">Jawline</div>
                  <div className="text-gray-600">{result.measurements.jaw}&#34;</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-gray-900">Length</div>
                  <div className="text-gray-600">{result.measurements.faceLength}&#34;</div>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-500">
                Ratios - Width Variation: {result.ratios.widthRatio}, Length/Width: {result.ratios.lengthWidthRatio}
              </div>
            </div>
            
            {/* Key Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {result.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Makeup Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Makeup Tips</h3>
              <ul className="space-y-2">
                {result.makeupTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Hairstyle Tips */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Hairstyle Tips</h3>
              <ul className="space-y-2">
                {result.hairstyleTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-500 mt-0.5">✂️</div>
                    <p className="ml-2 text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Additional Notes */}
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Remember</h3>
              <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
                <li>These are guidelines - personal preference matters most</li>
                <li>Your face may have characteristics of multiple shapes</li>
                <li>Hairstyles and makeup can enhance your natural features</li>
                <li>Consult with professionals for personalized advice</li>
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
            <strong>Disclaimer:</strong> This analysis provides general guidance based on facial measurements. 
            Individual features and personal style preferences should also be considered when choosing 
            hairstyles and makeup techniques. Consult with beauty professionals for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FaceShapeAnalyzer;