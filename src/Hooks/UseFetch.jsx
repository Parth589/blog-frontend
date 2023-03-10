import {useEffect, useState} from "react";

const UseFetch = (url, method, body) => {
    const effect = async () => {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const d = await response.json();
        if (!d.success)
            return setError(d.msg)
        setData(d);
    }
    useEffect(() => {
        effect().then();
    }, [])
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    return [data, error];
};

export default UseFetch;