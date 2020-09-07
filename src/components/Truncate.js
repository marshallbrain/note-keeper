import React, {Component} from 'react';
import PropTypes from 'prop-types';

const NEWLINE_CHAR_CODE = 10; // '\n'

class Truncate extends Component {
	
	constructor(props) {
		super(props);
		
		const text = this.truncateText(this.props.children)
		
		this.state = {
			text
		}
	}
	
	truncateText = (text) => {
		const { length } = text
		const { maxLength, fudgeLine, fudgeWord} = this.props
		
		let i = length
		if (!this.props.breakWords && i > maxLength) {
			let lastBoundary = Infinity
			for (let j = maxLength + fudgeWord; j >= 0; j--) {
				const charCode = text.charCodeAt(j)
				
				if (charCode === NEWLINE_CHAR_CODE) {
					lastBoundary = j+1
				} else if (isWhiteSpace(charCode)) {
					lastBoundary = j
					if (text.charCodeAt(j-1) === 46) {
						lastBoundary = lastBoundary+1
					}
				}
				
				if (j < i && lastBoundary < i + fudgeWord) {
					i = lastBoundary
					break
				}
			}
		}
		
		return text.slice(0, i) + ((i < length)? this.props.indicator: "")
		
	}
	
	render() {
		return (
			this.state.text
		);
	}
}

Truncate.propTypes = {
	maxLength: PropTypes.number,
	maxLines: PropTypes.number,
	indicator: PropTypes.string,
	fudgeLine: PropTypes.number,
	fudgeWord: PropTypes.number,
	breakWords: PropTypes.bool,
};

Truncate.defaultProps = {
	maxLength: Infinity,
	maxLines: Infinity,
	indicator: "...",
	fudgeLine: 0,
	fudgeWord: 0,
	breakWords: false,
};

export default Truncate;

function isWhiteSpace(charCode) {
	return (
		charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32
	);
}
