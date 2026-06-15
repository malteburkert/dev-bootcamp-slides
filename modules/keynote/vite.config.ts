import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The Pages base path (/dev-bootcamp-slides/<deck>/) is passed by the deploy
// workflow via --base, so dev and the preview server stay at root here.
export default defineConfig({
  plugins: [react()],
})
