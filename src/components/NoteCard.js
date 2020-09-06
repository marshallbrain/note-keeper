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
			<Card
				className={classes.card}
				ref={el => {element = el}}
				style={{opacity: hide ? 0: 100}}
			>
				<CardContent
					onClick={openFull}
				>
					<Typography variant="h5" gutterBottom>
						{this.props.title}
					</Typography>
					<Typography variant="body1">
						{this.props.text}
					</Typography>
				</CardContent>
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
						<Paper className={classes.paper} style={bounds}>
							<CardContent>
								<Typography variant="h5" gutterBottom>
									{this.props.title}
								</Typography>
								<Typography variant="body1">
									{this.props.text}
								</Typography>
							</CardContent>
						</Paper>
					</CSSTransition>
				</Modal>
			</Card>
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
	height: "40vh !important",
	marginLeft: "15vw",
	marginTop: "15vh",
}

const styles = (theme) => ({
	card: {
		width: 240,
		maxHeight: 300,
		marginBottom: 16,
		whiteSpace: "pre-line",
	},
	paper: {
		whiteSpace: "pre-line",
		overflow: "auto",
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
});

export default withStyles(styles)(NoteCard);
