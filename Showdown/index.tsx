import * as React from "react";
import { findDOMNode } from "react-dom";

const showdown = require("showdown");
require("showdown-highlightjs-extension");
showdown.setOption("strikethrough", true);
showdown.setOption("tables", true);
showdown.setOption("tablesHeaderId", true);
showdown.setOption("tasklists", true);
const converter = new showdown.Converter({ extensions: [ "highlightjs" ] });
const katex = require("katex");
import "katex/dist/katex.min.css";

import * as styles from "./index.scss";

interface DataProps {
	text?: string;
	theme?: "dark" | "light";
}
interface ShowdownProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}
interface ShowdownState {
	__html?: string;
}

export default class Showdown extends React.Component<ShowdownProps, ShowdownState> {
	static defaultProps = {
		className: "",
		text: "",
		theme: "dark"
	};

	state: ShowdownState = {};

	refs: {
		content: HTMLDivElement;
	};

	componentWillReceiveProps(nextProps: ShowdownProps) {
		if (nextProps.text) {
			this.renderMD(nextProps.text);
		}
	}

	componentDidMount() {
		this.renderMD(this.props.text);
	}

	renderMD = (data: string) => {
		if (!data) {
			this.setState({
				__html: ""
			});
			return;
		};
		let __html = converter.makeHtml(data) as string;
		const mathPattern = /<code\s+class="\s*(math)?\s*language-\s*math"\s*>((?!.*<\/code>).*\n*\r*)*<\/code>/g;
		const mathDataPattern = /<code\s+class="\s*math?\s*language-\s*math"\s*>((.+\n*\r*)+)<\/code>$/;
		__html = __html.replace(mathPattern, (...args: any[]): any => {
			 const data = katex.renderToString(args[0].match(mathDataPattern)[1]);
			 return data;
		});
		this.setState({ __html });
	}

	getContent = () => findDOMNode(this.refs.content);

	getHTML = () => this.state.__html;

	render() {
		// tslint:disable-next-line:no-unused-variable
		const { className, text, theme, ...attributes } = this.props;
		const isDarkTheme = theme === "dark";
		const { __html } = this.state;

		return (
			<div ref="content" {...attributes} className={`${styles[isDarkTheme ? "d" : "l"]} ${className}`} >
				<div className={styles[isDarkTheme ? "dContent" : "lContent"]} dangerouslySetInnerHTML={{ __html }} />
			</div>
		);
	}
}
