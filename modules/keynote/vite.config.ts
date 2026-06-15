import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On build, assets are served from the GitHub Pages project path; dev and the
// preview server stay at root so local URLs are unchanged.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/dev-bootcamp-slides/' : '/',
  plugins: [react()],
}))
