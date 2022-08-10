import { Component } from 'react';
import './card.styles.css';

class Card extends Component {
  render() {
    const { monster } = this.props;
    const { name, id } = monster;

    return (
      <div className="card-container">
        <img
          alt={`monster ${name}`}
          src={`https://robohash.org/${id}?set=set1&size=250x280`}
        />
      </div>
    );
  }
}

export default Card;
