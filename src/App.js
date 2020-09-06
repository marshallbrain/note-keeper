import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import { openDB } from 'idb';
import NewCard from "./components/NewCard";
import NoteCard from "./components/NoteCard";
import NoteCardArea from "./components/NoteCardArea";

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
			this.setState({db: db})
			this.readNotes(db)
		})
		
		this.state = {
			cards: []
		}
		
	}
	
	readNotes = (db) => {
		db.getAll('notes').then((cards) => {
			this.setState({cards})
		});
	}
	
	saveCard = (title, text, options={}) => {
		const entry = { title: title, text: text, ...options}
		this.state.db.put('notes', entry).then((card) => {
			const cards = this.state.cards
			cards.push(entry)
			this.setState({cards})
		});
	}
	
	render() {
		const {classes} = this.props
		
		return (
			<div>
				<NewCard createCard={this.saveCard}/>
				<NoteCardArea cards={this.state.cards}/>
			</div>
		);
	}
}

const styles = (theme) => ({
});

export default withStyles(styles)(App);
