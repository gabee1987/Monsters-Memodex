import './card.styles.css';

const Card = ({ monster, onClick }) => {
  const { id, pictureId, isShown, isInGame } = monster;

  return (
    <button onClick={onClick}>
      <div className="card-container">
        <img
          id={pictureId}
          alt={`card-${id}`}
          src={`https://robohash.org/${pictureId}?set=set1&size=250x250`}
        />
      </div>
    </button>
  );
};

export default Card;
