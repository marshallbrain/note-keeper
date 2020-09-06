import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import PushPin from "./icons/PushPin";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

class NewCard extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			focused: false,
			title: "",
			text: "",
		}
		
	}
	
	removeFocuses = () => {
		this.setState({focused: false})
		if (this.state.title || this.state.text) {
			this.props.createCard(this.state.title, this.state.text)
			this.setState({title: "", text: ""})
		}
	}
	
	addFocuses = () => {
		this.setState({focused: true})
	}
	
	updateText = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		})
	}
	
	render() {
		const {classes} = this.props
		const {focused} = this.state
		
		return (
			<div>
				<ClickAwayListener onClickAway={this.removeFocuses} >
					<Paper
						elevation={2}
						className={classes.paper}
						ref={el => {this.element = el}}
					>
						{focused && <div className={classes.row}>
							<InputBase
								id="title"
								className={classes.title}
								placeholder="Title"
								disabled={!focused}
								value={this.state.title}
								onChange={this.updateText}
							/>
							<IconButton>
								<PushPin/>
							</IconButton>
						</div>}
						<div className={classes.row}>
							<InputBase
								id="text"
								className={classes.text}
								placeholder="Take a note"
								value={this.state.text}
								onChange={this.updateText}
								onFocus={this.addFocuses}
								multiline
							/>
						</div>
						{focused && <div className={classes.row} style={{justifyContent: "space-between"}}>
							<IconButton>
								<MoreVertIcon/>
							</IconButton>
							<Button>Save</Button>
						</div>}
					</Paper>
				</ClickAwayListener>
			</div>
		);
	}
}

const styles = (theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		margin: "40px auto 80px auto",
		width: "60%",
		minWidth: 300,
		maxWidth: 600,
		padding: "0px 10px 0px 10px",
	},
	row: {
		display: "flex",
		flexDirection: "row",
	},
	title: {
		flex: 1,
	},
	text: {
		flex: 1,
	}
});

export default withStyles(styles)(NewCard);
