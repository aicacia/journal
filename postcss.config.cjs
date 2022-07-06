const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
	plugins: [postcssImport(), tailwindcss(), autoprefixer()]
};

module.exports = config;
