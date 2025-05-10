
import { cn } from '../../lib/utils';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="hidden sm:flex items-center justify-between w-full mb-4">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mb-2",
                index <= currentStep ? "bg-blue-700" : "bg-gray-300"
              )}
            >
              {index + 1}
            </div>
            <span className={cn(
              "text-sm",
              index <= currentStep ? "text-blue-700 font-medium" : "text-gray-500"
            )}>
              {step}
            </span>
            {index < steps.length - 1 && (
              <div className={cn(
                "absolute h-1 w-16 md:w-24 lg:w-32",
                index < currentStep ? "bg-blue-700" : "bg-gray-300"
              )} 
              style={{ 
                left: `calc(${(index + 0.5) * (100 / steps.length)}%)`,
                width: `calc(${100 / steps.length}% - 2rem)`, 
                top: '1.5rem' 
              }} />
            )}
          </div>
        ))}
      </div>
      
      <div className="sm:hidden flex justify-between items-center mb-4">
        <div className="text-lg font-medium text-blue-800">Step {currentStep + 1} of {steps.length}</div>
        <div className="text-sm text-gray-600">{steps[currentStep]}</div>
      </div>
      
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-700 h-full transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
