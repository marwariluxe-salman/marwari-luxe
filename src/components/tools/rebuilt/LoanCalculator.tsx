'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('10000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('5');
  const [termUnit, setTermUnit] = useState('years');
  const [result, setResult] = useState<{monthlyPayment: string, totalPayment: string, totalInterest: string, schedule: Array<{month: number, payment: number, principal: number, interest: number, balance: number}>} | null>(null);

  const calculateLoan = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const term = parseFloat(loanTerm);
    
    if (isNaN(principal) || isNaN(annualRate) || isNaN(term)) {
      setResult(null);
      return;
    }
    
    // Convert term to months if needed
    const months = termUnit === 'years' ? term * 12 : term;
    
    // Monthly interest rate
    const monthlyRate = annualRate / 12;
    
    // Calculate monthly payment using the loan payment formula
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);
    
    // Calculate total payment and interest
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;
    
    // Create amortization schedule (first 12 months or all months if less than 12)
    const schedule = [];
    let balance = principal;
    
    for (let i = 1; i <= Math.min(months, 12); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      schedule
    });
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  const reset = useCallback(() => {
    setLoanAmount('10000');
    setInterestRate('5');
    setLoanTerm('5');
    setTermUnit('years');
    setResult(null);
  }, []);

  // Calculate on initial load and when inputs change
  useState(() => {
    calculateLoan();
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
          <div className="text-3xl sm:text-4xl mb-2">💰</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Loan Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Calculate loan payments, interest, and amortization schedules
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount ($)
              </label>
              <input
                type="number"
                inputMode="decimal"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
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
                Loan Term
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <select
                  value={termUnit}
                  onChange={(e) => setTermUnit(e.target.value)}
                  className="w-24 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={calculateLoan}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Calculate Loan
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
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Loan Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-md">
                    <span className="text-gray-700">Monthly Payment</span>
                    <span className="font-bold text-blue-600 text-lg">${result.monthlyPayment}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Total Payment</span>
                    <span className="font-medium text-gray-900">${result.totalPayment}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Total Interest</span>
                    <span className="font-medium text-gray-900">${result.totalInterest}</span>
                  </div>
                </div>
                
                {result.schedule.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Amortization Schedule (First 12 Months)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Month</th>
                            <th className="p-2 text-right">Payment</th>
                            <th className="p-2 text-right">Principal</th>
                            <th className="p-2 text-right">Interest</th>
                            <th className="p-2 text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.schedule.map((entry: {month: number, payment: number, principal: number, interest: number, balance: number}) => (
                            <tr key={entry.month} className="border-b border-gray-200">
                              <td className="p-2">{entry.month}</td>
                              <td className="p-2 text-right">${entry.payment.toFixed(2)}</td>
                              <td className="p-2 text-right">${entry.principal.toFixed(2)}</td>
                              <td className="p-2 text-right">${entry.interest.toFixed(2)}</td>
                              <td className="p-2 text-right">${entry.balance.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-2">💰</div>
                  <p>Enter loan details to see calculations</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Enter the loan amount you're considering</li>
            <li>Input the annual interest rate offered by the lender</li>
            <li>Specify the loan term in years or months</li>
            <li>Review the monthly payment and total interest costs</li>
            <li>Check the amortization schedule to see how payments are applied</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. 
            Actual loan payments may vary based on additional fees, varying interest rates, and other factors. 
            Consult with a financial advisor or lender for precise loan calculations and terms.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanCalculator;