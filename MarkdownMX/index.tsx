import * as React from "react";
import { Router } from "react-router";
import { findDOMNode } from "react-dom";
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
const keycode = require("keycode");

import CodeMirror from "./components/CodeMirror";
import Showdown from "./components/Showdown";
import EWResizer from "./components/EWResizer";
import Header from "./components/Header";

import defaultProps from "./defaultProps";
import * as styles from "./index.scss";

const defaultValue = "";
const mdURL = "https://raw.githubusercontent.com/myxvisual/markdown-react/master/README.md";
const $ = (str: string) => document.querySelector(str);
const customKey = {
	bold: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("b") },
	italic: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("c") },
	strikethrough: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("s") },
	h: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("h") },
	table: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("t") },
	image: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("i") },
	which: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("w") },
	link: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("m") },
	math: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("x") },
	horizontal: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("_") },
	inlinewhich: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("l") },
	quote: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("'") },
	list: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode(";") },
	unchecked: { ctrlKey: false, shiftKey: false, altKey: true, whikeyCodech: keycode(",") },
	checked: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode(".") },
	printPreview: { ctrlKey: false, shiftKey: false, altKey: true, keyCode: keycode("p") }
};

interface DataProps {}
interface MarkdownMXProps extends DataProps, Router.RouterProps {
	className?: string;
}
interface MarkdownMXState {
	show?: boolean;
	theme?: string;
	showCodeMirror?: boolean;
	showRender?: boolean;
	showHeader?: boolean;
}
export default class MarkdownMX extends React.Component<MarkdownMXProps, MarkdownMXState> {
	static defaultProps = { ...defaultProps, className: "" };

	state: MarkdownMXState = {
		show: false,
		theme: "dracula",
		showCodeMirror: true,
		showRender: true,
		showHeader: true
	};
	refs: {
		showdown: Showdown;
		codemirror: CodeMirror;
		editorContainer: HTMLDivElement;
		ewResizer?: EWResizer;
		header?: Header;
	};
	codemirror: any;
	private editorDOM: Element;
	private previewDOM: Element;
	private codemirrorTimer: any;

	componentWillMount() {
		document.title = "Free Online Markdown Editor - AntCores - MarkdownMX";
		this.toggleLayout.index = 0;
	}

	componentDidMount() {
		const setCodemirrorValue = (text: any) => {
			if (this.codemirror) {
				this.codemirror.setValue(text);
			} else {
				this.codemirrorTimer = setTimeout(() => {
					setCodemirrorValue(text);
				}, 200);
			}
		};
		document.addEventListener("keyup", this.handleKeyup);
		fetch(mdURL).then(res => res.text()).then(
			text => { this.renderMD(text); setCodemirrorValue(text); }
		);
		this.syncScroll();
	}

	componentWillUnmount() {
		clearTimeout(this.codemirrorTimer);
		document.removeEventListener("keyup", this.handleKeyup);
		this.editorDOM.removeEventListener("scroll", this.handleEditorScroll);
	}

	print = () => {
		const codemMirrorDOM: HTMLDivElement = $(".CodeMirror") as any;
		const renderDOM: HTMLDivElement = $(`.${styles.cEditorPreview}`) as any;
		const ewResizerDOM = $("#ewresizer") as HTMLDivElement;
		const headerDOM = $("#header") as HTMLDivElement;
		codemMirrorDOM.style.display = "none";
		renderDOM.style.width = "100%";
		ewResizerDOM.style.display = "none";
		headerDOM.style.display = "none";
		const printHTML = renderDOM.outerHTML;
		const bodyHTML = document.body.outerHTML;
		document.body.outerHTML = printHTML;
		window.print();
		document.body.outerHTML = bodyHTML;
		window.location.reload();
	}

	download = () => {
		const FileSaver = require("file-saver");
		const { codemirror } = this;
		const blob = new Blob([codemirror.getValue()], { type: "text/plain;charset=utf-8" });
		FileSaver.saveAs(blob, "README.md");
	}

	syncScroll = () => {
		this.editorDOM = $(".CodeMirror-scroll");
		this.previewDOM = this.refs.showdown.getContent();
		if (!(this.editorDOM && this.previewDOM)) {
			setTimeout(() => {
				this.syncScroll();
			}, 100);
			return;
		}
		this.editorDOM.addEventListener("scroll", this.handleEditorScroll);
	}

	handleEditorScroll = (e: UIEvent) => {
		const controler = this.editorDOM as HTMLDivElement;
		const syncer = this.previewDOM as HTMLDivElement;
		if (controler.scrollHeight <= controler.clientHeight) {
			syncer.scrollTop = syncer.scrollHeight - syncer.offsetHeight;
		} else {
			if (controler.scrollTop < ((controler.scrollHeight - controler.clientHeight) / 2)) {
				syncer.scrollTop = syncer.scrollHeight * controler.scrollTop / controler.scrollHeight;
			} else {
				syncer.scrollTop = syncer.scrollHeight - syncer.offsetHeight - (controler.scrollHeight - controler.clientHeight - controler.scrollTop) * (syncer.scrollHeight - syncer.offsetHeight) / (controler.scrollHeight - controler.clientHeight);
			}
		}
	}

	toggleShow = (show?: boolean) => {
		if (typeof show === "boolean") {
			this.setState({ show });
		} else {
			this.setState({ show: !this.state.show });
		}
	}

	toggleLayout: {
		(index?: number): void;
		index?: number;
	} = (index) => {
		if (index) {
			this.toggleLayout.index = index;
		} else {
			this.toggleLayout.index = (this.toggleLayout.index + 1) % 3;
		}
		const codemMirrorDOM: HTMLDivElement = $(".CodeMirror") as any;
		const renderDOM: HTMLDivElement = $(`.${styles.cEditorPreview}`) as any;
		switch (this.toggleLayout.index) {
			case 0: {
				codemMirrorDOM.style.display = "none";
				renderDOM.style.width = "100%";
				break;
			}
			case 1: {
				renderDOM.style.display = "none";
				codemMirrorDOM.style.display = "block";
				codemMirrorDOM.style.width = "100%";
				break;
			}
			case 2: {
				renderDOM.style.display = "inherit";
				codemMirrorDOM.style.display = "block";
				renderDOM.style.width = "50%";
				codemMirrorDOM.style.width = "50%";
				break;
			}
			default: {
				break;
			}
		}
	}

	onChangeTheme = (e: React.SyntheticEvent<HTMLSelectElement>) => {
		this.setState({ theme: e.currentTarget.value });
	}

	onChangeValue = (codemirror?: any) => this.renderMD(codemirror.getValue());

	renderMD = (value: string) => this.refs.showdown.renderMD(value);

	getCodemirror = (codemirror?: any) => { this.codemirror = codemirror; }

	handleKeyup = (e: KeyboardEvent) => {
		const { ctrlKey, shiftKey, altKey, keyCode } = e;
		const keyupStr = JSON.stringify({ ctrlKey, shiftKey, altKey, keyCode });
		const createString = (str: string) => this.setSelection(str);
		switch (keyupStr) {
			case JSON.stringify(customKey.bold):
				createString("bold");
				break;
			case JSON.stringify(customKey.italic):
				createString("italic");
				break;
			case JSON.stringify(customKey.strikethrough):
				createString("strikethrough");
				break;
			case JSON.stringify(customKey.h):
				createString("h");
			case JSON.stringify(customKey.table):
				createString("table");
				break;
			case JSON.stringify(customKey.image):
				createString("image");
				break;
			// case JSON.stringify(customKey.code):
			// 	createString("code");
			// 	break;
			case JSON.stringify(customKey.link):
				createString("link");
				break;
			case JSON.stringify(customKey.math):
				createString("math");
				break;
			case JSON.stringify(customKey.horizontal):
				createString("horizontal");
			window.setTimeout(function () {
				$("#mdbody").scrollTop += 120;
			}, 20);
				break;
			// case JSON.stringify(customKey.inlinecode):
			// 	createString("inlinecode");
			// 	break;
			case JSON.stringify(customKey.quote):
				createString("quote");
				break;
			case JSON.stringify(customKey.list):
				createString("list");
				break;
			case JSON.stringify(customKey.unchecked):
				createString("unchecked");
				break;
			case JSON.stringify(customKey.checked):
				createString("checked");
				break;
			case JSON.stringify(customKey.printPreview):
			// printPreview();
				break;

			default:
				break;
		}
	}

	setSelection = (type?: string) => {
		const { codemirror } = this;
		let originValue = codemirror.getSelection();
		const originValueLength = originValue.length;
		const start = codemirror.getCursor(true);
		const end = codemirror.getCursor(false);
		let nextStart: any;

		const setNextValue = (nextValue: string, startStrLen: number) => {
			codemirror.replaceRange(
				nextValue,
				start,
				{ ...start, ch: start.ch + originValueLength }
			);
			nextStart = { ...start, ch: start.ch + startStrLen };

			codemirror.setSelection(nextStart, { ...end, ch: end.ch + startStrLen });
			codemirror.focus();
		};

		switch (type) {
			case "bold": {
				setNextValue(`**${originValue}**`, 2);
				break;
			}
			case "italic": {
				setNextValue(`*${originValue}*`, 1);
				break;
			}
			case "strikethrough": {
				setNextValue(`~~${originValue}~~`, 2);
				break;
			}
			case "title": {
				setNextValue(`# ${originValue}`, 1);
				break;
			}
			case "table": {
				setNextValue(`\nheader | header\n---|---\nrow1 col 1 | row1 col2\nrow2 col1 | row2 col2\n${originValue}`, 70);
				break;
			}
			case "image": {
				codemirror.replaceRange(
					`![image](http://myxvisual.github.io/static/images/grass.jpg)${originValue}`,
					start,
					{ ...start, ch: start.ch + originValueLength }
				);
				nextStart = { ...start, ch: start.ch + 16 };

				codemirror.setSelection(nextStart, { ...end, ch: end.ch + 58 });
				codemirror.focus();
				break;
			}
			case "code": {
				setNextValue(`\`\`\`\n${originValue}\n\`\`\``, 4);
				break;
			}
			case "link": {
				codemirror.replaceRange(
					`[link](http://myxvisual.github.io)${originValue}`,
					start,
					{ ...start, ch: start.ch + originValueLength }
				);
				nextStart = { ...start, ch: start.ch + 7 };

				codemirror.setSelection(nextStart, { ...end, ch: end.ch + 33 });
				codemirror.focus();
				break;
			}
			case "math": {
				codemirror.replaceRange(
					 "``` math\nf(x) = \\int\_\{\-\\infty\}\^\\infty\n    \\hat f\(\\xi\)\\\,e\^\{2 \\pi i \\xi x\}\n    \\\,d\\xi\n```\n" + originValue,
					start,
					{ ...start, ch: start.ch + originValueLength }
				);
				nextStart = { ...start, ch: start.ch + 9 };

				codemirror.setSelection(nextStart, { ...end, ch: end.ch + 83 });
				codemirror.focus();
				break;
			}
			case "quote": {
				setNextValue(`> ${originValue}`, 2);
				break;
			}
			case "horizontal": {
				setNextValue(`---\n${originValue}`, 4);
				break;
			}
			case "inlinecode": {
				setNextValue(`\`${originValue}\``, 1);
				break;
			}
			case "list": {
				setNextValue(`- ${originValue}`, 2);
				break;
			}
			case "checked": {
				setNextValue(`- [x] ${originValue}`, 6);
				break;
			}
			case "unchecked": {
				setNextValue(`- [ ] ${originValue}`, 6);
				break;
			}
			default: {
				break;
			}
		}
	}

	resizeEdiotr = (e: MouseEvent) => {
		const codemirrorDOM = $(".CodeMirror") as HTMLDivElement;
		codemirrorDOM.style.width = `${e.clientX}px`;
	}

	render() {
		const { show, showCodeMirror, showHeader, showRender, theme } = this.state;
		const { className } = this.props;

		return (
			<div className={`${styles.c} ${className}`}>
				<div className={styles.cHeader}>
					{showHeader ? <Header id="header" father={this} /> : null}
				</div>
				<div className={styles.cEditor}>
					<CodeMirror
							className={styles.cEditorCodemirror}
							ref="codemirror"
							highlightSelectionMatches={{
								showToken: /\w/,
								annotateScrollbar: true
							}}
							getCodemirror={this.getCodemirror}
							defaultValue={defaultValue}
							onChange={this.onChangeValue}
							theme={theme}
							mode="markdown"
						/>
					<EWResizer
						id="ewresizer"
						onChangePosition={this.resizeEdiotr}
						style={{ width: 3, height: "100%" }}
					/>
					<Showdown className={styles.cEditorPreview} ref="showdown" />
				</div>
			</div>
		);
	}
}
