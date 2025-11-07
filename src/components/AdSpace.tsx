'use client';

interface AdSpaceProps {
  size?: 'banner' | 'rectangle' | 'sidebar' | 'large';
  position?: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

const AdSpace = ({ 
  size = 'banner', 
  position = 'middle',
  className = '' 
}: AdSpaceProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'banner':
        return 'w-full h-20 sm:h-24 md:h-32 lg:h-36'; // Responsive banner
      case 'rectangle':
        return 'w-full max-w-xs h-48 sm:h-56 md:h-64 mx-auto'; // Responsive rectangle
      case 'sidebar':
        return 'w-full max-w-xs h-80 sm:h-96 lg:h-[400px]'; // Responsive sidebar
      case 'large':
        return 'w-full h-32 sm:h-40 md:h-48 lg:h-56'; // Large responsive banner
      default:
        return 'w-full h-20 sm:h-24 md:h-32';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'mb-4 sm:mb-6 md:mb-8';
      case 'middle':
        return 'my-4 sm:my-6 md:my-8';
      case 'bottom':
        return 'mt-4 sm:mt-6 md:mt-8';
      case 'sidebar':
        return 'mb-4 sm:mb-6';
      default:
        return 'my-4 sm:my-6 md:my-8';
    }
  };

  // Improved contrast colors for better accessibility
  return (
    <div
      className={`
        ${getSizeClasses()}
        ${getPositionClasses()}
        ${className}
        bg-gray-200 
        border-2 
        border-dashed 
        border-gray-400 
        rounded-lg 
        flex 
        items-center 
        justify-center 
        text-gray-700
        hover:bg-gray-100
        transition-colors
        duration-300
      `}
      role="region"
      aria-label="Advertisement space"
    >
      <div className="text-center p-2 sm:p-4">
        <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📢</div>
        <div className="text-xs sm:text-sm font-medium">Advertisement Space</div>
        <div className="text-xs text-gray-600 mt-1">
          {size.charAt(0).toUpperCase() + size.slice(1)} Ad
        </div>
      </div>
    </div>
  );
};

export default AdSpace;