import React from 'react'
import { InputFieldProps } from '../../../Types/Type'
import { Icon } from 'lucide-react'
const InputField = ({ type, placeholder, icon: Icon, ...props} : InputFieldProps) => {
    return (
		<>
			<div className="relative mb-6">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
  </div>
  <input
    type={type}
    placeholder={placeholder}
    className="w-full max-w-xs sm:max-w-sm lg:max-w-md pl-10 sm:pl-12 pr-3 py-2 sm:py-3 bg-gray-800 bg-opacity-50 rounded-lg border 
               border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 
               text-white placeholder-gray-400 text-sm sm:text-base transition duration-200"
    {...props}
  />
</div>

		</>
      
    )
}

export default InputField