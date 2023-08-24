import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  section: string
  setSection: Dispatch<SetStateAction<string>>
}

const NavMenu = (props: Props) => {
  return (
      <div className='flex flex-col flex-grow-0 sticky top-0 py-24 justify-between w-8'>
        <ul className='flex flex-col h-full justify-between'>
          <li onClick={() => props.setSection('about')} className={`${props.section === 'about' ? 'active h-3/4' : 'hover:h-1/2'} flex h-1/6 hover:h-3/4 transition-all`}>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#about'>
              <span className={`${props.section === 'about' ? 'border-solid' : 'border-dashed'} mr-4 border-sky-500 border-l-2 transition-all h-full group-hover:border-solid group-focus-visible:h-16 motion-reduce:transition-none`}></span>
              <span className={`${props.section === 'about' ? 'text-custom-blue-100' : ''} text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100`}>about</span>
            </a>
          </li>
          <li onClick={() => props.setSection('experience')} className={`${props.section === 'experience' ? 'active h-3/4' : 'hover:h-1/2'} flex h-1/6 hover:h-3/4 transition-all`}>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#experience'>
              <span className={`${props.section === 'experience' ? 'border-solid' : 'border-dashed'} mr-4 border-sky-500 border-l-2 transition-all h-full group-hover:border-solid group-focus-visible:h-16 motion-reduce:transition-none`}></span>
              <span className={`${props.section === 'experience' ? 'text-custom-blue-100' : ''} text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100`}>experience</span>
            </a>
          </li>
          <li onClick={() => props.setSection('projects')} className={`${props.section === 'projects' ? 'active h-3/4' : 'hover:h-1/2'} flex h-1/6 hover:h-3/4 transition-all`}>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#projects'>
              <span className={`${props.section === 'projects' ? 'border-solid' : 'border-dashed'} mr-4 border-sky-500 border-l-2 transition-all h-full group-hover:border-solid group-focus-visible:h-16 motion-reduce:transition-none`}></span>
              <span className={`${props.section === 'projects' ? 'text-custom-blue-100' : ''} text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100`}>projects</span>
            </a>
          </li>
        </ul>
      </div>
  )
}

export default NavMenu
