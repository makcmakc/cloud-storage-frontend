import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useScreenSize() {
  // state encapsulated and managed by the composable
  const screenWidth = ref(window.innerWidth)

  // a composable can update its managed state over time.
  const handleResize = () => screenWidth.value = window.innerWidth

  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  // expose managed state as return value
  return { screenWidth }
}