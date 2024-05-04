const Country = ({name, capital, area, languages, flag}) => {
    return (
        <div>
            <h2>{name}</h2>
            <p>capiatal {capital}</p>
            <p>area {area}</p>
            <h4>languages:</h4>
            <ul>
                {languages && languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
            <figure className="image">
                <img src={flag} alt={`Flag of ${name}`} />
            </figure>
        </div>
    )
}
export default Country