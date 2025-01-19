import React, { Dispatch, SetStateAction, useState } from 'react'
import LinkedIn from '../../app/assets/svgs/linkedin'
import GitHub from '../../app/assets/svgs/github'
import about from '../../public/info/about.json'
import Image from 'next/image'
import EyeOff from '@/app/assets/svgs/eyeOff'
import Eye from '@/app/assets/svgs/eye'
import { tagTypes } from '@/constants'
import { sanitize } from 'isomorphic-dompurify';
import Sagas from '@/app/assets/svgs/sagas'

interface Props {
  filters: Filter[]
  setFilters: Dispatch<SetStateAction<Filter[]>>
}
const clean = sanitize(about.position, { USE_PROFILES: { html: true }, ALLOWED_TAGS: ['className', 'a'], ADD_ATTR: ['target', 'className'] });
const Profile = (props: Props) => {

  const [github, setGithub] = useState(false)
  const [linkedIn, setLinkedIn] = useState(false)
  const [sagas, setSagas] = useState(false)

  const toggleFilter = (filter: Filter) => {
    let filters = props.filters;
    const index = filters.findIndex(f => f.name === filter.name.toLowerCase())
    filters[index].enabled = !filter.enabled;
    props.setFilters([...filters]);
  }
  const FilterComponent = ({ filter }: { filter: Filter }) => {
    if (filter.name === tagTypes.cloud) {
      return (
        <div onClick={() => toggleFilter(filter)}
          className={`bg-custom-pink-50 text-custom-pink-100 px-4 py-2 my-2 rounded-full w-fit select-none cursor-pointer flex-row flex`}>
          <span className={`${filter.enabled ? '' : 'line-through'} text-custom-pink-100 capitalize text-sm mr-1`}>
            {filter.name}
          </span>
          {filter.enabled ? (<Eye fill={'#FF31C5'} />) : (<EyeOff fill={'#FF31C5'} />)}
        </div>
      )
    } else if (filter.name === tagTypes.language) {
      return (
        <div onClick={() => toggleFilter(filter)}
          className={`bg-custom-blue-50 text-custom-blue-100 px-4 py-2 my-2 rounded-full w-fit select-none cursor-pointer flex-row flex`}>
          <span className={`${filter.enabled ? '' : 'line-through'} text-custom-blue-100 capitalize text-sm mr-1`}>
            {filter.name}
          </span>
          {filter.enabled ? (<Eye fill={'#00EEFF'} />) : (<EyeOff fill={'#00EEFF'} />)}
        </div>
      )
    }
    return
  }

  return (
    <div className=' h-2/5 pt-24 justify-between flex flex-col'>
      <div>
        <div className='flex flex-row mb-5 items-center'>
          <div>
            <Image className='rounded-2xl' src='images/profile.jpg' alt='profile' width={130} height={130} />
          </div>
          <div className='flex flex-col ml-3'>
            <span className='text-4xl font-bold'>{about.name}</span>
            <span className='text-base font-medium my-1' dangerouslySetInnerHTML={{ __html: clean }} />
            <span className='font-extralight'>{about.shortBio}</span>
          </div>
        </div>
      </div>
      <div className='flex-col flex'>
        {props.filters.map((filter) => (
          <FilterComponent key={filter.name} filter={filter} />
        ))}
      </div>
      <div className='text-sm font-light mt-5'>
        <p>
          Designed in <a className='hover:text-custom-blue-100 underline' href='https://www.figma.com/' target='_blank'>Figma</a>
          &nbsp;and developed in <a className='hover:text-custom-blue-100 underline' href="https://code.visualstudio.com/" target='_blank'>VS Code</a>.
          Frontend is built with <a className='hover:text-custom-blue-100 underline' href="https://nextjs.org/" target='_blank'>Next.js</a>
          &nbsp;and <a className='hover:text-custom-blue-100 underline' href="https://tailwindcss.com/" target='_blank'>Tailwind CSS.</a>
        </p>
        <p className='my-3'>
          Hosted using <a className='hover:text-custom-blue-100 underline' href="https://aws.amazon.com/amplify/" target='_blank'>AWS Amplify</a>
          &nbsp;and <a className='hover:text-custom-blue-100 underline' href="https://aws.amazon.com/route53/" target='_blank'>Route 53</a> built with <a className='hover:text-custom-blue-100 underline' href="https://www.terraform.io/" target='_blank'>Terraform</a>.
        </p>
        <p>
          Inspired by <a className='hover:text-custom-blue-100 underline' href="https://brittanychiang.com/" target='_blank'>brittanychiang.com</a>
        </p>
        <div className='flex flex-row mt-5'>
          <a className='mr-5 cursor-pointer' href='https://sagas.finnholland.dev/' target='_blank'
            onMouseEnter={() => setSagas(true)} onMouseLeave={() => setSagas(false)}>
            <Sagas aria-atomic={sagas} height={25} width={25} />
          </a>
          <a className='mr-5 cursor-pointer' href='https://github.com/finnholland' target='_blank' onMouseEnter={() => setGithub(true)} onMouseLeave={() => setGithub(false)}>
            <GitHub aria-atomic={github} height={25} />
          </a>
          <a className='mr-5 cursor-pointer' href='https://www.linkedin.com/in/finnholland/' target='_blank' onMouseEnter={() => setLinkedIn(true)} onMouseLeave={() => setLinkedIn(false)}>
            <LinkedIn height={25} aria-atomic={linkedIn} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Profile
