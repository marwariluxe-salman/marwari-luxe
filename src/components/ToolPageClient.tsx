"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { tools } from '@/data/tools';
import { Tool } from '@/types';

import dynamic from 'next/dynamic';

// Dynamically import rebuilt tool components with explicit loading
const BMICalculator = dynamic(
  () => import('@/components/tools/rebuilt/BMICalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const CalorieCalculator = dynamic(
  () => import('@/components/tools/rebuilt/CalorieCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const BasicCalculator = dynamic(
  () => import('@/components/tools/rebuilt/BasicCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const WaterIntakeCalculator = dynamic(
  () => import('@/components/tools/rebuilt/WaterIntakeCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const HeartRateZoneCalculator = dynamic(
  () => import('@/components/tools/rebuilt/HeartRateZoneCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const QRCodeGenerator = dynamic(
  () => import('@/components/tools/rebuilt/QRCodeGenerator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const SkinTypeAnalyzer = dynamic(
  () => import('@/components/tools/rebuilt/SkinTypeAnalyzer'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const WordCounter = dynamic(
  () => import('@/components/tools/rebuilt/WordCounter'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const ProteinRequirementCalculator = dynamic(
  () => import('@/components/tools/rebuilt/ProteinRequirementCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const SleepCycleCalculator = dynamic(
  () => import('@/components/tools/rebuilt/SleepCycleCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const BodyFatPercentageCalculator = dynamic(
  () => import('@/components/tools/rebuilt/BodyFatPercentageCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const VitaminDCalculator = dynamic(
  () => import('@/components/tools/rebuilt/VitaminDCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const StressLevelAssessment = dynamic(
  () => import('@/components/tools/rebuilt/StressLevelAssessment'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const MacroCalculator = dynamic(
  () => import('@/components/tools/rebuilt/MacroCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const SkincareRoutineBuilder = dynamic(
  () => import('@/components/tools/rebuilt/SkincareRoutineBuilder'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const HairCareAnalyzer = dynamic(
  () => import('@/components/tools/rebuilt/HairCareAnalyzer'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const FoundationShadeFinder = dynamic(
  () => import('@/components/tools/rebuilt/FoundationShadeFinder'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const SPFCalculator = dynamic(
  () => import('@/components/tools/rebuilt/SPFCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const ProductIngredientChecker = dynamic(
  () => import('@/components/tools/rebuilt/ProductIngredientChecker'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const FaceShapeAnalyzer = dynamic(
  () => import('@/components/tools/rebuilt/FaceShapeAnalyzer'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const ColorPaletteGenerator = dynamic(
  () => import('@/components/tools/rebuilt/ColorPaletteGenerator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const AntiAgingRoutinePlanner = dynamic(
  () => import('@/components/tools/rebuilt/AntiAgingRoutinePlanner'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const NailHealthAnalyzer = dynamic(
  () => import('@/components/tools/rebuilt/NailHealthAnalyzer'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const PlagiarismChecker = dynamic(
  () => import('@/components/tools/rebuilt/PlagiarismChecker'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const UnitConverter = dynamic(
  () => import('@/components/tools/rebuilt/UnitConverter'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const CurrencyConverter = dynamic(
  () => import('@/components/tools/rebuilt/CurrencyConverter'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const PasswordGenerator = dynamic(
  () => import('@/components/tools/rebuilt/PasswordGenerator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const LoanCalculator = dynamic(
  () => import('@/components/tools/rebuilt/LoanCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const SavingsCalculator = dynamic(
  () => import('@/components/tools/rebuilt/SavingsCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);
const DateCalculator = dynamic(
  () => import('@/components/tools/rebuilt/DateCalculator'),
  { ssr: true, loading: () => <div>Loading...</div> }
);

const ToolPageClient = ({ tool }: { tool: Tool | null }) => {

  const renderTool = () => {
    if (!tool) return null;

    switch (tool.id) {
      // Health Tools
      case 'health-tool-001': // BMI Calculator
        return <BMICalculator />;
      case 'health-tool-002': // Calorie Calculator
        return <CalorieCalculator />;
      case 'health-tool-003': // Water Intake Calculator
        return <WaterIntakeCalculator />;
      case 'health-tool-004': // Heart Rate Zone Calculator
        return <HeartRateZoneCalculator />;
      case 'health-tool-005': // Protein Requirement Calculator
        return <ProteinRequirementCalculator />;
      case 'health-tool-006': // Sleep Cycle Calculator
        return <SleepCycleCalculator />;
      case 'health-tool-007': // Body Fat Percentage Calculator
        return <BodyFatPercentageCalculator />;
      case 'health-tool-008': // Vitamin D Calculator
        return <VitaminDCalculator />;
      case 'health-tool-009': // Stress Level Assessment
        return <StressLevelAssessment />;
      case 'health-tool-010': // Macro Calculator
        return <MacroCalculator />;
      
      // Beauty Tools
      case 'beauty-tool-001': // Skin Type Analyzer
        return <SkinTypeAnalyzer />;
      case 'beauty-tool-002': // Skincare Routine Builder
        return <SkincareRoutineBuilder />;
      case 'beauty-tool-003': // Hair Care Analyzer
        return <HairCareAnalyzer />;
      case 'beauty-tool-004': // Foundation Shade Finder
        return <FoundationShadeFinder />;
      case 'beauty-tool-005': // SPF Calculator
        return <SPFCalculator />;
      case 'beauty-tool-006': // Product Ingredient Checker
        return <ProductIngredientChecker />;
      case 'beauty-tool-007': // Face Shape Analyzer
        return <FaceShapeAnalyzer />;
      case 'beauty-tool-008': // Color Palette Generator
        return <ColorPaletteGenerator />;
      case 'beauty-tool-009': // Anti-Aging Routine Planner
        return <AntiAgingRoutinePlanner />;
      case 'beauty-tool-010': // Nail Health Analyzer
        return <NailHealthAnalyzer />;
      
      // General Tools
      case 'general-tool-001': // Basic Calculator
        return <BasicCalculator />;
      case 'general-tool-002': // QR Code Generator
        return <QRCodeGenerator />;
      case 'general-tool-003': // Plagiarism Checker
        return <PlagiarismChecker />;
      case 'general-tool-004': // Word Counter
        return <WordCounter />;
      case 'general-tool-005': // Unit Converter
        return <UnitConverter />;
      case 'general-tool-006': // Currency Converter
        return <CurrencyConverter />;
      case 'general-tool-007': // Password Generator
        return <PasswordGenerator />;
      case 'general-tool-008': // Loan Calculator
        return <LoanCalculator />;
      case 'general-tool-009': // Savings Calculator
        return <SavingsCalculator />;
      case 'general-tool-010': // Date Calculator
        return <DateCalculator />;
        
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">🛠️</div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tool Coming Soon</h1>
              <p className="text-gray-600 mb-6">This tool is currently under development.</p>
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

export default ToolPageClient;