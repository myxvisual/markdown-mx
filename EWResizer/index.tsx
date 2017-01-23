import * as React from "react";

import * as styles from "./index.scss";
const defaultProps = __DEV__ ? require("./devDefaultProps").default : {};

interface DataProps {
	onChangePosition?: (e: MouseEvent) => void;
}
interface EWResizerProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}
interface EWResizerState {}

export default class EWResizer extends React.Component<EWResizerProps, EWResizerState> {
	static defaultProps: EWResizerProps = {
		...defaultProps,
		className: "",
		onChangePosition: () => {}
	};

	state: EWResizerState = {};

	handleMouseDown = () => {
		window.addEventListener("mousemove", this.props.onChangePosition);
		window.addEventListener("mouseup", this.removeHandler);
		const { style } = document.documentElement;
		style.cursor = "w-resize";
		style.msUserSelect = "none";
		style.webkitUserSelect = "none";
		style.pointerEvents = "none";
	}

	removeHandler = () => {
		window.removeEventListener("mousemove", this.props.onChangePosition);
		window.removeEventListener("mouseup", this.removeHandler);
		const { style } = document.documentElement;
		style.cursor = "";
		style.msUserSelect = "";
		style.webkitUserSelect = "";
		style.pointerEvents = "";
	}

	render() {
		const { onChangePosition, className, ...attributes } = this.props;

		return (
			<div
				onMouseDown={this.handleMouseDown}
				{...attributes}
				className={`${styles.c} ${className}`}
			/>
		);
	}
}
