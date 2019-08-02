import React, { Component } from 'react';
import './App.css';
import ListItem from './Components/ListItems';
import data from './Json.json';
import uuid from 'uuid';

export default class App extends Component {
	state = {
		websiteName: 'My Grocery List',
		groceries: [],
		value: '',
		grandTotal: ""
	};

	componentDidMount(){
		this.setState({
			groceries: data.groceries
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.value.length > 0){
		this.setState({
			groceries: [...this.state.groceries, 
				{
				name: this.state.value,
				price: 3,
				id: uuid.v4()
				}
			],
			value: ''
		})
	} else {
		alert("You can't add nothing to your grocery list!")
	}
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}

	removeItem = (id) => {
		const newList = this.state.groceries.filter(item => item.id !== id);
		this.setState({
			groceries: newList
		})
	}

	editItem = (index, newItem) => {
		const newList = this.state.groceries;
		newList[index].name = newItem;
		this.setState({
			groceries: newList
		})
	}

	getTotal = () => {
		let prices = [];
		for (let item in this.state.groceries){
			prices.push(this.state.groceries[item].price);
		}
		let total = prices.reduce((a, b) => a + b);
		this.setState({
			grandTotal: total
		})

		let totalP = document.getElementById('total');
		totalP.className = "bordered";
	}

	render() {
		let allGroceries = this.state.groceries.map((item, index) => {
			return <ListItem item={item} id={item.id} index={index} removeItem={this.removeItem} editItem={this.editItem} />
		})

		return (
			<main>
				<div className="container-fluid">
					<div className="row">
						<h1 className="title">{this.state.websiteName}</h1>
					</div>
					<div className="row">
						<form onSubmit={this.handleSubmit}>
							<input type="text" className="form-control top" placeholder="Add an item..." 
							value={this.state.value} onChange={this.handleChange} id="userInput" />
							<button className="btn btn-primary btn-block top">+</button>
						</form>
					</div>
					<div>
						<ul className="list-group">
							{allGroceries}
						</ul>
					</div>
					<button className="btn btn-secondary float-right" onClick={this.getTotal}>Get My Total</button>
					<p id="total" className="hide">Grand total: ${this.state.grandTotal}</p>
				</div>
			</main>
		);
	}
}