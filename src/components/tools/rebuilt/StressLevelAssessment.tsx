'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const StressLevelAssessment = () => {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));
  const [result, setResult] = useState<{
    score: number;
    level: string;
    description: string;
    recommendations: string[];
  } | null>(null);

  const questions = [
    "I feel overwhelmed by my responsibilities",
    "I have trouble relaxing or unwinding",
    "I experience physical symptoms like headaches or stomach issues",
    "I feel irritable or short-tempered",
    "I have difficulty concentrating or focusing",
    "I worry excessively about future events",
    "I feel fatigued or drained even after rest",
    "I avoid social situations or withdraw from others",
    "I have trouble falling or staying asleep",
    "I feel anxious or nervous most of the time"
  ];

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateStressLevel = useCallback(() => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    
    let level: string;
    let description: string;
    let recommendations: string[];

    if (totalScore <= 15) {
      level = "Low Stress";
      description = "You're managing stress well. Keep up the good work!";
      recommendations = [
        "Continue practicing your current stress management techniques",
        "Maintain a healthy work-life balance",
        "Stay connected with supportive friends and family"
      ];
    } else if (totalScore <= 25) {
      level = "Moderate Stress";
      description = "You're experiencing moderate stress levels. Some adjustments may help.";
      recommendations = [
        "Try incorporating relaxation techniques like deep breathing or meditation",
        "Ensure you're getting adequate sleep (7-9 hours)",
        "Schedule regular breaks during demanding tasks",
        "Engage in physical activity at least 3 times per week"
      ];
    } else if (totalScore <= 35) {
      level = "High Stress";
      description = "You're experiencing significant stress. Consider making changes to reduce stress.";
      recommendations = [
        "Prioritize tasks and delegate when possible",
        "Set boundaries between work and personal time",
        "Practice mindfulness or meditation for 10-15 minutes daily",
        "Talk to a counselor or therapist about stress management strategies",
        "Consider reducing caffeine and alcohol intake"
      ];
    } else {
      level = "Severe Stress";
      description = "You're experiencing severe stress. Professional support is recommended.";
      recommendations = [
        "Seek immediate support from a mental health professional",
        "Reach out to trusted friends or family members",
        "Consider taking time off work if possible",
        "Practice grounding techniques during overwhelming moments",
        "Avoid major life decisions until stress levels decrease"
      ];
    }

    setResult({
      score: totalScore,
      level,
      description,
      recommendations
    });
  }, [answers]);

  const reset = useCallback(() => {
    setAnswers(Array(10).fill(0));
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
          <div className="text-3xl sm:text-4xl mb-2">🧘</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Stress Level Assessment</h2>
          <p className="mobile-text-sm text-gray-600">
            Evaluate your stress levels with our comprehensive assessment tool
          </p>
        </div>

        {!result ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-center mb-6">
                Over the past month, how often have you experienced the following?
              </p>
              
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="font-medium text-gray-900 mb-3">
                      {index + 1}. {question}
                    </h3>
                    
                    <div className="grid grid-cols-5 gap-2">
                      {[0, 1, 2, 3, 4].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleAnswer(index, value)}
                          className={`py-2 px-1 text-sm rounded-md transition-colors ${
                            answers[index] === value
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {value === 0 && 'Never'}
                          {value === 1 && 'Rarely'}
                          {value === 2 && 'Sometimes'}
                          {value === 3 && 'Often'}
                          {value === 4 && 'Always'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={calculateStressLevel}
                disabled={answers.some(answer => answer === 0)}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Calculate Stress Level
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
              <div className={`text-4xl font-bold mb-2 ${
                result.level === 'Low Stress' ? 'text-green-600' :
                result.level === 'Moderate Stress' ? 'text-blue-600' :
                result.level === 'High Stress' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {result.level}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                Stress Assessment Result
              </div>
              <p className="text-gray-600">
                Your stress score: {result.score}/40
              </p>
              <p className="text-gray-600 mt-2">
                {result.description}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">•</div>
                    <p className="ml-2 text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Additional Resources</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Practice deep breathing exercises (4-7-8 technique)</li>
                <li>Try progressive muscle relaxation</li>
                <li>Engage in regular physical activity</li>
                <li>Maintain a consistent sleep schedule</li>
                <li>Connect with supportive friends and family</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={reset}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Retake Assessment
              </button>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This assessment provides general information and is not a substitute 
            for professional mental health evaluation. If you&apos;re experiencing severe stress or mental health 
            concerns, please consult with a qualified healthcare provider or mental health professional.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StressLevelAssessment;