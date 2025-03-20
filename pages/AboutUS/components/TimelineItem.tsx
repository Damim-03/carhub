
import React from 'react';
import { TimelineItemProps } from '../../../Types/Type';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const TimelineItem: React.FC<TimelineItemProps> = ({ year, milestone, description }) => {
  const itemRef = React.useRef(null);

  useGSAP(() => {
    gsap.from(itemRef.current, { 
      opacity: 0, 
      x: -30, 
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: itemRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <div ref={itemRef} className="flex mb-8 last:mb-0">
      <div className="flex flex-col items-center mr-6">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {year}
        </div>
        <div className="w-1 flex-grow bg-blue-300 mt-3"></div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
