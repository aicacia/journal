const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '320px',
			md: '480px',
			lg: '768px',
			xl: '1024px'
		}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('optional', '&:optional');
			addVariant('group-optional', ':merge(.group):optional &');
		})
	]
};

module.exports = config;
