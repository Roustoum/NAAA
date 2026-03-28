async function getAnalytics() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/analytics/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/analytics/`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getMembersToday() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/analytics/membersToday`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/analytics/membersToday`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getMembersVsLastMonth() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/analytics/membersAnalytics`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/analytics/membersAnalytics`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getCurrentMonth = () => {
    const now = new Date();
    return now.getMonth() + 1;
};

const getPreviousMonth = (currentMonth) => {
    return currentMonth === 1 ? 12 : currentMonth - 1;
};

const getPreviousMonthYear = (currentMonth, currentYear) => {
    return currentMonth === 1 ? currentYear - 1 : currentYear;
};