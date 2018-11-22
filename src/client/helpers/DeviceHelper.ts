
export const screenSize = (): { width: number, height: number } => {
  const ratio: number = window.devicePixelRatio || 1
  const width: number = (screen.width)
  const height: number = (screen.height) * 0.80
  return { width, height }
}

export default {
  screenSize
}