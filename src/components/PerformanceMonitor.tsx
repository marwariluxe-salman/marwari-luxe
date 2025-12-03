'use client';

import { useEffect, useState } from 'react';

interface PerformanceData {
  navigationStart: number;
  loadEventEnd: number;
  domContentLoadedEventEnd: number;
  loadTime: number;
  domContentLoadedTime: number;
  resources: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface FirstInputEntry extends PerformanceEntry {
  processingStart: number;
}

// Use proper typing for PerformanceObserver entries
interface WindowPerformance {
  timing: {
    navigationStart: number;
    loadEventEnd: number;
    domContentLoadedEventEnd: number;
  };
  getEntriesByType: (type: string) => PerformanceEntry[];
}

const PerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run in development environment
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      // Measure Core Web Vitals
      if ('performance' in window) {
        // Measure First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {

            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Measure Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver(() => {
          // Observer callback
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Measure Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Use proper typing instead of casting to 'any'
            const layoutShiftEntry = entry as LayoutShiftEntry;
            if (!layoutShiftEntry.hadRecentInput) {
              // Process layout shift entry
            }
          }

        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Measure First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Use proper typing instead of casting to 'any'
            entry as FirstInputEntry;

          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      }

      // Measure resource loading times
      window.addEventListener('load', () => {
        setTimeout(() => {
          // Cast to our custom interface
          const perf = window.performance as unknown as WindowPerformance;
          const perfData: PerformanceData = {
            navigationStart: perf.timing.navigationStart,
            loadEventEnd: perf.timing.loadEventEnd,
            domContentLoadedEventEnd: perf.timing.domContentLoadedEventEnd,
            loadTime: (perf.timing.loadEventEnd - perf.timing.navigationStart) / 1000,
            domContentLoadedTime: (perf.timing.domContentLoadedEventEnd - perf.timing.navigationStart) / 1000,
            resources: perf.getEntriesByType('resource').length
          };
          
          setPerformanceData(perfData);

        }, 0);
      });
    };

    measurePerformance();

    // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg z-50 text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      {performanceData && (
        <div className="space-y-1">
          <div>Load Time: {performanceData.loadTime.toFixed(2)}s</div>
          <div>DOM Content Loaded: {performanceData.domContentLoadedTime.toFixed(2)}s</div>
          <div>Resources: {performanceData.resources}</div>
        </div>
      )}
      <div className="mt-2 text-gray-400">Press Ctrl+Shift+P to hide</div>
    </div>
  );
};

export default PerformanceMonitor;