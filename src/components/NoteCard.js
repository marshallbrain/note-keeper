import React, {Component} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "fontsource-roboto"
import Modal from "@material-ui/core/Modal";
import CardActionArea from "@material-ui/core/CardActionArea";
import Paper from "@material-ui/core/Paper";
import CSSTransition from "react-transition-group/CSSTransition";

class NoteCard extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			open: false,
			bounds: {},
		}
	}
	
	render() {
		const {classes} = this.props
		const {open, hide, bounds} = this.state
		let element = null
		
		const openFull = () => {
			const {top, right, bottom, left, width, height} = element.getBoundingClientRect();
			const bounds = {top, right, bottom, left, width, height}
			this.setState({open: true, hide: true, bounds: bounds});
		}
		
		return (
			<div>
				<Card ref={el => {element = el}} style={hide ? {opacity: 0}: {}}>
					<CardActionArea onClick={openFull}>
						<CardContent className={classes.root}>
							<Typography variant="h5" gutterBottom>
								{this.props.title}
							</Typography>
							<Typography variant="body1">
								{this.props.children}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
				<Modal
					open={open}
					onClose={() => {this.setState({open: false})}}
					closeAfterTransition
				>
					<CSSTransition
						in={open}
						timeout={2000}
						appear
						classNames={{
							appearActive: classes.modalEnterActive,
							appearDone: classes.modalEnterDone,
							exit: classes.modalExit,
						}}
						onExited={() => {this.setState({hide: false})}}
					>
						<Paper className={classes.modal} style={bounds}>
							<div className={classes.modalContent}>
								<Typography variant="h5" gutterBottom>
									{this.props.title}
								</Typography>
								<Typography variant="body1" component="p">
									{this.props.children}
								</Typography>
							</div>
						</Paper>
					</CSSTransition>
				</Modal>
			</div>
		);
	}
}

const styles = (theme) => ({
	root: {
		fontFamily: "Roboto",
	},
	modal: {
		position: "absolute",
		outline: 0,
		transition: "all 2s ease",
	},
	modalEnterActive: {
		top: "0 !important",
		right: "0 !important",
		bottom: "0 !important",
		left: "0 !important",
		width: "80vw !important",
		height: "80vh !important",
		marginLeft: "10vw",
		marginTop: "10vh",
	},
	modalEnterDone: {
		top: "0 !important",
		right: "0 !important",
		bottom: "0 !important",
		left: "0 !important",
		width: "80vw !important",
		height: "80vh !important",
		marginLeft: "10vw",
		marginTop: "10vh",
		transition: "all 0s ease",
	},
	modalExit: {
	
	},
	modalContent: {
		padding: theme.spacing(2),
	}
});

export default withStyles(styles)(NoteCard);