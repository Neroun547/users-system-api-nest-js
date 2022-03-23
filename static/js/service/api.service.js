export class ApiService {
    async apiCall(url, method, body) {
        if(body) {
            const api = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            });

            const response = await api.json();

            if(!api.ok) {
                return { error: response.message }
            }
            
            return response;
        }

        if(!body) {
            const api = await fetch(url, {
                method: method,
            });

            const response = await api.json();

            if(!api.ok) {
                return { error: response.message }
            }
            
            return response;
        }
    }
};
