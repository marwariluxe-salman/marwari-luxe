'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [size, setSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState('M');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [downloadFormat, setDownloadFormat] = useState('png');

  const generateQRCode = useCallback(async () => {
    if (!text.trim()) return;

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorCorrection as 'L' | 'M' | 'Q' | 'H',
        color: {
          dark: foregroundColor,
          light: backgroundColor
        }
      });
      setQrCode(qrCodeDataUrl);
    } catch (_err) {
      // Error generating QR code - handled silently
    }
  }, [text, size, errorCorrection, foregroundColor, backgroundColor]);

  const downloadQRCode = useCallback(() => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qrcode.${downloadFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [qrCode, downloadFormat]);

  const reset = useCallback(() => {
    setText('');
    setQrCode('');
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
          <div className="text-3xl sm:text-4xl mb-2">📱</div>
          <h2 className="mobile-text-xl sm:text-2xl font-bold text-gray-900 mb-2">QR Code Generator</h2>
          <p className="mobile-text-sm text-gray-600">
            Generate QR codes for text, URLs, or contact information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text or URL
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com or any text"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Correction
                </label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foreground Color
                </label>
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-full h-12 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-12 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Download Format
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDownloadFormat('png')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    downloadFormat === 'png'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  PNG
                </button>
                <button
                  onClick={() => setDownloadFormat('jpeg')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    downloadFormat === 'jpeg'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  JPEG
                </button>
                <button
                  onClick={() => setDownloadFormat('webp')}
                  className={`px-4 py-2 rounded-md font-medium ${
                    downloadFormat === 'webp'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  WebP
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={generateQRCode}
                disabled={!text.trim()}
                className="mobile-btn w-full bg-blue-600 text-white py-4 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                Generate QR Code
              </button>
              <button
                onClick={reset}
                className="mobile-btn w-full px-4 py-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {qrCode ? (
              <>
                <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-center">
                    <img 
                      src={qrCode} 
                      alt="Generated QR Code" 
                      className="max-w-full h-auto"
                      width={size}
                      height={size}
                    />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                  className="mobile-btn w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Download QR Code
                </button>
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>Scan this QR code with your smartphone camera</p>
                  <p className="mt-1">to access the content</p>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-2">📱</div>
                  <p>Your QR code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">How to Use</h3>
          <ul className="text-blue-700 list-disc pl-5 space-y-1 text-sm">
            <li>Enter any text, URL, or contact information</li>
            <li>Customize the size, colors, and error correction level</li>
            <li>Click "Generate QR Code" to create your QR code</li>
            <li>Download and share your QR code with others</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 sm:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="mobile-text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> This QR code generator creates static QR codes only. 
            For dynamic QR codes that can be edited after creation, please use specialized services. 
            Ensure the content you encode complies with applicable laws and regulations.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;