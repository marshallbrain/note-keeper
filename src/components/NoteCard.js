import React, {Component} from 'react';
import styled from 'styled-components';
import CSSTransition from "react-transition-group/CSSTransition";
import {withStyles} from "@material-ui/core";
import {Card, CardContent, CardActionArea} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";

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
				className={classes.preCard}
				ref={el => {element = el}}
				style={{opacity: hide ? 0: 100}}
			>
				<div className={classes.fullContent} onClick={openFull}>
					<CardHeader
						className={classes.preTitle}
						action={
							<IconButton aria-label="settings">
								<MoreVertIcon />
							</IconButton>
						}
						title={this.props.title}
					/>
					<CardContent className={classes.preText}>
						<Typography variant="body1">
							{this.props.text}
						</Typography>
					</CardContent>
					<CardActions className={classes.preAction}>
						<IconButton>
							<MoreVertIcon/>
						</IconButton>
					</CardActions>
				</div>
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
						<Paper className={classes.fullCard} style={bounds}>
							<div className={classes.fullContent}>
								<CardHeader
									className={classes.fullTitle}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title={this.props.title}
								/>
								<CardContent className={classes.fullText}>
									<Typography variant="body1">
										{this.props.text}
									</Typography>
								</CardContent>
								<CardActions className={classes.fullAction}>
									<IconButton>
										<MoreVertIcon/>
									</IconButton>
									<Button>Save</Button>
								</CardActions>
							</div>
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
	height: "70vh !important",
	marginLeft: "15vw",
	marginTop: "15vh",
}

const styles = (theme) => ({
	preCard: {
		width: 240,
		height: 400,
		marginBottom: 16,
		whiteSpace: "pre-line",
	},
	preContent: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		whiteSpace: "pre-line",
	},
	preTitle: {
	},
	preText: {
		overflow: "hidden",
		flexGrow: "1",
	},
	preAction: {
	},
	
	//Full view
	fullCard: {
		position: "absolute",
		outline: 0,
		transition: `all ${animationTime}ms ease`,
	},
	fullContent: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		whiteSpace: "pre-line",
	},
	fullTitle: {
	},
	fullText: {
		overflow: "auto",
		flexGrow: "1",
	},
	fullAction: {
	},
	
	//Modal Transition
	
	modalEnterActive: {
		...fullViewStyle,
		overflow: "hidden",
	},
	modalEnterDone: {
		...fullViewStyle,
		transition: "all 0s ease",
	},
	modalExit: {
		overflow: "hidden",
	},
});

export default withStyles(styles)(NoteCard);
