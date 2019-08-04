import React, { Component } from 'react';

export default class ListItem extends Component {

state = {
	editing: false,
	currentValue: '',
	price: this.props.item.price
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
			<div>
			<li className="list-group-item text-left">
				<b>{this.props.item.name} | qty: {this.props.item.quantity} | ${this.props.item.total}</b>
				{this.state.editing ? (
					<input type="text" onChange={this.handleChange} value={this.currentValue} />
				) : ('')
				}
				<button className="btn btn-warning m-1" id="decrement" onClick={(e) => this.props.handleDecrement(e, this.props.index)}>-</button>
				<button className="btn btn-warning m-1" id="increment" onClick={(e) => this.props.handleIncrement(e, this.props.index)}>+</button>
				<button className="btn btn-success m-1" id="edit" onClick={this.edit}>{this.state.editing ? 'Save' : 'Edit'}</button>
				<button className="btn btn-danger" id="remove" onClick={() => this.props.removeItem(this.props.id)}>
					Remove
					</button>
			</li>
			</div>
		);
	}
}
