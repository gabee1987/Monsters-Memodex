import { Component } from 'react';
import './card-list.styles.css';

import Card from '../card/card.component.jsx';

class CardList extends Component {
  render() {
    const { monsters } = this.props;

    console.log('card-list component');
    console.log(monsters);
    return (
      <div className="card-list">
        {monsters.map((monster) => {
          return <Card key={monster.id} monster={monster} />;
        })}
      </div>
    );
  }
}

export default CardList;
