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
    // So in this case, we want to think about what's known as the empty case or the null case.
    // monsters is a list of users. So what's an empty version of that? Well, it's an empty list
    // or an empty array.
    this.state = {
      monsters: [],
    };
  }

  // When do I get the list? How do I get the list? Where do I put the list?(it's gonna be in our state)
  // How?
  componentDidMount() {}

  render() {
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
