import { useEffect, useState } from "react";

function DataFetcher(){
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const endpoint = 'https://cf.nascar.com/cacher/2025/race_list_basic.json';

    useEffect(() => {
        // API Endpoint
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('failed to fetch');
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(err => setError(err.message));
    }, []);

    return (
        <div>
        {error && <p>Error: {error}</p>}
        {data ? (
            data.series_1.map((race, index) => (
            <div key={index}>
                <h3>{race.race_name}</h3>
                <p>Date: {new Date(race.race_date).toLocaleString()}</p>
                <p>Track: {race.track_name}</p>
                <p>Comments: {race.race_comments}</p>
                <hr />
            </div>
            ))
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );

}
export default DataFetcher