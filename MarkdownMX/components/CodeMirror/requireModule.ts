export default function(mode: string, theme: string, cb = () => {}) {
	switch (theme) {
		case "3024-day": {
			require.ensure([], () => {
				require("codemirror/theme/3024-day.css");
				cb();
			}, "react-codemirror-theme-3024-day");
			break;
		}
		case "3024-night": {
			require.ensure([], () => {
				require("codemirror/theme/3024-night.css");
				cb();
			}, "react-codemirror-theme-3024-night");
			break;
		}
		case "abcdef": {
			require.ensure([], () => {
				require("codemirror/theme/abcdef.css");
				cb();
			}, "react-codemirror-theme-abcdef");
			break;
		}
		case "ambiance-mobile": {
			require.ensure([], () => {
				require("codemirror/theme/ambiance-mobile.css");
				cb();
			}, "react-codemirror-theme-ambiance-mobile");
			break;
		}
		case "ambiance": {
			require.ensure([], () => {
				require("codemirror/theme/ambiance.css");
				cb();
			}, "react-codemirror-theme-ambiance");
			break;
		}
		case "base16-dark": {
			require.ensure([], () => {
				require("codemirror/theme/base16-dark.css");
				cb();
			}, "react-codemirror-theme-base16-dark");
			break;
		}
		case "base16-light": {
			require.ensure([], () => {
				require("codemirror/theme/base16-light.css");
				cb();
			}, "react-codemirror-theme-base16-light");
			break;
		}
		case "bespin": {
			require.ensure([], () => {
				require("codemirror/theme/bespin.css");
				cb();
			}, "react-codemirror-theme-bespin");
			break;
		}
		case "blackboard": {
			require.ensure([], () => {
				require("codemirror/theme/blackboard.css");
				cb();
			}, "react-codemirror-theme-blackboard");
			break;
		}
		case "cobalt": {
			require.ensure([], () => {
				require("codemirror/theme/cobalt.css");
				cb();
			}, "react-codemirror-theme-cobalt");
			break;
		}
		case "colorforth": {
			require.ensure([], () => {
				require("codemirror/theme/colorforth.css");
				cb();
			}, "react-codemirror-theme-colorforth");
			break;
		}
		case "dracula": {
			require.ensure([], () => {
				require("codemirror/theme/dracula.css");
				cb();
			}, "react-codemirror-theme-dracula");
			break;
		}
		case "duotone-dark": {
			require.ensure([], () => {
				require("codemirror/theme/duotone-dark.css");
				cb();
			}, "react-codemirror-theme-duotone-dark");
			break;
		}
		case "duotone-light": {
			require.ensure([], () => {
				require("codemirror/theme/duotone-light.css");
				cb();
			}, "react-codemirror-theme-duotone-light");
			break;
		}
		case "eclipse": {
			require.ensure([], () => {
				require("codemirror/theme/eclipse.css");
				cb();
			}, "react-codemirror-theme-eclipse");
			break;
		}
		case "elegant": {
			require.ensure([], () => {
				require("codemirror/theme/elegant.css");
				cb();
			}, "react-codemirror-theme-elegant");
			break;
		}
		case "erlang-dark": {
			require.ensure([], () => {
				require("codemirror/theme/erlang-dark.css");
				cb();
			}, "react-codemirror-theme-erlang-dark");
			break;
		}
		case "hopscotch": {
			require.ensure([], () => {
				require("codemirror/theme/hopscotch.css");
				cb();
			}, "react-codemirror-theme-hopscotch");
			break;
		}
		case "icecoder": {
			require.ensure([], () => {
				require("codemirror/theme/icecoder.css");
				cb();
			}, "react-codemirror-theme-icecoder");
			break;
		}
		case "isotope": {
			require.ensure([], () => {
				require("codemirror/theme/isotope.css");
				cb();
			}, "react-codemirror-theme-isotope");
			break;
		}
		case "lesser-dark": {
			require.ensure([], () => {
				require("codemirror/theme/lesser-dark.css");
				cb();
			}, "react-codemirror-theme-lesser-dark");
			break;
		}
		case "liquibyte": {
			require.ensure([], () => {
				require("codemirror/theme/liquibyte.css");
				cb();
			}, "react-codemirror-theme-liquibyte");
			break;
		}
		case "material": {
			require.ensure([], () => {
				require("codemirror/theme/material.css");
				cb();
			}, "react-codemirror-theme-material");
			break;
		}
		case "mbo": {
			require.ensure([], () => {
				require("codemirror/theme/mbo.css");
				cb();
			}, "react-codemirror-theme-mbo");
			break;
		}
		case "mdn-like": {
			require.ensure([], () => {
				require("codemirror/theme/mdn-like.css");
				cb();
			}, "react-codemirror-theme-mdn-like");
			break;
		}
		case "midnight": {
			require.ensure([], () => {
				require("codemirror/theme/midnight.css");
				cb();
			}, "react-codemirror-theme-midnight");
			break;
		}
		case "monokai": {
			require.ensure([], () => {
				require("codemirror/theme/monokai.css");
				cb();
			}, "react-codemirror-theme-monokai");
			break;
		}
		case "neat": {
			require.ensure([], () => {
				require("codemirror/theme/neat.css");
				cb();
			}, "react-codemirror-theme-neat");
			break;
		}
		case "neo": {
			require.ensure([], () => {
				require("codemirror/theme/neo.css");
				cb();
			}, "react-codemirror-theme-neo");
			break;
		}
		case "night": {
			require.ensure([], () => {
				require("codemirror/theme/night.css");
				cb();
			}, "react-codemirror-theme-night");
			break;
		}
		case "panda-syntax": {
			require.ensure([], () => {
				require("codemirror/theme/panda-syntax.css");
				cb();
			}, "react-codemirror-theme-panda-syntax");
			break;
		}
		case "paraiso-dark": {
			require.ensure([], () => {
				require("codemirror/theme/paraiso-dark.css");
				cb();
			}, "react-codemirror-theme-paraiso-dark");
			break;
		}
		case "paraiso-light": {
			require.ensure([], () => {
				require("codemirror/theme/paraiso-light.css");
				cb();
			}, "react-codemirror-theme-paraiso-light");
			break;
		}
		case "pastel-on-dark": {
			require.ensure([], () => {
				require("codemirror/theme/pastel-on-dark.css");
				cb();
			}, "react-codemirror-theme-pastel-on-dark");
			break;
		}
		case "railscasts": {
			require.ensure([], () => {
				require("codemirror/theme/railscasts.css");
				cb();
			}, "react-codemirror-theme-railscasts");
			break;
		}
		case "rubyblue": {
			require.ensure([], () => {
				require("codemirror/theme/rubyblue.css");
				cb();
			}, "react-codemirror-theme-rubyblue");
			break;
		}
		case "seti": {
			require.ensure([], () => {
				require("codemirror/theme/seti.css");
				cb();
			}, "react-codemirror-theme-seti");
			break;
		}
		case "solarized": {
			require.ensure([], () => {
				require("codemirror/theme/solarized.css");
				cb();
			}, "react-codemirror-theme-solarized");
			break;
		}
		case "the-matrix": {
			require.ensure([], () => {
				require("codemirror/theme/the-matrix.css");
				cb();
			}, "react-codemirror-theme-the-matrix");
			break;
		}
		case "tomorrow-night-bright": {
			require.ensure([], () => {
				require("codemirror/theme/tomorrow-night-bright.css");
				cb();
			}, "react-codemirror-theme-tomorrow-night-bright");
			break;
		}
		case "tomorrow-night-eighties": {
			require.ensure([], () => {
				require("codemirror/theme/tomorrow-night-eighties.css");
				cb();
			}, "react-codemirror-theme-tomorrow-night-eighties");
			break;
		}
		case "ttcn": {
			require.ensure([], () => {
				require("codemirror/theme/ttcn.css");
				cb();
			}, "react-codemirror-theme-ttcn");
			break;
		}
		case "twilight": {
			require.ensure([], () => {
				require("codemirror/theme/twilight.css");
				cb();
			}, "react-codemirror-theme-twilight");
			break;
		}
		case "vibrant-ink": {
			require.ensure([], () => {
				require("codemirror/theme/vibrant-ink.css");
				cb();
			}, "react-codemirror-theme-vibrant-ink");
			break;
		}
		case "xq-dark": {
			require.ensure([], () => {
				require("codemirror/theme/xq-dark.css");
				cb();
			}, "react-codemirror-theme-xq-dark");
			break;
		}
		case "xq-light": {
			require.ensure([], () => {
				require("codemirror/theme/xq-light.css");
				cb();
			}, "react-codemirror-theme-xq-light");
			break;
		}
		case "yeti": {
			require.ensure([], () => {
				require("codemirror/theme/yeti.css");
				cb();
			}, "react-codemirror-theme-yeti");
			break;
		}
		case "zenburn": {
			require.ensure([], () => {
				require("codemirror/theme/zenburn.css");
				cb();
			}, "react-codemirror-theme-zenburn");
			break;
		}

		default: {
			require.ensure([], () => {
				require("codemirror/theme/dracula.css");
				cb();
			}, "react-codemirror-dracula");
			break;
		}
	}
}
