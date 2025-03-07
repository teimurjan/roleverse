const path = require('node:path')
const { defineConfig } = require('vite')
const { default: dts } = require('vite-plugin-dts')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
      name: 'index',
    },
  },
  plugins: [
    dts({
      copyDtsFiles: true,
      include: [path.resolve(__dirname, './index.ts')],
      tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
    }),
  ],
})
