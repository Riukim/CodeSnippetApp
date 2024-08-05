export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  }

  return new Intl.DateTimeFormat("it-IT", options).format(date)
}
