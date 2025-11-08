'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrType, setQrType] = useState<'text' | 'url' | 'email' | 'phone' | 'wifi'>('text');
  const [size, setSize] = useState('200');
  const [qrCode, setQrCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form fields for different QR types
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiSecurity, setWifiSecurity] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  const generateQRCode = async (): Promise<void> => {
    setIsLoading(true);
    
    let qrText = '';
    
    switch (qrType) {
      case 'text':
        qrText = text;
        break;
      case 'url':
        qrText = url.startsWith('http') ? url : `https://${url}`;
        break;
      case 'email':
        qrText = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
        break;
      case 'phone':
        qrText = `tel:${phone}`;
        break;
      case 'wifi':
        qrText = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};H:false;;`;
        break;
    }

    if (!qrText.trim()) {
      setIsLoading(false);
      return;
    }

    try {
      // Using QR Server API (free service)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrText)}`;
      setQrCode(qrUrl);
    } catch (error) {
      // Error handling is done through UI feedback
    }
    
    setIsLoading(false);
  };

  const downloadQRCode = (): void => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    
    // Check if link.click() is available
    if (link.click) {
      link.click();
    } else {
      // Fallback for older browsers
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      link.dispatchEvent(event);
    }
    
    document.body.removeChild(link);
  };

  const reset = (): void => {
    setText('');
    setUrl('');
    setEmail('');
    setSubject('');
    setPhone('');
    setWifiSSID('');
    setWifiPassword('');
    setQrCode('');
  };

  const renderInputFields = () => {
    switch (qrType) {
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter any text you want to encode..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'url':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com or https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject (optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Network Name (SSID)
              </label>
              <input
                type="text"
                value={wifiSSID}
                onChange={(e) => setWifiSSID(e.target.value)}
                placeholder="MyWiFiNetwork"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                placeholder="WiFi password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Type
              </label>
              <select
                value={wifiSecurity}
                onChange={(e) => setWifiSecurity(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const isFormValid = (): boolean => {
    switch (qrType) {
      case 'text':
        return text.trim() !== '';
      case 'url':
        return url.trim() !== '';
      case 'email':
        return email.trim() !== '';
      case 'phone':
        return phone.trim() !== '';
      case 'wifi':
        return wifiSSID.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📱</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">QR Code Generator</h2>
          <p className="text-gray-600">
            Generate QR codes for text, URLs, or contact information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div>
            {/* QR Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {([
                  { value: 'text', label: 'Text', icon: '📝' },
                  { value: 'url', label: 'URL', icon: '🔗' },
                  { value: 'email', label: 'Email', icon: '📧' },
                  { value: 'phone', label: 'Phone', icon: '📞' },
                  { value: 'wifi', label: 'WiFi', icon: '📶' },
                ] as const).map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setQrType(type.value as 'text' | 'url' | 'email' | 'phone' | 'wifi')}
                    className={`p-3 rounded-lg border-2 transition-colors text-center ${
                      qrType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Input Fields */}
            <div className="mb-6">
              {renderInputFields()}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="150">150x150 px</option>
                <option value="200">200x200 px</option>
                <option value="300">300x300 px</option>
                <option value="400">400x400 px</option>
                <option value="500">500x500 px</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={generateQRCode}
                disabled={!isFormValid() || isLoading}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
              <button
                onClick={reset}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="flex flex-col items-center justify-center">
            {qrCode ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="mx-auto" style={{ width: `${size}px`, height: `${size}px` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCode}
                      alt="Generated QR Code"
                      width={Number(size)}
                      height={Number(size)}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <button
                  onClick={downloadQRCode}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Download QR Code
                </button>
              </motion.div>
            ) : (
              <div className="text-center text-gray-400">
                <div className="w-32 h-32 sm:w-48 sm:h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <div>
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">QR Code will appear here</div>
                  </div>
                </div>
                <p className="text-sm">Fill in the form and click generate</p>
              </div>
            )}
          </div>
        </div>

        {/* Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            💡 QR Code Tips
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• QR codes work best when printed at least 2cm x 2cm in size</li>
            <li>• Ensure good contrast between the QR code and background</li>
            <li>• Test your QR code with multiple devices before sharing</li>
            <li>• WiFi QR codes allow quick network connection without typing passwords</li>
            <li>• URL QR codes are great for business cards and marketing materials</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;