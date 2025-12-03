'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string>('');

  // Conversion factors and units
  const conversionData: Record<string, {units: Array<{value: string; label: string}>; factors: Record<string, number>}> = {
    length: {
      units: [
        { value: 'millimeter', label: 'Millimeter (mm)' },
        { value: 'centimeter', label: 'Centimeter (cm)' },
        { value: 'meter', label: 'Meter (m)' },
        { value: 'kilometer', label: 'Kilometer (km)' },
        { value: 'inch', label: 'Inch (in)' },
        { value: 'foot', label: 'Foot (ft)' },
        { value: 'yard', label: 'Yard (yd)' },
        { value: 'mile', label: 'Mile (mi)' }
      ],
      factors: {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
      }
    },
    weight: {
      units: [
        { value: 'milligram', label: 'Milligram (mg)' },
        { value: 'gram', label: 'Gram (g)' },
        { value: 'kilogram', label: 'Kilogram (kg)' },
        { value: 'tonne', label: 'Tonne (t)' },
        { value: 'ounce', label: 'Ounce (oz)' },
        { value: 'pound', label: 'Pound (lb)' },
        { value: 'stone', label: 'Stone (st)' }
      ],
      factors: {
        milligram: 0.000001,
        gram: 0.001,
        kilogram: 1,
        tonne: 1000,
        ounce: 0.0283495,
        pound: 0.453592,
        stone: 6.35029
      }
    },
    temperature: {
      units: [
        { value: 'celsius', label: 'Celsius (°C)' },
        { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
        { value: 'kelvin', label: 'Kelvin (K)' }
      ],
      // Temperature conversions are handled separately due to different formulas
      factors: {} as Record<string, number>
    },
    area: {
      units: [
        { value: 'squareMillimeter', label: 'Square Millimeter (mm²)' },
        { value: 'squareCentimeter', label: 'Square Centimeter (cm²)' },
        { value: 'squareMeter', label: 'Square Meter (m²)' },
        { value: 'hectare', label: 'Hectare (ha)' },
        { value: 'squareKilometer', label: 'Square Kilometer (km²)' },
        { value: 'squareInch', label: 'Square Inch (in²)' },
        { value: 'squareFoot', label: 'Square Foot (ft²)' },
        { value: 'acre', label: 'Acre (ac)' },
        { value: 'squareMile', label: 'Square Mile (mi²)' }
      ],
      factors: {
        squareMillimeter: 0.000001,
        squareCentimeter: 0.0001,
        squareMeter: 1,
        hectare: 10000,
        squareKilometer: 1000000,
        squareInch: 0.00064516,
        squareFoot: 0.092903,
        acre: 4046.86,
        squareMile: 2589988.11
      }
    },
    volume: {
      units: [
        { value: 'milliliter', label: 'Milliliter (mL)' },
        { value: 'liter', label: 'Liter (L)' },
        { value: 'cubicMeter', label: 'Cubic Meter (m³)' },
        { value: 'teaspoon', label: 'Teaspoon (tsp)' },
        { value: 'tablespoon', label: 'Tablespoon (tbsp)' },
        { value: 'fluidOunce', label: 'Fluid Ounce (fl oz)' },
        { value: 'cup', label: 'Cup (cup)' },
        { value: 'pint', label: 'Pint (pt)' },
        { value: 'quart', label: 'Quart (qt)' },
        { value: 'gallon', label: 'Gallon (gal)' }
      ],
      factors: {
        milliliter: 0.001,
        liter: 1,
        cubicMeter: 1000,
        teaspoon: 0.00492892,
        tablespoon: 0.0147868,
        fluidOunce: 0.0295735,
        cup: 0.24,
        pint: 0.473176,
        quart: 0.946353,
        gallon: 3.78541
      }
    },
    time: {
      units: [
        { value: 'millisecond', label: 'Millisecond (ms)' },
        { value: 'second', label: 'Second (s)' },
        { value: 'minute', label: 'Minute (min)' },
        { value: 'hour', label: 'Hour (hr)' },
        { value: 'day', label: 'Day (d)' },
        { value: 'week', label: 'Week (wk)' },
        { value: 'month', label: 'Month (approx.)' },
        { value: 'year', label: 'Year (yr)' }
      ],
      factors: {
        millisecond: 0.001,
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2628000, // Approximate (30.44 days)
        year: 31536000 // Approximate (365 days)
      }
    }
  };

  const convertUnits = useCallback(() => {
    if (!inputValue) {
      setResult('');
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('Invalid input');
      return;
    }

    // Special handling for temperature
    if (category === 'temperature') {
      let celsius: number;
      
      // Convert input to Celsius first
      if (fromUnit === 'celsius') {
        celsius = value;
      } else if (fromUnit === 'fahrenheit') {
        celsius = (value - 32) * 5/9;
      } else { // kelvin
        celsius = value - 273.15;
      }
      
      // Convert from Celsius to target unit
      if (toUnit === 'celsius') {
        setResult(celsius.toFixed(2));
      } else if (toUnit === 'fahrenheit') {
        const fahrenheit = (celsius * 9/5) + 32;
        setResult(fahrenheit.toFixed(2));
      } else { // kelvin
        const kelvin = celsius + 273.15;
        setResult(kelvin.toFixed(2));
      }
      return;
    }

    // For other categories, use standard conversion
    const factors = conversionData[category].factors;
    const baseValue = value * factors[fromUnit];
    const convertedValue = baseValue / factors[toUnit];
    
    setResult(convertedValue.toFixed(6).replace(/\.?0+$/, ''));
  }, [category, fromUnit, toUnit, inputValue]);

  const swapUnits = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }, [fromUnit, toUnit]);

  const reset = useCallback(() => {
    setInputValue('');
    setResult('');
  }, []);

  // Update conversion when inputs change
  useState(() => {
    convertUnits();
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mobile-card bg-white rounded-lg shadow-lg p-4 sm:p-6"
      >
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-2">🔄</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Unit Converter</h2>
          <p className="mobile-text-sm text-gray-600">
            Convert between different units of measurement easily
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.keys(conversionData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setFromUnit(conversionData[cat].units[0].value);
                    setToUnit(conversionData[cat].units[1]?.value || conversionData[cat].units[0].value);
                    setInputValue('');
                    setResult('');
                  }}
                  className={`py-3 rounded-md font-medium transition-colors capitalize ${
                    category === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                {conversionData[category].units.map((unit: any) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                {conversionData[category].units.map((unit: any) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Value
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a value"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result
              </label>
              <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md text-base">
                {result || '0'}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
              aria-label="Swap units"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={reset}
              className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Select a category (length, weight, temperature, etc.)</li>
            <li>Choose the units you want to convert from and to</li>
            <li>Enter a value and see the converted result instantly</li>
            <li>Use the swap button to reverse the conversion</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This unit converter provides approximate conversions for general 
            reference. For scientific or highly precise applications, please use specialized tools. 
            Temperature conversions use standard formulas, and time conversions use approximate values 
            for months and years.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnitConverter;