import React, { Component } from 'react';
import './App.css';
import ListItem from './Components/ListItems';
import data from './Json.json';
import uuid from 'uuid';

export default class App extends Component {
	state = {
		websiteName: 'My Grocery List',
		groceries: [],
		value: ''
	};

	componentDidMount(){
		this.setState({
			groceries: data.groceries
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
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

	render() {
		let allGroceries = this.state.groceries.map((item) => {
			return <ListItem item={item} id={item.id} removeItem={this.removeItem} />
		})
		return (
			<main>
				<div className="container-fluid">
					<div className="row">
						<h1>{this.state.websiteName}</h1>
					</div>
					<div className="row">
						<form onSubmit={this.handleSubmit}>
							<input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
							<button className="btn btn-primary btn-block">+</button>
						</form>
					</div>
					<div>
						<ul className="list-group">
							{allGroceries}
						</ul>
					</div>
				</div>
			</main>
		);
	}
}

// CHOOSE ONE OF THE PROMPTS BELOW FOR YOUR PROJECT 1

// Grocery List Project
// BRIEF: Create a grocery list application that will render out a grocery list of items from the JSON data
// Each item should display a name and a price at minimum.
// 1. There should be an input field and a button that allows a user to add a grocery item to the list
// 2. Your grocery list should be kept in a json file and then loaded into the State of your application.
// 3. Each grocery list item should be a new Component and you will pass the items information to the list with props
// 4. You should use the .map function to iterate the items in the list into Components
// 5. After the user adds the grocery item, make sure to clear the input for a good user experience!
// 6. You should be able to remove items from the Grocery list

// BONUSES:
// 1. Can you make it so that each item in the list could be editable?
// 2. Can you make a button or a value that would print out the total of each item in the list?
// 3. Can you do data validation so that if someone trys to submit an input without any text in it they get an error?

// ## Chat Bot Project
// * *BRIEF*: Create a chat bot application that will allow a user to communicate with a Bot.
// * 1. There should be an input field and a button that allows a user to add a message item to the conversation
// * 2. The chatbot should utilize JSON data to store canned responses from the bot!
// * 3. The conversation should be stored in the State object of a Component, rendered initially from a JSON file.
// * 4. You should use the .map function to iterate the messages into into Components
// * 5. After the user adds a message item, make sure to clear the input for a good user experience!

// * BONUSES:
// * 1. Can you make it so a user could delete a message?
// * 2. Can you make it so that there is a delay between when the user submits their message and the chatbot responds?
// * 3. Can you do data validation to make sure that the user has typed a message before allowing them to submit?
// * 4. Can you make the robot respond dynamically to a message if they robot does not understand it. (for example, if the robot asks "Do you want to eat icecream or cookies" and the user says "a burger" can you make the robot say "Sorry, I do not understand?")
