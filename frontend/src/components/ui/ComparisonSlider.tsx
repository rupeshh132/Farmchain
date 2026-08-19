import React, { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import MaskedHeading from './MaskedHeading';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Traditional Farming',
  afterLabel = 'FarmChain AI'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
        <MaskedHeading 
          text="See the Difference" 
          src="/farm_traditional.jpg" 
          className="text-3xl sm:text-4xl md:text-6xl font-heading mb-3 md:mb-4 font-bold max-w-4xl"
          parallax={30}
          fillScale={1.5}
        />
        <p className="text-base sm:text-xl text-white/80 font-body max-w-2xl mx-auto leading-relaxed">
          Drag the slider to see how FarmChain's precision AI reveals the hidden potential in your fields.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-soil-200 rounded-2xl overflow-hidden cursor-ew-resize shadow-2xl group select-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Background (Before) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={beforeImage} 
            alt="Before" 
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <div className="absolute top-6 right-6 bg-soil-900/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <span className="text-white font-heading font-medium tracking-wide uppercase text-sm">{beforeLabel}</span>
          </div>
        </div>

        {/* Foreground (After) */}
        <div 
          className="absolute inset-0 w-full h-full border-r-2 border-white/50"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src={afterImage} 
            alt="After" 
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <div className="absolute top-6 left-6 bg-primary/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
            <span className="text-white font-heading font-medium tracking-wide uppercase text-sm">{afterLabel}</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-sm z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-transform group-hover:scale-110 text-primary">
            <GripVertical size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
