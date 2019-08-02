import React, { Component } from 'react';

export default class ListItem extends Component {


	render() {
		return (
			<li className="list-group-item text-left">
				<b>{this.props.item.name} | ${this.props.item.price}</b>
				<button className="btn btn-danger" id="remove" onClick={() => this.props.removeItem(this.props.id)}>Remove</button>
			</li>
		);
	}
}
