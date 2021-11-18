import {API_URL} from "./creds";

export default async function graphQL (query) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query { ${query} }`
            }),
        })
        return (await res.json()).data
    } catch (error) {
        console.log(error)
    }
}