import * as React from "react";

const codeMirror = require("codemirror");
import requireModule from "./requireModule";
import "codemirror/lib/codemirror.css";

const defaultProps = {
	mode: "javascript",
	theme: "duotone-dark",
	defaultValue: "",
	readOnly: false,
	tabSize: 4,
	lineNumbers: true,
	lineWrapping: true,
	styleSelectedText: true,
	indentUnit: 4,
	extraKeys: {
		"Ctrl-S": "onSave",
		"Ctral-A": "selectAll"
	},
	getCodemirror: () => {}
};

interface CodeMirrorProps {
	theme?: string;
	mode?: string;
	value?: string;
	defaultValue?: string;
	tabSize?: number;
	lineNumbers?: number;
	indentUnit?: number;
	lineWrapping?: boolean;
	extraKeys?: any;
	onChange?: Function;
	highlightSelectionMatches?: any;
	getCodemirror?: (codemirror: any) => void;

	className?: string;
	style?: React.CSSProperties;
}
interface CodeMirrorState {}

export default class CodeMirror extends React.Component<CodeMirrorProps, CodeMirrorState> {
	constructor(props: CodeMirrorProps) {
		super(props);
		this.requireModule(props);
		this.renderCodemirror = this.renderCodemirror.bind(this);
	}

	static defaultProps = defaultProps;

	state: CodeMirrorState = {};
	public codemirror: any;
	refs: {
		textarea: HTMLTextAreaElement;
	};

	componentWillReceiveProps(nextProps: CodeMirrorProps) {
		const props = Object.assign({}, defaultProps, nextProps) as any;
		this.requireModule(props);
		this.renderCodemirror();
	}

	componentDidUpdate(prevProps: CodeMirrorProps, prevState: CodeMirrorState) {
		this.renderCodemirror();
	}

	setOptions = (props: any) => {
		if (!this.codemirror) return;
		for (const key in props) {
			this.codemirror.setOption(key, props[key]);
		}
	}

	requireModule = (props: any) => {
		const { mode, theme } = props;
		this.setOptions(props);
		require("codemirror/mode/markdown/markdown.js");
		// require("codemirror/theme/duotone-dark.css");
		requireModule(mode, theme, () => { this.setOptions(props); this.renderCodemirror(); });
	}

	getCodemirror = () => this.props.getCodemirror(this.codemirror)

	setValue = (value: string) => this.codemirror.setValue(value);

	getValue = () => this.codemirror.getValue()

	getSelectedRange = () => ({ from: this.codemirror.getCursor(true), to: this.codemirror.getCursor(false) })

	refresh = (timeout = 0, cb = () => {}) => {
		setTimeout(() => {
			this.codemirror.refresh();
			cb();
		}, timeout);
	}

	renderCodemirror() {
		const { value, onChange, getCodemirror } = this.props;
		if (!this.codemirror) {
			this.codemirror = codeMirror.fromTextArea(this.refs.textarea, this.props);
			this.codemirror.on("change", (instance: any, changeObj: any) => {
				onChange(instance);
			});
		}
		getCodemirror(this.codemirror);
		if (value) this.setValue(value);
		this.refresh();
	}

	render() {
		const { value, defaultValue, className, style } = this.props;

		return (
			<textarea ref="textarea" {...{ value, defaultValue, className, style }} />
		);
	}
}
