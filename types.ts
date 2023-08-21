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
  tags: string[]
  companyUrl: string
}
interface Project {
  title: string
  description: string
  imageUrl: string
  tags: string[]
  githubUrl: string
}
interface Role {
  role: string | undefined,
  description: string
}