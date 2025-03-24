
import React from 'react';
import { TeamMemberProps } from '../../../Types/Type';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  const memberRef = React.useRef(null);

  useGSAP(() => {
    gsap.from(memberRef.current, { 
      opacity: 0, 
      y: 30, 
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: memberRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  // Default placeholder image if image is not available
  const defaultImage = "https://via.placeholder.com/400x500";

  return (
    <div 
      ref={memberRef}
      className="flex flex-col group"
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={image || defaultImage} 
          alt={name} 
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-blue-300">{role}</p>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{name}</h3>
      <p className="text-blue-500 font-medium mb-3">{role}</p>
      <p className="text-gray-600 dark:text-gray-300">{bio}</p>
    </div>
  );
};

export default TeamMember;
