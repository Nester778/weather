import "./SmallCard.css";

export default function SmallCard(prop) {
    return (
        <div className="smallCard-wrapper">
            {prop.smallCardInfo.map(item => (
                <div className="smallCard" id={prop.id}>
                    <p>{item.time}</p>
                    <img className="bigCard__main-img" src={item.icon} alt="" />
                    <h5>{item.temp}°</h5>
                </div>
            ))}
        </div>
    );
}