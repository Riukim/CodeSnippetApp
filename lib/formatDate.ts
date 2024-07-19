
export const formatDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.toLocaleString("en-GB", { month: "long" })
  const year = date.getFullYear()

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th"
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  const suffix = getDaySuffix(day)
  return `${day}${suffix} ${month} ${year}`
}
