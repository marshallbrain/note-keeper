import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import { openDB } from 'idb';
import NewCard from "./components/NewCard";
import NoteCard from "./components/NoteCard";

class App extends Component {
	
	constructor(props) {
		super(props);
		
		openDB('noteCards', 2, {
			upgrade: async (
				db,
				oldVersion,
				newVersion,
				transaction
			) => {
				switch (oldVersion) {
					case 0:
						upgradeV0toV1();
						// fallthrough
					case 1:
						upgradeV1toV2()
						break
					default:
						console.error('unknown db version');
				}
				
				function upgradeV0toV1() {
					db.createObjectStore("notes", { autoIncrement: true })
				}
				
				function upgradeV1toV2() {
					const text = transaction.objectStore("notes")
					text.createIndex("title", "title")
				}
			},
		}).then(db => {
			this.setState({db: db}, this.readNotes)
		})
		
		this.state = {
			cards: []
		}
		
	}
	
	readNotes = () => {
		this.state.db.getAll('notes').then((notes) => {
			notes.forEach(this.createCard)
		});
	}
	
	saveCard = (title, text, options={}) => {
		const entry = { title: title, text: text, ...options}
		this.state.db.put('notes', entry).then();
		this.createCard(entry)
	}
	
	createCard = (newCard) => {
		let cards = this.state.cards
		cards.push(newCard)
		this.setState({cards: cards})
	}
	
	render() {
		const {classes} = this.props
		
		return (
			<div>
				<NewCard createCard={this.saveCard}/>
				<div>
					{this.state.cards.map(({title, text}) => (
						<NoteCard title={title}>
							{text}
						</NoteCard>
					))}
				</div>
			</div>
		);
	}
}

const styles = (theme) => ({
});

export default withStyles(styles)(App);
