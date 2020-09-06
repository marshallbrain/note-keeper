import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import NoteCard from "./NoteCard";
import Masonry from "./Masonry";

class NoteCardArea extends Component {
	
	render() {
		const {classes} = this.props
		
		return (
			<Masonry
				columnWidth={240}
				gutter={16}
			>
				{this.props.cards.map((props, index) => {return(
					<NoteCard {...props} key={index}/>
				)})}
			</Masonry>
		);
	}
}

const styles = (theme) => ({
	root: {
	},
});

export default withStyles(styles)(NoteCardArea);
