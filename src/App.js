import './App.css';
import React, { Component } from 'react';

// local state or just state for short is just some info that only this component is aware of and can modify
// and could read from
export default class App extends Component {
  constructor() {
    super();

    // initial state of monsters is empty array, because if you fail in a middle of API request,
    // then what would it matter for a user to see? The user should not see anything that they
    // should just see the fact there is empty array(nothing should display them)
    // because nothing was properly fetched.
    this.state = {
      monsters: [],
    };
    console.log(1);
  }

  // When do I get the list? How do I get the list? Where do I put the list?(it's gonna be in our state)
  // Mounting is the first time a component gets placed on to the DOM. So the first time React renders
  // a component onto the page that is mounting. It only happens once through a component's life.
  // The only time when a component might re-mounts is if it's been unmounting, meaning it's been
  // completely removed from the DOM and you could almost argue that it's a different component.
  // Whenever we have a component(a class component specifically), that needs to leverage some kind of
  // API call in order to get data that it needs in order to display the appropriate UI, you wanna put that
  // inside of your componentDidMount lifecycle method.
  componentDidMount() {
    console.log(3);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState(() => ({ monsters: users })));
  }

  render() {
    console.log(2);
    return (
      <div className='App'>
        {this.state.monsters.map(({ name, id }) => (
          <div key={id}>
            <h1>{name}</h1>
          </div>
        ))}
      </div>
    );
  }
}
