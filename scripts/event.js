async function createEvent(title, description, date, presenter, image) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('presenter', presenter);

        // Vérifier si une image a été sélectionnée
        if (image && image instanceof File) {
            // Ajouter le fichier avec le bon nom de champ
            formData.append('image', image, image.name);
            console.log('Image ajoutée au FormData:', image.name, image.type, image.size);
        } else {
            console.log('Aucune image sélectionnée');
        }
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/event/`, formData, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/event/`, formData, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updateEvent(eventId, title, description, date, presenter, image) {
    try {
        let response = null;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', date);
        formData.append('presenter', presenter);

        // Vérifier si une image a été sélectionnée
        if (image && image instanceof File) {
            // Ajouter le fichier avec le bon nom de champ
            formData.append('image', image, image.name);
            console.log('Image ajoutée au FormData:', image.name, image.type, image.size);
        } else {
            console.log('Aucune image sélectionnée');
        }
        if (token) {
            response = await axios.put(`http://localhost:3000/api/event/${eventId}`, formData, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/event/${eventId}`, formData, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function deleteEvent(eventId) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/event/${eventId}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/event/${eventId}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllEvents() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/event/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/event/`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function searchEvents(query) {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/event/search/${query}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/event/search/${query}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }

}