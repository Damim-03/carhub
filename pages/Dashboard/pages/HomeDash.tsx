import React, { useEffect } from 'react'
import { BrowserRouter, Router, Routes } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

const HomeDash = () => {
  return (
    <div>
        <BrowserRouter>
            <div className='flex relative dark:bg-main-dark-bg'>
                <div 
                    className='fixed right-4 bottom-4'
                    style={{ zIndex: "1000"}}
                >
                    <TooltipComponent content={'Settings'} position={'Top'}>
                        <button>
                          <FiSettings size={24} />
                        </button>
                    </TooltipComponent>
                </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default HomeDash