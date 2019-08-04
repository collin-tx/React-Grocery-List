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
		document.getElementById('total').classList.add('hide');
		if (this.state.value.length > 0){
		this.setState({
			groceries: [...this.state.groceries, 
				{
				name: this.state.value,
				price: 3,
				id: uuid.v4(),
				quantity: 1,
				total: 3
				}
			],
			value: ''
		})
	} else {
		const itemBorder = document.getElementById('userInput');
		itemBorder.classList.add('warning');
		setTimeout(function(){
			itemBorder.classList.remove('warning');
		}, 1500);
	}
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		})
	}

	removeItem = (id) => {
		const newList = this.state.groceries.filter(item => item.id !== id);
		document.getElementById('total').classList.add('hide');
		this.setState({
			groceries: newList
		});
	}

	editItem = (index, newItem) => {
		const newList = this.state.groceries;
		newList[index].name = newItem;
		this.setState({
			groceries: newList
		})
	}

	getTotal = () => {
		let totals = [];
		for (let item in this.state.groceries){
			totals.push(this.state.groceries[item].total);
		}
		let sum = totals.reduce((a, b) => a + b);
		this.setState({
			grandTotal: sum
		})

		let totalP = document.getElementById('total');
		totalP.classList.remove('hide');
	}

	handleIncrement = (e, index) => {
		let newGrocery = this.state.groceries[index];
		newGrocery.quantity++;
		let newQuantity = newGrocery.quantity;
		const originalPrice = newGrocery.price;
		let newPrice = originalPrice * newQuantity;
		newGrocery.total = newPrice;
		let newArr = this.state.groceries;
		newArr[index] = newGrocery;
		this.setState({
			groceries: newArr
		});
		this.getTotal();
		// document.getElementById('total').classList.add('hide');
	}

	handleDecrement = (e, index) => {
		let newGrocery = this.state.groceries[index];
		if (newGrocery.quantity > 1){
		newGrocery.quantity--;
		let newQuantity = newGrocery.quantity;
		const originalPrice = newGrocery.price;
		let newPrice = originalPrice * newQuantity;
		newGrocery.total = newPrice;
		let newArr = this.state.groceries;
		newArr[index] = newGrocery;
		this.setState({
			groceries: newArr
		});
		this.getTotal();
	} else {
		const itemBorder = e.target.parentElement;
		itemBorder.classList.add('warning');
		setTimeout(function(){
			itemBorder.classList.remove('warning');
		}, 1500);
	}
	}	

	render() {
		let allGroceries = this.state.groceries.map((item, index) => {
			return <ListItem item={item} id={item.id} index={index} removeItem={this.removeItem} 
			editItem={this.editItem} handleIncrement={this.handleIncrement} handleDecrement={this.handleDecrement} />
		})

		return (
			<main>
				<div className="container-fluid">
					<div className="row" id="title-text">
						<h1 className="title">{this.state.websiteName}</h1>
					</div>
					<div className="row">
						<form onSubmit={this.handleSubmit}>
							<input type="text" className="form-control top" placeholder="Add an item..." 
							value={this.state.value} onChange={this.handleChange} id="userInput" />
							<button className="btn btn-primary btn-block top mb-5">+</button>
						</form>
					</div>
					<div>
						<ul className="list-group">
							{allGroceries}
						</ul>
					</div>
					<button className="btn btn-secondary float-right" onClick={this.getTotal}>Get My Total</button>
					<p id="total" className="hide bordered">Grand total: ${this.state.grandTotal}</p>
				</div>
			</main>
		);
	}
}