import './GradientText.css';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

const GradientText = ({
  children,
  className = '',
  colors = ['#22D3C5', '#1ABEBD', '#22D3C5', '#28E0D0', '#22D3C5'],
  animationSpeed = 6,
  showBorder = false
}: GradientTextProps) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <span className={`animated-gradient-text ${className}`}>
      {showBorder && <span className="gradient-overlay" style={gradientStyle}></span>}
      <span className="text-content" style={gradientStyle}>
        {children}
      </span>
    </span>
  );
};

export default GradientText;
