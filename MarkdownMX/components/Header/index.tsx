import * as React from "react";
import MarkdownMX from "../../index";
import * as styles from "./index.scss";
import "assets/css/material-icons.scss";
const defaultProps = process.env.NODE_ENV === "development" ? require("./devDefaultProps").default : {};

interface DataProps {
	father: MarkdownMX;
}
interface HeaderProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}
interface HeaderState {}

export default class Header extends React.Component<HeaderProps, HeaderState> {
	static defaultProps = { ...defaultProps, className: "" };

	state: HeaderState = {};

	render() {
		const { father, className, ...attributes } = this.props;

		return (
			<header {...attributes} className={`${styles.c} ${className}`}>
				<div className={styles.cTool}>
					{[
						[
							{ icon: "format_bold", onClick: () => father.setSelection("bold") },
							{ icon: "format_italic", onClick: () => father.setSelection("italic") },
							{ icon: "strikethrough_s", onClick: () => father.setSelection("strikethrough") },
							{ icon: "format_size", onClick: () => father.setSelection("title") }
						],
						[
							{ icon: "view_list", onClick: () => father.setSelection("table") },
							{ icon: "image", onClick: () => father.setSelection("image") },
							{ icon: "code", onClick: () => father.setSelection("code") },
							{ icon: "insert_link", onClick: () => father.setSelection("link") }
						],
						[
							{ icon: "functions", onClick: () => father.setSelection("math") },
							{ icon: "format_quote", onClick: () => father.setSelection("quote") },
							{ icon: "trending_flat", onClick: () => father.setSelection("horizontal") },
							{ icon: "chat_bubble", onClick: () => father.setSelection("inlinecode") }
						],
						[
							{ icon: "format_list_bulleted", onClick: () => father.setSelection("list") },
							{ icon: "check_box", onClick: () => father.setSelection("checked") },
							{ icon: "check_box_outline_blank", onClick: () => father.setSelection("unchecked") }
						],
						[
							{ icon: "undo", onClick: () => father.codemirror.undo() },
							{ icon: "redo", onClick: () => father.codemirror.redo() }
						]
					].map((arrGroup, index) => (
						<div key={`${index}`} className={styles.cToolItems}>
							{arrGroup.map(({ icon, onClick }, index) => (
								<p key={`${index}`} onClick={() => onClick()} className={styles.materialIcons}>
									{icon}
								</p>
							))}
						</div>
					))}
				</div>
				<div className={styles.cMenu}>
					<select defaultValue={father.state.theme} onChange={father.onChangeTheme}>
						{["3024-day", "3024-night", "abcdef", "ambiance-mobile", "ambiance", "base16-dark", "base16-light", "bespin", "blackboard", "cobalt", "colorforth", "dracula", "duotone-dark", "duotone-light", "eclipse", "elegant", "erlang-dark", "hopscotch", "icecoder", "isotope", "lesser-dark", "liquibyte", "material", "mbo", "mdn-like", "midnight", "monokai", "neat", "neo", "night", "panda-syntax", "paraiso-dark", "paraiso-light", "pastel-on-dark", "railscasts", "rubyblue", "seti", "solarized", "the-matrix", "tomorrow-night-bright", "tomorrow-night-eighties", "ttcn", "twilight", "vibrant-ink", "xq-dark", "xq-light", "yeti", "zenburn"].map((value, index) => (
							<option key={`${index}`} value={value}>{value}</option>
						))}
					</select>
					{/*
					<p className={styles.materialIcons}>keyboard</p>
					<p className={styles.materialIcons}>palette</p>
					*/}
					<p onClick={() => father.download()} className={styles.materialIcons}>file_download</p>
					<p onClick={() => father.print()} className={styles.materialIcons}>print</p>
					<p onClick={() => father.toggleLayout()} className={styles.materialIcons}>view_carousel</p>
				</div>
			</header>
		);
	}
}
