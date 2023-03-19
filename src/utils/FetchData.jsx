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
        const response = await fetch(url, options);
        const json = await response.json();
        console.log({url, options,data: json});
        return json;
    } catch (error) {
        console.error(error);
        return null;
    }
}
