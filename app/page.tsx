'use client'
import Image from 'next/image'
import about from './info/about.json'
import experience from './info/experience.json'
import projects from './info/projects.json'
import { useEffect, useState } from 'react'
import LinkedIn from './assets/linkedin'
import GitHub from './assets/github'

export default function Home() {

  const [github, setGithub] = useState(false)
  const [linkedIn, setLinkedIn] = useState(false)

  const Profile = () => {
    return (
      <div className='h-full pt-24'>
        <div className='flex flex-row mb-5'>
          <div>
            <Image className='rounded-2xl' src='/images/profile.jpg' alt='fromeroad' width={100} height={100} />
          </div>
          <div className='flex flex-col ml-3'>
            <span className='text-4xl font-bold'>{about.name}</span>
            <span className='text-base font-medium my-1'>{about.position}</span>
            <span className='font-extralight'>{about.shortBio}</span>
          </div>
        </div>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta consequat nibh, id finibus arcu varius ut. eget orci.</span>
        <div className=' my-20'>
          <div className='flex flex-row p-4'>
            <span className='flex flex-grow mr-8 aspect-square bg-green-400 rounded-2xl'>1</span>
            <span className='flex flex-grow aspect-square bg-green-400 rounded-2xl'>2</span>
          </div>
          <div className='flex flex-row p-4'>
            <span className='flex flex-grow mr-8 aspect-square bg-green-400 rounded-2xl'>3</span>
            <span className='flex flex-grow aspect-square bg-green-400 rounded-2xl'>4</span>
          </div>
        </div>
        <div className='text-sm font-light'>
          <p className=' mb-3'>
            Designed in <a className='hover:tag-text underline' href='https://www.figma.com/' target='_blank'>Figma</a>
            &nbsp;and developed in <a className='hover:tag-text underline' href="https://code.visualstudio.com/" target='_blank'>VS Code</a>.
            Frontend is built with <a className='hover:tag-text underline' href="https://nextjs.org/" target='_blank'>Next.js</a>
            &nbsp;and <a className='hover:tag-text underline' href="https://tailwindcss.com/" target='_blank'>Tailwind CSS.</a>
          </p>
          <p>Hosted using <a className='hover:tag-text underline' href="https://aws.amazon.com/amplify/" target='_blank'>AWS Amplify</a>
            &nbsp;and <a className='hover:tag-text underline' href="https://aws.amazon.com/route53/" target='_blank'>Route 53</a> through Terraform.</p>
          <div className='flex flex-row mt-5'>
            <a className='mr-5 cursor-pointer' onMouseEnter={() => setGithub(true)} onMouseLeave={() => setGithub(false)}>
              <GitHub fill={github ? '#00EEFF' : '#d4d4d4'}/>
            </a>
            <a className='mr-5 cursor-pointer' onMouseEnter={() => setLinkedIn(true)} onMouseLeave={() => setLinkedIn(false)}>
              <LinkedIn fill={linkedIn ? '#00EEFF' : '#d4d4d4'} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  const About = () => { 
    return (
      <div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta consequat nibh, id finibus arcu varius ut. eget orci.
        </span>
      </div>
    )
  }

  const Experience = ({ experience }: { experience: Experience }) => { 
    return (
      <div className='flex-row flex flex-shrink my-5 p-5'>
        <div className='mr-5 shrink-0 w-24'>
          <span className='font-extralight'>{experience.date}</span>
        </div>
        <div>
          <p className='font-medium mb-5'>{experience.title}</p>
          <span className='text-neutral-300'>
            {experience.roles.map((role: Role) => (
              <div className='flex flex-col mb-5'>
                <span>{role.role}</span>
                <span className='font-light'>{role.description}</span>
              </div>
            ))}
          </span>
          <div className='flex flex-shrink flex-row flex-wrap'>
            {experience.tags.map((tag) => (
              <Tag key={tag} tag={tag}/>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const Project = ({ project }: {project: Project}) => { 
    return (
      <div key={project.title} className='rounded-2xl hover:bg-sky-700 p-5 my-5 flex-row flex cursor-pointer'>
        <div className='mr-5 shrink-0'>
          <Image className='w-fit h-fit' src='/images/fromeroad.png' alt='fromeroad' width={80} height={50} />
        </div>
        <div className='flex-col flex flex-shrink'>
          <span>{project.title}</span>
          <span className='text-neutral-300 font-extralight'>{project.description}</span>
          <span>{project.imageUrl}</span>
          <div className='flex flex-shrink flex-row flex-wrap'>
          {project.tags.map((tag) => (
            <Tag key={tag} tag={tag}/>
          ))}
          </div>
        </div>
      </div>
    )
  }

  const Tag = ({ tag }: { tag: string }) => { 
    return (
      <span className='px-3 py-1 text-sm mr-1.5 mt-2 rounded-full tag tag-text'>
        {tag}
      </span>
    )
  }

  return (
    <div className='bg-blue-950 h-screen w-screen flex flex-row justify-center overflow-auto'>
      <div className='flex flex-col w-1/5'>
        <Profile />
      </div>
      <div className='flex flex-col w-1/3 pt-24 px-5'>
        <div className='flex flex-col w-full mb-8'>
          <About />
        </div>
        <div className='flex flex-col w-full mb-8'>
          {experience.map((item) => (
            <Experience key={item.title} experience={item}/>
          ))}
        </div>
        {projects.map((item) => (
          <Project key={item.title} project={item}/>
        ))}
      </div>
    </div>
  )
}