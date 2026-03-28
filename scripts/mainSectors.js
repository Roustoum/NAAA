async function createMainSector(Nom) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/mainSector/`, { Nom }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/mainSector/`, { Nom }, { withCredentials: true });
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updateMainSector(Id, Nom) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/mainSector/${Id}`, { Nom }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/mainSector/${Id}`, { Nom }, { withCredentials: true });
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function deleteMainSector(Id) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/mainSector/${Id}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/mainSector/${Id}`, { withCredentials: true });
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllMainSectors() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/mainSector/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/mainSector/`, { withCredentials: true });
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function searchMainSector(query) {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/mainSector/search/${query}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/mainSector/search/${query}`, { withCredentials: true });
        }
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}