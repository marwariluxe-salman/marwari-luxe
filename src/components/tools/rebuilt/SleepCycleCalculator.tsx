'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const SleepCycleCalculator = () => {
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [sleepNow, setSleepNow] = useState(false);
  const [result, setResult] = useState<{
    bedTimes: { time: string; cycles: number }[];
    wakeUpTimes: { time: string; cycles: number }[];
  } | null>(null);

  const calculateSleepTimes = useCallback(() => {
    const now = new Date();
    let targetTime: Date;

    if (sleepNow) {
      // Calculate wake up times if sleeping now
      targetTime = new Date(now);
    } else if (wakeUpTime) {
      // Calculate bed times for target wake up time
      const [hours, minutes] = wakeUpTime.split(':').map(Number);
      targetTime = new Date(now);
      targetTime.setHours(hours, minutes, 0, 0);
      
      // If the time is in the past, set it for tomorrow
      if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
    } else {
      return;
    }

    if (sleepNow) {
      // Calculate wake up times for different cycle lengths
      const wakeUpTimes = [];
      for (let i = 1; i <= 6; i++) {
        const wakeUpTime = new Date(targetTime.getTime() + i * 90 * 60000); // 90 minutes per cycle
        wakeUpTimes.push({
          time: wakeUpTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cycles: i
        });
      }
      setResult({
        bedTimes: [],
        wakeUpTimes
      });
    } else {
      // Calculate bed times for target wake up time
      const bedTimes = [];
      for (let i = 1; i <= 6; i++) {
        const bedTime = new Date(targetTime.getTime() - i * 90 * 60000); // 90 minutes per cycle
        // Also subtract 15 minutes to fall asleep
        bedTime.setTime(bedTime.getTime() - 15 * 60000);
        bedTimes.push({
          time: bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          cycles: i
        });
      }
      setResult({
        bedTimes,
        wakeUpTimes: []
      });
    }
  }, [wakeUpTime, sleepNow]);

  const reset = useCallback(() => {
    setWakeUpTime('');
    setSleepNow(false);
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
          <div className="text-3xl sm:text-4xl mb-2">😴</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">Sleep Cycle Calculator</h2>
          <p className="mobile-text-sm text-gray-600">
            Find the optimal bedtime and wake-up time based on sleep cycles
          </p>
        </div>

        {/* Input Options */}
        <div className="mb-4 sm:mb-6">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setSleepNow(true)}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                sleepNow ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sleep Now
            </button>
            <button
              onClick={() => setSleepNow(false)}
              className={`flex-1 py-3 rounded-md font-medium transition-colors ${
                !sleepNow ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Set Wake Time
            </button>
          </div>
          
          {!sleepNow && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What time do you want to wake up?
              </label>
              <input
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <div className="flex flex-col gap-3 mb-4 sm:mb-6">
          <button
            onClick={calculateSleepTimes}
            disabled={!sleepNow && !wakeUpTime}
            className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Calculate Sleep Times
          </button>
          <button
            onClick={reset}
            className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t pt-6"
          >
            {result.bedTimes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Best Bedtimes</h3>
                <div className="grid grid-cols-1 gap-3">
                  {result.bedTimes.map((bedTime, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-md border ${
                        bedTime.cycles === 5 || bedTime.cycles === 6 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{bedTime.time}</div>
                          <div className="text-sm text-gray-600">Go to bed now</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{bedTime.cycles} cycles</div>
                          <div className="text-sm text-gray-600">
                            {bedTime.cycles * 1.5} hours
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                  <p>Ideal sleep requires 5-6 complete cycles (7.5-9 hours).</p>
                </div>
              </div>
            )}
            
            {result.wakeUpTimes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Wake Up Times</h3>
                <div className="grid grid-cols-1 gap-3">
                  {result.wakeUpTimes.map((wakeTime, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-md border ${
                        wakeTime.cycles === 5 || wakeTime.cycles === 6 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{wakeTime.time}</div>
                          <div className="text-sm text-gray-600">Wake up naturally</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{wakeTime.cycles} cycles</div>
                          <div className="text-sm text-gray-600">
                            {wakeTime.cycles * 1.5} hours
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                  <p>Falling asleep takes about 15 minutes. Aim for 5-6 complete cycles.</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-semibold text-blue-800 mb-2">Sleep Tips</h3>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Maintain consistent sleep/wake times, even on weekends</li>
                <li>Avoid screens 1 hour before bedtime</li>
                <li>Keep your bedroom cool, dark, and quiet</li>
                <li>Limit caffeine after 2 PM</li>
                <li>Exercise regularly but not close to bedtime</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates based on 90-minute sleep cycles. 
            Individual sleep needs vary. If you have persistent sleep issues, consult with a healthcare 
            professional or sleep specialist.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SleepCycleCalculator;