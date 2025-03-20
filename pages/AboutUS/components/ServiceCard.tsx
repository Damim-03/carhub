
import React from 'react';
import { ServiceCardProps } from '../../../Types/Type';
import { 
  FaCar, 
  FaWrench, 
  FaShieldAlt, 
  FaSprayCan, 
  FaPhone, 
  FaPaintRoller // Changed from FaPaintBucket to FaPaintRoller which exists in react-icons/fa
} from 'react-icons/fa';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  const cardRef = React.useRef(null);

  useGSAP(() => {
    gsap.from(cardRef.current, { 
      opacity: 0, 
      y: 30, 
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  const getIcon = () => {
    switch (icon) {
      case 'car':
        return <FaCar size={40} className="text-blue-500" />;
      case 'wrench':
        return <FaWrench size={40} className="text-blue-500" />;
      case 'shield':
        return <FaShieldAlt size={40} className="text-blue-500" />;
      case 'sprayCan':
        return <FaSprayCan size={40} className="text-blue-500" />;
      case 'phone':
        return <FaPhone size={40} className="text-blue-500" />;
      case 'paintBucket':
        return <FaPaintRoller size={40} className="text-blue-500" />; // Updated to use FaPaintRoller
      default:
        return <FaCar size={40} className="text-blue-500" />;
    }
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2"
    >
      <div className="mb-5">{getIcon()}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default ServiceCard;
