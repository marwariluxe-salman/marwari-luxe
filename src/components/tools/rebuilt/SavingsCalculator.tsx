'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SavingsCalculator = () => {
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [interestRate, setInterestRate] = useState('3');
  const [savingPeriod, setSavingPeriod] = useState('10');
  const [compoundFrequency, setCompoundFrequency] = useState('monthly');
  const [result, setResult] = useState<any>(null);

  const calculateSavings = useCallback(() => {
    const principal = parseFloat(initialAmount);
    const monthlyContrib = parseFloat(monthlyContribution);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(savingPeriod);
    
    if (isNaN(principal) || isNaN(monthlyContrib) || isNaN(annualRate) || isNaN(years)) {
      setResult(null);
      return;
    }
    
    // Determine compounding periods per year
    let compoundsPerYear;
    switch (compoundFrequency) {
      case 'annually':
        compoundsPerYear = 1;
        break;
      case 'semiannually':
        compoundsPerYear = 2;
        break;
      case 'quarterly':
        compoundsPerYear = 4;
        break;
      case 'monthly':
        compoundsPerYear = 12;
        break;
      case 'daily':
        compoundsPerYear = 365;
        break;
      default:
        compoundsPerYear = 12;
    }
    
    const totalMonths = years * 12;
    const ratePerPeriod = annualRate / compoundsPerYear;
    const totalPeriods = years * compoundsPerYear;
    
    // Future value of initial amount
    const futureValueInitial = principal * Math.pow(1 + ratePerPeriod, totalPeriods);
    
    // Future value of monthly contributions (annuity formula)
    // Convert monthly contributions to periodic contributions
    const periodicContrib = monthlyContrib * (12 / compoundsPerYear);
    const futureValueContributions = periodicContrib * 
      (Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod;
    
    const totalFutureValue = futureValueInitial + futureValueContributions;
    const totalContributions = principal + (monthlyContrib * totalMonths);
    const totalInterest = totalFutureValue - totalContributions;
    
    // Calculate year-by-year growth for chart data
    const yearlyData = [];
    let currentPrincipal = principal;
    let currentContributions = principal;
    
    for (let year = 1; year <= Math.min(years, 20); year++) {
      // Add 12 months of contributions for this year
      currentContributions += monthlyContrib * 12;
      
      // Calculate future value at this year
      const periodsElapsed = year * compoundsPerYear;
      const fvInitial = principal * Math.pow(1 + ratePerPeriod, periodsElapsed);
      const fvContributions = periodicContrib * 
        (Math.pow(1 + ratePerPeriod, periodsElapsed) - 1) / ratePerPeriod;
      
      const fvTotal = fvInitial + fvContributions;
      const interestEarned = fvTotal - currentContributions;
      
      yearlyData.push({
        year,
        total: fvTotal,
        contributions: currentContributions,
        interest: interestEarned
      });
    }
    
    setResult({
      futureValue: totalFutureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      yearlyData
    });
  }, [initialAmount, monthlyContribution, interestRate, savingPeriod, compoundFrequency]);

  const reset = useCallback(() => {
    setInitialAmount('1000');
    setMonthlyContribution('100');
    setInterestRate('3');
    setSavingPeriod('10');
    setCompoundFrequency('monthly');
    setResult(null);
  }, []);

  // Calculate on initial load and when inputs change
  useState(() => {
    calculateSavings();
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
          <div className="text-3xl sm:text-4xl mb-2">🏦</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Savings Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate how your savings will grow over time with compound interest
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Amount ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saving Period (Years)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={savingPeriod}
                onChange={(e) => setSavingPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compound Frequency
              </label>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                <option value="annually">Annually</option>
                <option value="semiannually">Semi-Annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={calculateSavings}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Calculate Savings
              </button>
              <button
                onClick={reset}
                className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div>
            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Savings Projection</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                    <span className="text-gray-700">Future Value</span>
                    <span className="font-bold text-green-600 text-lg">${result.futureValue}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                    <span className="text-gray-700">Total Contributions</span>
                    <span className="font-medium text-blue-600">${result.totalContributions}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                    <span className="text-gray-700">Interest Earned</span>
                    <span className="font-medium text-purple-600">${result.totalInterest}</span>
                  </div>
                </div>
                
                {result.yearlyData.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Growth Over Time</h4>
                    <div className="h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Year</th>
                            <th className="p-2 text-right">Total</th>
                            <th className="p-2 text-right">Contributions</th>
                            <th className="p-2 text-right">Interest</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyData.map((entry: any) => (
                            <tr key={entry.year} className="border-b border-gray-200">
                              <td className="p-2">{entry.year}</td>
                              <td className="p-2 text-right">${parseFloat(entry.total).toFixed(2)}</td>
                              <td className="p-2 text-right">${parseFloat(entry.contributions).toFixed(2)}</td>
                              <td className="p-2 text-right">${parseFloat(entry.interest).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    By saving ${monthlyContribution} per month at {interestRate}% interest compounded {compoundFrequency}, 
                    your initial ${initialAmount} will grow to ${result.futureValue} in {savingPeriod} years.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-2">🏦</div>
                  <p>Enter savings details to see projections</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Savings Tips</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Start saving early to maximize compound interest benefits</li>
            <li>Increase contributions annually to keep up with inflation</li>
            <li>Consider high-yield savings accounts for better interest rates</li>
            <li>Automate savings to ensure consistency</li>
            <li>Reinvest interest earnings when possible</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates based on the information 
            you provide and assumes a constant interest rate. Actual savings growth may vary due to 
            changes in interest rates, taxes, and other factors. This is for educational purposes only 
            and not financial advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SavingsCalculator;