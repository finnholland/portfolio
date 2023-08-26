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
  tags: Tags[]
  companyUrl: string
}
interface Project {
  title: string
  description: string
  imageUrl: string
  tags: Tags[]
  githubUrl: string
}
interface Role {
  role: string | undefined,
  description: string
}

interface Tags {
  type: string
  name: string
}
interface Filter {
  name: string
  enabled: boolean
}

interface TagColours {
  tagType: string,
  bg: string,
  tg: string
  svgc: string
};