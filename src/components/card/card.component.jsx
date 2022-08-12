import './card.styles.css';
import CardBack from '../../assets/card-back.png';

const Card = ({ card, onClick }) => {
  const { id, pictureId, isShown, isInGame } = card;

  const handleClick = () => {
    onClick(card);
    //console.log('singleCard clicked: ', card);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-body">
        <div className="card-front">
          <img
            id={pictureId}
            alt={`card-${id}`}
            src={`https://robohash.org/${pictureId}?set=set1&size=250x250`}
          />
        </div>
        <div className="card-back">
          <img src={CardBack} alt={`card-back-${id}`} />
        </div>
      </div>
    </div>
  );
};

export default Card;
