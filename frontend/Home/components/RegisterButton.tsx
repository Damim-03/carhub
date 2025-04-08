import React from 'react'
import { RegisterButtonProps } from '../../Types/Type'
import { Image } from '../components'
import { Link } from 'react-router-dom'

const RegisterButton = ({ isDisabled, btnType, containerStyles, textStyles, title, rightIcon, handleClick }: RegisterButtonProps) => {
  return (
    <Link to={'/register'}>
      <button
        disabled={isDisabled}
        type={btnType || "button"}
        className={`custom-btn ${containerStyles}`}
        onClick={handleClick}
      >
    <span className={`flex-1 ${textStyles}`}>{title}</span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
  </button>
    </Link>
    
  )
}

export default RegisterButton