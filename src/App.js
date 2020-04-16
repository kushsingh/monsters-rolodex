import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';


class App extends Component {
    constructor() {
        super();
        
        this.state = {
            monsters : [],
            searchField: ''
        }

        //this.handleChange = this.handleChange.bind(this); // not required beacuse arrow function change the context of this.
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json() )
            .then(users => this.setState({ monsters: users }));
    }

    // For refrance
    // onChange={e => {
    //     this.setState({ searchField : e.target.value }, () =>
    //         console.log(this.state)
    //     );
    // }}

    //lexical scoping which just means that they bind this context to the place where they were defined in the first place 
    onSearchChange = event => {
        this.setState({ searchField : event.target.value })
    }
    

    render() {
        const { monsters, searchField } = this.state; // destructuring Array, Same as below
        // const monster = this.state.monsters;
        // const searchField = this.state.searchField;
        const filteredMonsters = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
        );

        return (
            <div className="App">
                <h1>Monster Rolodex</h1>
                <SearchBox placeholder='Search Monster' onSearchChange={this.onSearchChange}    
                />
                <CardList monsters={filteredMonsters}> </CardList>
            </div>
        );
    }
}

export default App;
