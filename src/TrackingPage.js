import React, { useEffect, useState } from "react";
import axios from "axios";

const TrackingPage = () => {

    const [resp, setResp] = useState([]);

    const fetchTracking = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => {
                setResp(response?.data || []);
            })
            .catch(error => {
                console.log("error");
                console.log(error);
            })
    };

    useEffect(() => {
        fetchTracking();
    }, [])

    return (
        resp?.length ? <div>
            <pre>{JSON.stringify(resp, null, 2)}</pre>
        </div> :
            <div>
                <h1>Unable to fetch</h1>
            </div>
    );
};

export default TrackingPage;
