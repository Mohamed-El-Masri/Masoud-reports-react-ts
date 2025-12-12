import React from 'react';
import { cn } from '@utils/helpers';
import { Home } from 'lucide-react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', text, fullScreen = false }) => {

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated Logo Container */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className={cn(
            "rounded-full border-4 border-transparent border-t-primary-600 border-r-sand-500",
            size === 'lg' ? 'h-24 w-24' : size === 'md' ? 'h-16 w-16' : 'h-12 w-12'
          )}></div>
        </div>
        
        {/* Middle rotating ring - opposite direction */}
        <div className="absolute inset-0 animate-spin-reverse">
          <div className={cn(
            "rounded-full border-4 border-transparent border-b-primary-500 border-l-earth-600",
            size === 'lg' ? 'h-24 w-24' : size === 'md' ? 'h-16 w-16' : 'h-12 w-12'
          )}></div>
        </div>

        {/* Center Logo with pulse animation */}
        <div className={cn(
          "relative flex items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-800 shadow-lg animate-pulse-slow",
          size === 'lg' ? 'h-24 w-24' : size === 'md' ? 'h-16 w-16' : 'h-12 w-12'
        )}>
          <Home className={cn(
            "text-white animate-bounce-subtle",
            size === 'lg' ? 'h-10 w-10' : size === 'md' ? 'h-6 w-6' : 'h-4 w-4'
          )} />
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-primary-600 animate-bounce-delay-0"></div>
        <div className="h-3 w-3 rounded-full bg-sand-600 animate-bounce-delay-150"></div>
        <div className="h-3 w-3 rounded-full bg-earth-600 animate-bounce-delay-300"></div>
      </div>

      {/* Loading text with fade animation */}
      {text && (
        <p className="text-base font-medium text-gray-700 dark:text-gray-300 animate-fade-in-out">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50/95 to-sand-50/95 backdrop-blur-md dark:from-gray-950/95 dark:to-gray-900/95">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>;
};

export default Loading;

// Skeleton Loading Component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  ...props
}) => {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn('animate-shimmer bg-gray-200 dark:bg-gray-700', variants[variant], className)}
      style={{
        width: width || (variant === 'circular' ? height : '100%'),
        height: height || (variant === 'text' ? '1rem' : '100%'),
      }}
      {...props}
    />
  );
};
