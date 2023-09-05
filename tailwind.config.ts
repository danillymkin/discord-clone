import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [require('@tailwindcss/forms')({ strategy: 'base' })],
}
export default config
