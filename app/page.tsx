'use client'
import Image from 'next/image'
import experience from './info/experience.json'
import projects from './info/projects.json'
import React, { useEffect, useState } from 'react'
import { NavMenu, Profile } from '@/components'

export enum TAG_ENUM {
  LANGAUGES = "Languages & Frameworks",
  CLOUD_SERVICES = "Cloud Services"
};

export default function Home() {

  const [section, setSection] = useState('about')
  const [filters, setFilters] = useState<Filter[]>([])
  const scrollRef = React.createRef<HTMLDivElement>();

  const [aboutHeight, setAboutHeight] = useState(0)
  const [experienceHeight, setExperienceHeight] = useState(0)
  const [projectsHeight, setProjectsHeight] = useState(0)
  const aboutRef = React.createRef<HTMLDivElement>();
  const experienceRef = React.createRef<HTMLDivElement>();
  const projectsRef = React.createRef<HTMLDivElement>();

  const controlNavbar = () => {
    if (scrollRef.current) { 
      console.log(scrollRef.current.scrollTop)
      const position = scrollRef.current.scrollTop
      if (position >= 0 && position <= aboutHeight) { // if scroll down hide the navbar
        setSection('about');
      } else if (position >= aboutHeight && position <= experienceHeight+aboutHeight) {
        setSection('experience');
      } else { // if scroll up show the navbar
        setSection('projects');
      }
    }

    console.log(aboutHeight, experienceHeight, projectsHeight)
  };

  useEffect(() => {
    if (aboutRef.current && experienceRef.current && projectsRef.current) {
      setAboutHeight(aboutRef.current.clientHeight);
      setExperienceHeight(experienceRef.current.clientHeight);
      setProjectsHeight(projectsRef.current.clientHeight);
    }
    getTags()
  }, []);

  const getTags = () => {
    let filters: Filter  [] = []
    experience.forEach(item => {
      item.tags.forEach(tag => {
        if (!filters.find(f => f.name === tag.type.toLowerCase())) {
          filters.push({ name: tag.type.toLowerCase(), enabled: true })
        }
      })
    });
    projects.forEach(item => {
      item.tags.forEach(tag => {
        if (!filters.find(f => f.name === tag.type.toLowerCase())) {
          filters.push({ name: tag.type.toLowerCase(), enabled: true })
        }
      })
    });
    setFilters(filters)
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
        className='group/experience flex-row flex flex-shrink my-5 p-5 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg 
        hover:bg-custom-blue-50/20 lg:hover:!opacity-100 lg:group-hover:opacity-50 rounded-2xl'>
        <div className='mr-5 shrink-0 w-24 hover:custom-blue'>
          <span className='font-extralight'>{experience.date}</span>
        </div>
        <div>
          <p className='group-hover/experience:text-custom-blue-100 font-medium mb-5'>{experience.title}</p>
          <span >
            {experience.roles.map((role: Role) => (
              <div key={role.role} className='flex flex-col mb-5'>
                <span>{role.role}</span>
                <span className='text-neutral-300 font-light'>{role.description}</span>
              </div>
            ))}
          </span>
          <div className='flex flex-shrink flex-row flex-wrap'>
            <TagGroup tags={experience.tags}/>
          </div>
        </div>
      </a>
    )
  }

  const Project = ({ project }: {project: Project}) => { 
    return (
      <a key={project.title} href={project.githubUrl} target='_blank'
        className='group/project cursor-pointer flex-row flex flex-shrink my-5 p-5 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg hover:bg-custom-blue-50/20 lg:hover:!opacity-100 lg:group-hover:opacity-50 rounded-2xl'>
        <div className='mr-5 shrink-0'>
          <Image className='w-fit h-fit rounded-md' src={project.imageUrl} alt='fromeroad' width={80} height={50} />
        </div>
        <div className='flex-col flex flex-shrink'>
          <span className='group-hover/project:text-custom-blue-100 font-medium mb-5'>{project.title}</span>
          <span className='text-neutral-300 font-light'>{project.description}</span>
          <div className='flex flex-shrink flex-row flex-wrap'>
            <TagGroup tags={project.tags}/>
          </div>
        </div>
      </a>
    )
  }

  const TagGroup = ({ tags }: { tags: Tags[] }) => {
    const sortedTags = tags.sort((a, b) => a.type.localeCompare(b.type))
    return (
      <div className='flex flex-shrink flex-row flex-wrap'>
        {sortedTags.map((tag) => (
          <Tag key={tag.name} tag={tag.name} cloud={tag.type === TAG_ENUM.CLOUD_SERVICES} enabled={filters.find(f => f.name === tag.type.toLowerCase())?.enabled || false} />
        ))}
      </div>
    )
  }

  const Tag = ({ tag, cloud, enabled }: { tag: string, cloud: boolean, enabled: boolean }) => {
    return (
      <span className={`${cloud ? 'bg-custom-pink-50 text-custom-pink-100' : 'bg-custom-blue-50 text-custom-blue-100'} 
      ${enabled ? '' : 'hidden'} 
      px-3 py-1 text-sm mr-1.5 mt-2 rounded-full select-none`}>
        {tag}
      </span>
    )
  }

  return (
    <div ref={scrollRef} onScroll={controlNavbar} className='bg-blue-950 h-screen w-screen flex flex-row justify-center overflow-auto scroll-smooth'>
      <div className='flex flex-col w-1/5 sticky top-0'>
        <Profile filters={filters} setFilters={setFilters}/>
      </div>
      <div className='flex flex-col w-1/3 px-5'>
        <div ref={aboutRef} id='about' className='flex flex-col w-full mb-8 pt-24'>
          <About />
        </div>
        <div ref={experienceRef} id='experience' className='group flex flex-col w-full mb-8 pt-14'>
          {experience.map((item) => (
            <Experience key={item.title} experience={item}/>
          ))}
        </div>
        <div ref={projectsRef} id='projects' className='group flex flex-col w-full mb-8 pt-14'>
          {projects.map((item) => (
            <Project key={item.title} project={item}/>
          ))}
        </div>
        <div onClick={() => window.scrollTo(0, 0)}>back to top</div>
      </div>
      <NavMenu section={section} setSection={setSection}/>
    </div>
  )
}