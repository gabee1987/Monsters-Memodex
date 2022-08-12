import './card.styles.css';

const Card = ({ card, onClick }) => {
  const { id, pictureId, isShown, isInGame } = card;

  const handleClick = () => {
    onClick(card);
    //console.log('singleCard clicked: ', card);
  };

  return (
    // <button >
    <div className="card-container" onClick={handleClick}>
      <img
        id={pictureId}
        alt={`card-${id}`}
        src={`https://robohash.org/${pictureId}?set=set1&size=250x250`}
      />
    </div>
    // </button>
  );
};

export default Card;
