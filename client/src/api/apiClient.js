import {apiRequest} from "./apiRequest";

export const apiClient = {
    tasks: {
        all: () => apiRequest('/api/task/all', 'GET'),
        pagination: (query) => apiRequest('/api/task/pagination', 'GET', query),
        add: (query, body) => apiRequest('/api/task/add', 'POST', query, body),
        update: (query, body) => apiRequest('/api/task/update', 'POST', query, body),
    },
    admin: {
        login: (body) => apiRequest('api/admin/login', 'POST', {}, body),
        isAuth: () => apiRequest('api/admin/is-auth', 'POST')
    }
}