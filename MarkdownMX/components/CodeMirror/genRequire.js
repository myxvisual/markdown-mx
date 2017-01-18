const fs = require('fs')

const requireStr = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'].map(theme => (
`		case "${theme}": {
			require.ensure([], () => {
				require("codemirror/theme/${theme}.css");
				cb();
			}, "react-codemirror-theme-${theme}");
			break;
		}
`
)).join('')

const data = `export default function(mode: string, theme: string, cb = () => {}) {
	switch (theme) {
${requireStr}
		default: {
			require.ensure([], () => {
				require("codemirror/theme/dracula.css");
				cb();
			}, "react-codemirror-dracula");
			break;
		}
	}
}
`
fs.writeFileSync('./requireModule.ts', data, 'utf8')