import * as React from "react";
import { findDOMNode } from "react-dom";
const showdown = require("showdown");
showdown.setOption("strikethrough", true);
showdown.setOption("tables", true);
showdown.setOption("tablesHeaderId", true);
const katex = require("katex");
import "katex/dist/katex.min.css";

const defaultProps = {};
import * as styles from "./index.scss";

interface DataProps {
	mdValue?: string;
}
interface ShowdownProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}
interface ShowdownState {
	__html?: string;
}

const converter = new showdown.Converter();

export default class Showdown extends React.Component<ShowdownProps, ShowdownState> {
	static defaultProps = {
		...defaultProps,
		className: "",
		value: ""
	};

	state: ShowdownState = {
		__html: void(0)
	};
	refs: {
		content: HTMLDivElement;
	};

	componentWillReceiveProps(nextProps: ShowdownProps) {
		this.renderMD(nextProps.mdValue);
	}

	renderMD = (data: string) => {
		if (!data) {
			this.setState({
				__html: ""
			});
			return;
		};
		data = data
			.replace(/-\s\[\s\]/g, `- <input type="checkbox" disabled checked />`)
			.replace(/-\s\[x\]/g, `- <input type="checkbox" disabled />`);
		let __html = converter
			.makeHtml(data) as string;
		const mathPattern = /<code\s+class="\s*(math)?\s*language-\s*math"\s*>((?!.*<\/code>).*\n*\r*)*<\/code>/g;
		const mathDataPattern = /<code\s+class="\s*math?\s*language-\s*math"\s*>((.+\n*\r*)+)<\/code>$/;
		__html = __html.replace(mathPattern, (...args: any[]): any => {
			 const data = katex.renderToString(args[0].match(mathDataPattern)[1]);
			 return data;
		});
		this.setState({ __html });
	}

	getContent = () => findDOMNode(this.refs.content)

	getHTML = () => this.state.__html

	render() {
		const { className, ...attributes } = this.props;
		const { __html } = this.state;

		return (
			<div ref="content" {...attributes} className={`${styles.d} ${className}`} >
				<div className={`${styles.lContent} ${styles.dContent}`} dangerouslySetInnerHTML={{ __html }}/>
			</div>
		);
	}
}
