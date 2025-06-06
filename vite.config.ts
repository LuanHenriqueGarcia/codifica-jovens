import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        turmas: 'html/turmas.html',
        aulas: 'html/aulas.html',
        detalhesAlunos: 'html/detalhesAlunos.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})