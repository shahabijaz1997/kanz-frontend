export const kebabCase = (name: string) => {
  return name?.replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[\s_]+/g, '-')
              .toLowerCase()
}