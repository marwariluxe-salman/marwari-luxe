'use client';

import { motion } from 'framer-motion';

interface MobileOptimizedToolWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: string;
}

const MobileOptimizedToolWrapper = ({ 
  children, 
  title, 
  description, 
  icon 
}: MobileOptimizedToolWrapperProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 safe-area-inset-top safe-area-inset-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-optimized header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="text-4xl sm:text-5xl mb-3">{icon}</div>
          <h1 className="mobile-text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 px-4">
            {title}
          </h1>
          <p className="mobile-text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Tool content with mobile optimizations */}
        <div className="w-full">
          {children}
        </div>

        {/* Mobile-friendly back button */}
        <div className="mt-8 text-center safe-area-inset-bottom">
          <a
            href="/tools"
            className="mobile-btn inline-flex items-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileOptimizedToolWrapper;