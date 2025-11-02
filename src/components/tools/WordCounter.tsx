'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WordCounter = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    calculateStats(text);
  }, [text]);

  const calculateStats = (inputText: string) => {
    // Characters
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;

    // Words
    const words = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;

    // Sentences
    const sentences = inputText.trim() === '' ? 0 : inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Paragraphs
    const paragraphs = inputText.trim() === '' ? 0 : inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(words / 150);

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });
  };

  const clearText = () => {
    setText('');
  };

  const copyStats = () => {
    const statsText = `
Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading time: ${stats.readingTime} minute(s)
Speaking time: ${stats.speakingTime} minute(s)
    `.trim();

    navigator.clipboard.writeText(statsText);
  };

  const getSampleText = () => {
    const sample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`;
    setText(sample);
  };

  const statCards = [
    { label: 'Characters', value: stats.characters, icon: '🔤', color: 'text-blue-600 bg-blue-50' },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, icon: '📝', color: 'text-green-600 bg-green-50' },
    { label: 'Words', value: stats.words, icon: '📄', color: 'text-purple-600 bg-purple-50' },
    { label: 'Sentences', value: stats.sentences, icon: '✏️', color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: '📋', color: 'text-red-600 bg-red-50' },
    { label: 'Reading time (min)', value: stats.readingTime, icon: '📖', color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Speaking time (min)', value: stats.speakingTime, icon: '🎤', color: 'text-pink-600 bg-pink-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Word Counter</h2>
          <p className="text-gray-600">
            Count words, characters, and paragraphs in your text
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Text Input */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Enter your text:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={getSampleText}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Try Sample Text
                </button>
                <button
                  onClick={clearText}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-64 sm:h-80 lg:h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
            />

            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-500">
              <span>Real-time counting as you type</span>
              <button
                onClick={copyStats}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Copy Statistics
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-4 rounded-lg ${stat.color}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium opacity-75">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
              </motion.div>
            ))}

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">💡 Quick Facts</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Average reading speed: 200 words/min</li>
                <li>• Average speaking speed: 150 words/min</li>
                <li>• Characters include spaces and punctuation</li>
                <li>• Sentences are split by . ! ? marks</li>
                <li>• Paragraphs are separated by empty lines</li>
              </ul>
            </div>

            {stats.words > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📊 Text Analysis</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>Average words per sentence: {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : 0}</div>
                  <div>Average sentences per paragraph: {stats.paragraphs > 0 ? Math.round(stats.sentences / stats.paragraphs) : 0}</div>
                  <div>Average characters per word: {stats.words > 0 ? Math.round(stats.charactersNoSpaces / stats.words) : 0}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Real-time Counting</h3>
            <p className="text-sm text-gray-600">Statistics update as you type</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-900 mb-1">Copy Statistics</h3>
            <p className="text-sm text-gray-600">Export your text statistics</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 mb-1">Detailed Analysis</h3>
            <p className="text-sm text-gray-600">Comprehensive text metrics</p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Common Use Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Writing & Content</h4>
              <ul className="space-y-1">
                <li>• Blog posts and articles</li>
                <li>• Social media captions</li>
                <li>• Email newsletters</li>
                <li>• Product descriptions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Academic & Professional</h4>
              <ul className="space-y-1">
                <li>• Essays and research papers</li>
                <li>• Reports and proposals</li>
                <li>• Speeches and presentations</li>
                <li>• Character limit compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WordCounter;