import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Page not found</h1>
        <p className="text-gray-600 mb-6">We couldn&apos;t find the page you were looking for.</p>
        <div className="space-x-3">
          <Link href="/" className="inline-block px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">Go to home</Link>
          <Link href="/contact" className="inline-block px-5 py-2 border border-gray-200 rounded-md hover:bg-gray-100">Contact support</Link>
        </div>
      </div>
    </div>
  );
}
