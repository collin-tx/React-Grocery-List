import React, { Component } from 'react';

export default class ListItem extends Component {

state = {
	editing: false,
	currentValue: ''
}

edit = () => {
	if (this.state.editing){
		this.props.editItem(this.props.index, this.state.currentValue)
		this.setState({
			editing: false
		});
	} else {
		this.setState({
			editing: true
		});
	}
}

handleChange = (e) => {
	this.setState({
		currentValue: e.target.value
	})
}
	render() {
		return (
			<li className="list-group-item text-left">
				<b>{this.props.item.name} | ${this.props.item.price}</b>
				{this.state.editing ? (
					<input type="text" onChange={this.handleChange} value={this.currentValue} />
				) : ('')
				}
				<button className="btn btn-success m-1" id="edit" onClick={this.edit}>{this.state.editing ? 'Save' : 'Edit'}</button>
				<button className="btn btn-danger" id="remove" onClick={() => this.props.removeItem(this.props.id)}>
					Remove
					</button>
			</li>
		);
	}
}
