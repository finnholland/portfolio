interface About {
  name: string
  position: string
  bio: string
  shortBio: string
  about: string
}
interface Experience {
  title: string
  roles: Role[]
  date: string
  tags: TagGroup[]
  companyUrl: string
}
interface Project {
  title: string
  description: string
  imageUrl: string
  tags: TagGroup[]
  githubUrl: string
}
interface Role {
  role: string | undefined,
  description: string
}

interface TagGroup {
  type: string
  tags: string[]
}
interface Filter {
  name: string
  enabled: boolean
}