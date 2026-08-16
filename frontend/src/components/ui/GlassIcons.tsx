import React from 'react';

export type GlassIconsItem = {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
  onClick?: () => void;
};

export type GlassIconsProps = {
  items: GlassIconsItem[];
  className?: string;
};

// FarmChain Earthy Gradients
const gradientMapping: Record<string, string> = {
  leaf: 'linear-gradient(to right bottom, var(--color-leaf-500), var(--color-leaf-700))',
  soil: 'linear-gradient(to right bottom, var(--color-soil-700), var(--color-soil-900))',
  wheat: 'linear-gradient(to right bottom, #F5D061, var(--color-wheat-400))',
  terracotta: 'linear-gradient(to right bottom, #D97E5B, var(--color-terracotta-500))',
  sky: 'linear-gradient(to right bottom, var(--color-sky-300), #7CA8C4)'
};

export const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <button 
          key={index} 
          className={`icon-btn ${item.customClass || ''}`} 
          aria-label={item.label} 
          type="button"
          onClick={item.onClick}
        >
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon text-soil-900" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label font-body font-medium text-soil-900">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
