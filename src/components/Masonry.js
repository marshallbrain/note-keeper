import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import ReactResizeDetector from 'react-resize-detector';

class Masonry extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			children: [],
			update: true,
			colCount: 0,
		}
		
	}
	
	componentDidUpdate(prevProps, prevState, snapshot) {
		let update = false
		update |= prevProps.children.length !== this.props.children.length
		
		if (this.state.update) {
			this.updateLayout()
		}
		
		if (update) {
			this.generateLayout()
		}
	}
	
	updateLayout = () => {
		const colHeight = []
		const newChildren = this.state.children.map(({child, style, ref}, index) => {
			const col = index % this.state.colCount
			const height = (colHeight[col] || 0)
			
			const {height: refHeight} = ref.current.getBoundingClientRect()
			const newStyle = {
				...style,
				left: col * (this.getColumnWidth()),
				top: height
			}
			
			colHeight[col] = height + refHeight
			return {child, style: newStyle, ref};
		});
		this.setState({children: newChildren})
		this.setState({update: false})
	}
	
	generateLayout = () => {
		const children = this.props.children.reduce((props, child, index) => {
			if (React.isValidElement(child)) {
				const style = {left: 0, top: 0}
				const ref = React.createRef()
				props.push({child, style, ref})
			}
			return props
		}, [])
		this.setState({children})
		this.setState({update: true})
	}
	
	windowResized = (width) => {
		const colCount = Math.floor(width / this.getColumnWidth())
		if (colCount !== this.state.colCount) {
			this.setState({colCount, update: true})
		}
	}
	
	getColumnWidth = () => {
		return this.props.columnWidth + this.props.gutter
	}
	
	render() {
		const {classes} = this.props
		
		return (
			<div className={classes.root}>
				{this.state.children.map(({child, style, ref}, index) => {return(
					<div style={style} className={classes.note} key={index} ref={ref}>
						{child}
					</div>
				)})}
				<ReactResizeDetector handleWidth onResize={this.windowResized}/>
			</div>
		);
	}
}

const styles = (theme) => ({
	root: {
		position: "relative",
		height: "auto",
		width: "100%",
	},
	note: {
		position: "absolute",
	}
});

Masonry.propTypes = {
};

export default withStyles(styles)(Masonry);
