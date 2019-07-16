export const localDate = (datetime, lang) => {
  return new Date(datetime).toLocaleDateString(lang)
}
