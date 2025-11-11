'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { tools } from '@/data/tools';
import { Tool } from '@/types';

import dynamic from 'next/dynamic';

// Dynamically import tool components
const BMICalculator = dynamic(() => import('@/components/tools/BMICalculator'), { ssr: true });
const CalorieCalculator = dynamic(() => import('@/components/tools/CalorieCalculator'), { ssr: true });
const BasicCalculator = dynamic(() => import('@/components/tools/BasicCalculator'), { ssr: true });
const WaterIntakeCalculator = dynamic(() => import('@/components/tools/WaterIntakeCalculator'), { ssr: true });
const HeartRateZoneCalculator = dynamic(() => import('@/components/tools/HeartRateZoneCalculator'), { ssr: true });
const QRCodeGenerator = dynamic(() => import('@/components/tools/QRCodeGenerator'), { ssr: true });
const SkinTypeAnalyzer = dynamic(() => import('@/components/tools/SkinTypeAnalyzer'), { ssr: true });
const WordCounter = dynamic(() => import('@/components/tools/WordCounter'), { ssr: true });

const ToolPage = () => {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (params.id) {
      const foundTool = tools.find(t => t.id === params.id);
      setTool(foundTool || null);
    }
  }, [params.id]);

  const renderTool = () => {
    if (!tool) return null;

    switch (tool.id) {
      case 'health-tool-001': // BMI Calculator
        return <BMICalculator />;
      case 'health-tool-002': // Calorie Calculator
        return <CalorieCalculator />;
      case 'health-tool-003': // Water Intake Calculator
        return <WaterIntakeCalculator />;
      case 'health-tool-004': // Heart Rate Zone Calculator
        return <HeartRateZoneCalculator />;
      case 'beauty-tool-001': // Skin Type Analyzer
        return <SkinTypeAnalyzer />;
      case 'general-tool-001': // Basic Calculator
        return <BasicCalculator />;
      case 'general-tool-002': // QR Code Generator
        return <QRCodeGenerator />;
      case 'general-tool-004': // Word Counter
        return <WordCounter />;
      default:
        // Generic tool placeholder for tools not yet implemented
        return (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="text-6xl mb-4">{tool.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{tool.title}</h2>
              <p className="text-gray-600 mb-6">{tool.description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Tool Coming Soon!
                </h3>
                <p className="text-blue-600">
                  We&apos;re working hard to bring you this amazing tool. 
                  Check back soon for the full interactive experience!
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/tools"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Other Tools
                </Link>
                <Link
                  href="/contact"
                  className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Request This Tool
                </Link>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛠️</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600 mb-6">The tool you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/tools"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/tools"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
        >
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tools
        </Link>
        
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-blue-100 text-blue-800">
            {tool.category} Tool
          </div>
        </div>
      </div>

      {/* Tool Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderTool()}
      </div>

      {/* Related Tools */}
      <section className="mt-16 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More {tool.category} Tools
            </h2>
            <p className="text-lg text-gray-600">
              Explore other tools in the {tool.category.toLowerCase()} category
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter(t => t.category === tool.category && t.id !== tool.id)
              .slice(0, 3)
              .map((relatedTool, index) => (
                <motion.div
                  key={relatedTool.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{relatedTool.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedTool.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedTool.description}
                    </p>
                    <Link
                      href={`/tools/${relatedTool.id}`}
                      className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Use Tool
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Show all tools link if there are more than 3 */}
          {tools.filter(t => t.category === tool.category && t.id !== tool.id).length > 3 && (
            <div className="text-center mt-8">
              <Link
                href="/tools"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All {tool.category} Tools
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ToolPage;