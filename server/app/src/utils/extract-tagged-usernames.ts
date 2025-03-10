function extractTaggedUsernames(text: string): string[] {
  const tagRegex = /@(\w+)/g
  const usernames = new Set<string>()
  let match
  while ((match = tagRegex.exec(text)) !== null) {
    usernames.add(match[1])
  }
  return Array.from(usernames)
}

export default extractTaggedUsernames
