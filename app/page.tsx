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
  const [section, setSection] = useState('about')

  const Profile = () => {
    return (
      <div className='h-full py-24 justify-between flex flex-col'>
        <div>
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
          <div className=' my-8'>
            <div className='flex flex-row p-4'>
              <span className='flex flex-grow mr-8 aspect-square bg-green-400 rounded-2xl'>1</span>
              <span className='flex flex-grow aspect-square bg-green-400 rounded-2xl'>2</span>
            </div>
            <div className='flex flex-row p-4'>
              <span className='flex flex-grow mr-8 aspect-square bg-green-400 rounded-2xl'>3</span>
              <span className='flex flex-grow aspect-square bg-green-400 rounded-2xl'>4</span>
            </div>
          </div>
        </div>
        <div className='text-sm font-light'>
          <p className=' mb-3'>
            Designed in <a className='hover:text-custom-blue-100 underline' href='https://www.figma.com/' target='_blank'>Figma</a>
            &nbsp;and developed in <a className='hover:text-custom-blue-100 underline' href="https://code.visualstudio.com/" target='_blank'>VS Code</a>.
            Frontend is built with <a className='hover:text-custom-blue-100 underline' href="https://nextjs.org/" target='_blank'>Next.js</a>
            &nbsp;and <a className='hover:text-custom-blue-100 underline' href="https://tailwindcss.com/" target='_blank'>Tailwind CSS.</a>
          </p>
          <p>Hosted using <a className='hover:text-custom-blue-100 underline' href="https://aws.amazon.com/amplify/" target='_blank'>AWS Amplify</a>
            &nbsp;and <a className='hover:text-custom-blue-100 underline' href="https://aws.amazon.com/route53/" target='_blank'>Route 53</a> built with Terraform.</p>
          <div className='flex flex-row mt-5'>
            <a className='mr-5 cursor-pointer' href='https://github.com/fhllnd' target='_blank' onMouseEnter={() => setGithub(true)} onMouseLeave={() => setGithub(false)}>
              <GitHub fill={github ? '#00EEFF' : '#d4d4d4'}/>
            </a>
            <a className='mr-5 cursor-pointer' href='https://www.linkedin.com/in/finnholland/' target='_blank' onMouseEnter={() => setLinkedIn(true)} onMouseLeave={() => setLinkedIn(false)}>
              <LinkedIn fill={linkedIn ? '#00EEFF' : '#d4d4d4'} />
            </a>
          </div>
        </div>
      </div>
    )
  }

  const About = () => { 
    return (
      <div className='p-5 pt-0'>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta consequat nibh, id finibus arcu varius ut. eget orci.
        </span>
      </div>
    )
  }

  const Experience = ({ experience }: { experience: Experience }) => { 
    return (
      <a key={experience.title} href={experience.companyUrl} target='_blank'
        className='flex-row flex flex-shrink my-5 p-5 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg 
        hover:bg-custom-blue-50/20 lg:hover:!opacity-100 lg:group-hover:opacity-50 rounded-2xl'>
        <div className='mr-5 shrink-0 w-24 hover:custom-blue'>
          <span className='font-extralight'>{experience.date}</span>
        </div>
        <div>
          <p className='font-medium mb-5'>{experience.title}</p>
          <span >
            {experience.roles.map((role: Role) => (
              <div key={role.role} className='flex flex-col mb-5'>
                <span>{role.role}</span>
                <span className='text-neutral-300 font-light'>{role.description}</span>
              </div>
            ))}
          </span>
          <div className='flex flex-shrink flex-row flex-wrap'>
            {experience.tags.map((tag) => (
              <Tag key={tag} tag={tag}/>
            ))}
          </div>
        </div>
      </a>
    )
  }

  const Project = ({ project }: {project: Project}) => { 
    return (
      <a key={project.title} href={project.githubUrl}
        className='cursor-pointer flex-row flex flex-shrink my-5 p-5 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg hover:bg-custom-blue-50/20 lg:hover:!opacity-100 lg:group-hover:opacity-50 rounded-2xl'>
        <div className='mr-5 shrink-0'>
          <Image className='w-fit h-fit rounded-md' src={project.imageUrl} alt='fromeroad' width={80} height={50} />
        </div>
        <div className='flex-col flex flex-shrink'>
          <span>{project.title}</span>
          <span className='text-neutral-300 font-extralight'>{project.description}</span>
          <div className='flex flex-shrink flex-row flex-wrap'>
          {project.tags.map((tag) => (
            <Tag key={tag} tag={tag}/>
          ))}
          </div>
        </div>
      </a>
    )
  }

  const Tag = ({ tag }: { tag: string }) => { 
    return (
      <span className='px-3 py-1 text-sm mr-1.5 mt-2 rounded-full bg-custom-blue-50 text-custom-blue-100'>
        {tag}
      </span>
    )
  }

  return (
    <div className='bg-blue-950 h-screen w-screen flex flex-row justify-center overflow-auto scroll-smooth'>
      <div className='flex flex-col w-1/5 sticky top-0'>
        <Profile />
      </div>
      <div className='flex flex-col w-1/3 px-5'>
        <div id='about' className='flex flex-col w-full mb-8 pt-24'>
          <About />
        </div>
        <div id='experience' className='group flex flex-col w-full mb-8 pt-14'>
          {experience.map((item) => (
            <Experience key={item.title} experience={item}/>
          ))}
        </div>
        <div id='projects' className='group flex flex-col w-full mb-8 pt-14'>
          {projects.map((item) => (
            <Project key={item.title} project={item}/>
          ))}
        </div>
      </div>
      <div className='flex flex-col flex-grow-0 sticky top-0 py-24 justify-between w-8'>
        <ul className='flex flex-col h-full'>
          <li className='flex h-1/3'>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#about'>
              <span className="nav-indicator mr-4 h-1/8 border-dashed border-sky-500 border-l-2 transition-all group-hover:h-1/2 group-hover:border-solid group-focus-visible:h-16 group-focus-visible:border-solid motion-reduce:transition-none"></span>
              <span className="nav-text text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100">About</span>
            </a>
          </li>

          <li className='flex h-1/3'>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#experience'>
              <span className="nav-indicator mr-4 h-1/8 border-dashed border-sky-500 border-l-2 transition-all group-hover:h-1/2 group-hover:border-solid group-focus-visible:h-16 group-focus-visible:border-solid motion-reduce:transition-none"></span>
              <span className="nav-text text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100">experience</span>
            </a>
          </li>
             <li className='flex h-1/3'>
            <a className='group flex items-center py-3 flex-col'
              style={{ writingMode: 'vertical-lr' }} href='#projects'>
              <span className="nav-indicator mr-4 h-1/8 border-dashed border-sky-500 border-l-2 transition-all group-hover:h-1/2 group-hover:border-solid group-focus-visible:h-16 group-focus-visible:border-solid motion-reduce:transition-none"></span>
              <span className="nav-text text-xs uppercase tracking-wides group-hover:text-custom-blue-100 group-focus-visible:text-custom-blue-100">projects</span>
            </a>
          </li>

        </ul>

          

      </div>

    </div>
  )
}