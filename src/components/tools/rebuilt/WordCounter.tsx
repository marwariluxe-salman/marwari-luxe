'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{wordCount: number; charactersNoSpaces: number; charactersWithSpaces: number; sentences: number; paragraphs: number; readingTime: number; speakingTime: number; longestWord: string; mostFrequentWord: string; averageWordLength: number} | null>(null);

  const analyzeText = useCallback(() => {
    if (!text.trim()) {
      setResults(null);
      return;
    }

    // Calculate statistics
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const wordCount = words.length;
    
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const charactersWithSpaces = text.length;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Calculate reading time (avg 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);
    
    // Calculate speaking time (avg 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);
    
    // Find longest word
    const longestWord = words.reduce((longest, current) => 
      current.replace(/[^\w]/g, '').length > longest.replace(/[^\w]/g, '').length 
        ? current 
        : longest, 
      ''
    ).replace(/[^\w]/g, '');
    
    // Find most frequent word (excluding common words)
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can'];
    const wordFrequency: any = {};
    
    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
      if (cleanWord && !commonWords.includes(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });
    
    const mostFrequentWord = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'N/A';
    
    setResults({
      wordCount,
      charactersNoSpaces,
      charactersWithSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      longestWord,
      mostFrequentWord,
      averageWordLength: charactersNoSpaces / Math.max(1, wordCount)
    });
  }, [text]);

  const reset = useCallback(() => {
    setText('');
    setResults(null);
  }, []);

  // Update results when text changes
  useState(() => {
    analyzeText();
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
          <div className="text-3xl sm:text-4xl mb-2">📄</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Word Counter</h2>
          <p className="mobile-text-sm text-gray-600">
            Count words, characters, and paragraphs in your text
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="mobile-btn flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Clear Text
              </button>
            </div>
          </div>
          
          <div>
            {results ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-semibold text-gray-900 mb-4 text-center">Text Statistics</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold text-blue-600">{results.wordCount}</div>
                    <div className="text-sm text-blue-700">Words</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold text-green-600">{results.charactersNoSpaces}</div>
                    <div className="text-sm text-green-700">Characters</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold text-purple-600">{results.sentences}</div>
                    <div className="text-sm text-purple-700">Sentences</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-md text-center">
                    <div className="text-2xl font-bold text-yellow-600">{results.paragraphs}</div>
                    <div className="text-sm text-yellow-700">Paragraphs</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Characters (with spaces)</span>
                    <span className="font-medium text-gray-900">{results.charactersWithSpaces}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Reading Time</span>
                    <span className="font-medium text-gray-900">
                      {results.readingTime} min{results.readingTime !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Speaking Time</span>
                    <span className="font-medium text-gray-900">
                      {results.speakingTime} min{results.speakingTime !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Longest Word</span>
                    <span className="font-medium text-gray-900">{results.longestWord}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Most Frequent Word</span>
                    <span className="font-medium text-gray-900">{results.mostFrequentWord}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="text-gray-700">Average Word Length</span>
                    <span className="font-medium text-gray-900">
                      {results.averageWordLength.toFixed(2)} chars
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-2">📄</div>
                  <p>Enter text to see statistics</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Type or paste text into the editor</li>
            <li>View real-time statistics on words, characters, and more</li>
            <li>Check estimated reading and speaking times</li>
            <li>Identify longest and most frequent words</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This word counter provides approximate statistics for general 
            reference. Reading and speaking times are estimates based on average speeds and may vary 
            depending on content complexity and individual reading habits.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WordCounter;