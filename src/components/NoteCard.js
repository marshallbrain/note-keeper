import React, {Component} from 'react';
import styled from 'styled-components';
import CSSTransition from "react-transition-group/CSSTransition";
import {withStyles} from "@material-ui/core";
import {Card, CardContent, CardActionArea} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

const animationTime = 200

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
			const {top, left, width, height} = element.getBoundingClientRect();
			const bounds = {top, left, width, height}
			this.setState({open: true, hide: true, bounds: bounds});
		}
		
		const closeFull = () => {
			const {top, left, width, height} = element.getBoundingClientRect();
			const bounds = {top, left, width, height}
			this.setState({open: false, bounds: bounds});
		}
		
		return (
			<div>
				<Card ref={el => {element = el}} style={hide ? {opacity: 0}: {}}>
					<CardArea onClick={openFull} disableRipple>
						<CardContent>
							<Typography variant="h5" gutterBottom>
								{this.props.title}
							</Typography>
							<Typography variant="body1">
								{this.props.children}
							</Typography>
						</CardContent>
					</CardArea>
				</Card>
				<Modal
					open={open}
					onClose={closeFull}
					closeAfterTransition
				>
					<CSSTransition
						in={open}
						timeout={animationTime}
						appear
						classNames={{
							appearActive: classes.modalEnterActive,
							enterDone: classes.modalEnterDone,
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

const CardArea = styled(CardActionArea)`
	.MuiCardActionArea-focusHighlight {
		background-color: transparent;
	}
`;

const fullViewStyle = {
	top: "0 !important",
	left: "0 !important",
	width: "70vw !important",
	height: "70vh !important",
	marginLeft: "15vw",
	marginTop: "15vh",
}

const styles = (theme) => ({
	modal: {
		position: "absolute",
		outline: 0,
		transition: `all ${animationTime}ms ease`,
	},
	modalEnterActive: {
		...fullViewStyle,
	},
	modalEnterDone: {
		...fullViewStyle,
		transition: "all 0s ease",
	},
	modalExit: {
	},
	modalContent: {
		padding: theme.spacing(2),
	}
});

export default withStyles(styles)(NoteCard);
