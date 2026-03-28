async function createMeeting(title, tag, link, date) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/meeting/`, { title, tag, link, date }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/meeting/`, { title, tag, link, date }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updateMeeting(meetingId, title, tag, link, date) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/meeting/${meetingId}`, { title, tag, link, date }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/meeting/${meetingId}`, { title, tag, link, date }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteMeeting(Id) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/meeting/${Id}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/meeting/${Id}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getAllMeetings() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/meeting/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/meeting/`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}