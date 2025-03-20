
import React from 'react';
import { SectionHeaderProps } from '../../../Types/Type';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const sectionRef = React.useRef(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, { 
      opacity: 0, 
      y: 50, 
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <div ref={sectionRef} className="text-center max-w-3xl mx-auto px-4 mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
