async function createContact(Nom, email, message) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/contact/`, { Nom, email, message }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/contact/`, { Nom, email, message }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllContacts() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/contact/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/contact/`, { withCredentials: true });
        }

        return response.data.contact;
    } catch (error) {
        console.log(error);
    }
}

async function searchContact(query) {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/contact/search/${query}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/contact/search/${query}`, { withCredentials: true });
        }

        return response.data.contact;
    } catch (error) {
        console.log(error);
    }
}

async function updateContact(Nom, email, message) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/contact/`, { Nom, email, message }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/contact/`, { Nom, email, message }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteContact(contactId) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/contact/${contactId}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/contact/${contactId}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}