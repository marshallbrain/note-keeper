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
import CardActions from "@material-ui/core/CardActions";
import Truncate from "./Truncate";

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
				<div className={classes.preCard}>
					<CardContent className={classes.preContent} onClick={openFull}>
						<IconButton className={classes.pinIcon}>
							<MoreVertIcon/>
						</IconButton>
						<Typography variant="h5" className={classes.preTitle}>
							{this.props.title}
						</Typography>
							<Typography variant="body1" className={classes.preText}>
								<Truncate maxLength={400} fudgeLine={20} fudgeWord={5}>
									{this.props.text}
								</Truncate>
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
								{/* TODO fix transitioning and formatting with no title */}
								<CardContent className={classes.fullTitle}>
									<IconButton className={classes.pinIcon}>
										<MoreVertIcon/>
									</IconButton>
									<Typography variant="h5">
										{this.props.title}
									</Typography>
								</CardContent>
								<CardContent className={classes.fullText}>
									<Typography variant="body1">
										{this.props.text}
									</Typography>
								</CardContent>
								<CardActions className={classes.fullAction}>
									<IconButton>
										<MoreVertIcon/>
									</IconButton>
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
	width: "50vw !important",
	height: "70vh !important",
	marginLeft: "25vw",
	marginTop: "15vh",
}

const styles = (theme) => ({
	pinIcon: {
		marginTop: -8,
		marginRight: -8,
		float: "right",
	},
	card: {
		marginBottom: 16,
	},
	
	// Preview
	preCard: {
		width: 240,
		//maxHeight: 400, //TODO Remove once text clipping is working
		display: "flex",
		flexDirection: "column",
		whiteSpace: "pre-line",
	},
	preContent: {
		flexGrow: "1",
		overflow: "hidden",
	},
	preTitle: {
		paddingBottom: 16,
	},
	preText: {
		paddingTop: 16,
	},
	preAction: {
	},
	
	//Full view
	fullCard: {
		position: "absolute",
		outline: 0,
		transition: `all ${animationTime}ms ease`,
		overflow: "inherit",
	},
	fullContent: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		whiteSpace: "pre-line",
		overflow: "inherit",
	},
	fullTitle: {
	},
	fullText: {
		overflow: "inherit",
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
		overflow: "auto",
		transition: "all 0s ease",
	},
	modalExit: {
		overflow: "hidden",
	},
});

export default withStyles(styles)(NoteCard);
