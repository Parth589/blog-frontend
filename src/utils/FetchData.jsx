export default async function request(url, method, data = null) {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    };
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        console.log({url, options});
        const response = await fetch(url, options);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}
