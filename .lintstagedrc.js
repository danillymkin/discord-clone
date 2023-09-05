const path = require('path')

module.exports = {
  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    `next lint --fix --file ${filenames
      .map((f) => path.relative(process.cwd(), f))
      .join(' --file ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) => `npm run format:fix ${filenames.join(' ')}`,
}
