import './card-list.styles.css';
import Card from '../card/card.component';

// forwardRef is something that you are honestly only gonna use maybe 2-3-4% of a time max

// components also re-render when props change(just like setState)
// React renders on mounts and re-renders whenever props change and setState gets called
const CardList = ({ monsters }) => (
  <div className='card-list'>
    {monsters.map(monster => (
      <Card key={monster.id} monster={monster} />
    ))}
  </div>
);

export default CardList;
