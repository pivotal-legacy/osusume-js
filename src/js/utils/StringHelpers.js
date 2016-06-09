export function pluralize(count, string) {
  if (count == 1) {
    return `1 ${string}`
  } else {
    return `${count} ${string}s`
  }
}
