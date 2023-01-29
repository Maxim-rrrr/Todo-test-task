import { serialize } from "./serialize";

export async function apiRequest(url, method = 'GET', query = {}, body = null, headers = {}) {
    headers.authorization = localStorage.getItem('auth_token')
    headers['Content-Type'] = 'application/json'

    if (0 < Object.keys(query).length) {
        url = `${url}?${serialize(query)}`;
    }
    
    const response = await fetch(url, {method, body: body ? JSON.stringify(body) : null, headers})
    const data = await response.json()
    return data
}