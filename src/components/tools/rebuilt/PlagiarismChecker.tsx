'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const PlagiarismChecker = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{totalSentences: number; plagiarizedSentences: number; uniqueSentences: number; similarityScore: number; sources: Array<{url: string; title: string; matchedSentences: number}>} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkPlagiarism = useCallback(async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    
    // Simulate plagiarism checking (in a real app, this would connect to an API)
    setTimeout(() => {
      // This is a simulation - in a real application, you would connect to a plagiarism detection API
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const totalSentences = sentences.length;
      
      // Generate mock results
      const plagiarizedSentences = Math.floor(Math.random() * (totalSentences * 0.3));
      const uniqueSentences = totalSentences - plagiarizedSentences;
      
      const similarityScore = Math.floor((plagiarizedSentences / totalSentences) * 100);
      
      // Mock sources (simulated)
      const sources = [];
      if (plagiarizedSentences > 0) {
        sources.push({
          url: 'https://example.com/article-1',
          title: 'Sample Article 1',
          matchedSentences: Math.floor(plagiarizedSentences * 0.4)
        });
        sources.push({
          url: 'https://example.com/article-2',
          title: 'Sample Article 2',
          matchedSentences: Math.floor(plagiarizedSentences * 0.3)
        });
        sources.push({
          url: 'https://example.com/article-3',
          title: 'Sample Article 3',
          matchedSentences: plagiarizedSentences - Math.floor(plagiarizedSentences * 0.4) - Math.floor(plagiarizedSentences * 0.3)
        });
      }
      
      setResults({
        totalSentences,
        plagiarizedSentences,
        uniqueSentences,
        similarityScore,
        sources
      });
      
      setIsLoading(false);
    }, 2000);
  }, [text]);

  const reset = useCallback(() => {
    setText('');
    setResults(null);
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
          <div className="text-3xl sm:text-4xl mb-2">📝</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Plagiarism Checker</h2>
          <p className="mobile-text-sm text-gray-600">
            Check your text for potential plagiarism against online sources
          </p>
        </div>

        {!results ? (
          <>
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter text to check for plagiarism
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your content here to check for plagiarism..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {text.length} characters
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
                <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
                  <li>Compares your text against billions of web pages</li>
                  <li>Identifies potential matches and sources</li>
                  <li>Provides similarity scores and detailed reports</li>
                  <li>Highlights potentially plagiarized content</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={checkPlagiarism}
                disabled={!text.trim() || isLoading}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {isLoading ? 'Checking for Plagiarism...' : 'Check for Plagiarism'}
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
              <div className="text-2xl font-bold text-gray-900 mb-2">
                Plagiarism Check Results
              </div>
            </div>
            
            {/* Overall Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-blue-600">{results.totalSentences}</div>
                <div className="text-sm text-blue-700">Total Sentences</div>
              </div>
              <div className="bg-red-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-red-600">{results.plagiarizedSentences}</div>
                <div className="text-sm text-red-700">Potentially Plagiarized</div>
              </div>
              <div className="bg-green-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-green-600">{results.uniqueSentences}</div>
                <div className="text-sm text-green-700">Unique Sentences</div>
              </div>
            </div>
            
            {/* Similarity Score */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Overall Similarity Score</span>
                <span className={`text-lg font-bold ${
                  results.similarityScore < 10 ? 'text-green-600' :
                  results.similarityScore < 30 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {results.similarityScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    results.similarityScore < 10 ? 'bg-green-600' :
                    results.similarityScore < 30 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`} 
                  style={{ width: `${results.similarityScore}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {results.similarityScore < 10 
                  ? 'Your content appears to be highly original' 
                  : results.similarityScore < 30 
                    ? 'Some similarities found - review suggested sources' 
                    : 'Significant similarities detected - consider revising content'}
              </div>
            </div>
            
            {/* Sources */}
            {results.sources.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Potential Sources</h3>
                <div className="space-y-3">
                  {results.sources.map((source, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                      <h4 className="font-medium text-gray-900">{source.title}</h4>
                      <p className="text-sm text-gray-600 truncate">{source.url}</p>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          {source.matchedSentences} matching sentences
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recommendations */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {results.similarityScore < 10 ? (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                      <p className="ml-2 text-gray-700">Your content is highly original. No major revisions needed.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">✓</div>
                      <p className="ml-2 text-gray-700">Consider adding citations for any factual claims.</p>
                    </li>
                  </>
                ) : results.similarityScore < 30 ? (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">•</div>
                      <p className="ml-2 text-gray-700">Review the identified sources and ensure proper attribution.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5">•</div>
                      <p className="ml-2 text-gray-700">Paraphrase content where appropriate and add citations.</p>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5">⚠️</div>
                      <p className="ml-2 text-gray-700">Significant similarities detected. Revise content thoroughly.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5">⚠️</div>
                      <p className="ml-2 text-gray-700">Ensure all borrowed ideas are properly cited.</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5">⚠️</div>
                      <p className="ml-2 text-gray-700">Consider rewriting sections entirely in your own words.</p>
                    </li>
                  </>
                )}
              </ul>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Check Another Document
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This is a demonstration tool. In a real application, this would 
            connect to a comprehensive plagiarism detection API. Results are simulated for demonstration 
            purposes only. For professional plagiarism checking, please use specialized services.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PlagiarismChecker;