import * as React from "react";
import * as styles from "./RootStyle.scss";

export class EditorRoot extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className={styles.container}>
				<span className={styles.hello}>Hello</span>
				<span className={styles.world}>world</span>
				<span className={styles.dot}>.</span>
			</div>
		);
	}
}
