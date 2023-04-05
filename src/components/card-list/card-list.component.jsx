import { Component } from 'react';

export default class CardList extends Component {
  render() {
    console.log(this.props.monsters);
    console.log('render from CardList');

    // components also re-render when props change(just like setState)
    // React renders on mounts and re-renders whenever props change and setState gets called
    const { monsters } = this.props;

    return (
      <div className='card-list'>
        {monsters.map(monster => (
          <h1 key={monster.id}>{monster.name}</h1>
        ))}
      </div>
    );
  }
}
