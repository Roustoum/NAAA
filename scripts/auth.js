async function getCurrentUser() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/auth/me`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/auth/me`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function signIn(email, password) {
    let response = null;
    try {
        if (token) {
            response = await axios.post(`http://localhost:3000/api/auth/login`, { email, password }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/auth/login`, { email, password }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function logOut() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/auth/logout`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/auth/logout`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function handleLogOut(event) {
    event.preventDefault();

    // Récupère l'élément <a> même si on clique sur le SVG
    const link = event.target.closest('a');
    const redirectUrl = link.getAttribute('href');

    try {
        await logOut();
        window.location.href = redirectUrl;
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
}

async function forgotPassword(email) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/auth/forgotpassword`, { email }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/auth/forgotpassword`, { email }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function resetPassword(token, password, confirmPassword) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/auth/resetPassword/${token}`, { password, confirmPassword }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/auth/resetPassword/${token}`, { password, confirmPassword }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updatePassword(currentPassword, password) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/auth/updatePassword`, { currentPassword, password }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/auth/updatePassword`, { currentPassword, password }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updateProfile(username, email, image) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);

        // Vérifier si une image a été sélectionnée
        if (image && image instanceof File) {
            // Ajouter le fichier avec le bon nom de champ
            formData.append('image', image, image.name);
            console.log('Image ajoutée au FormData:', image.name, image.type, image.size);
        } else {
            console.log('Aucune image sélectionnée');
        }

        // Afficher le contenu du FormData pour déboguer
        for (let pair of formData.entries()) {
            if (pair[1] instanceof File) {
                console.log(pair[0], pair[1].name, pair[1].type);
            } else {
                console.log(pair[0], pair[1]);
            }
        }

        let response = null;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data', // Important pour les fichiers
            },
            withCredentials: true
        };

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            response = await axios.put(`http://localhost:3000/api/auth/`, formData, config);
        } else {
            response = await axios.put(`/api/auth/`, formData, config);
        }

        return response.data;
    } catch (error) {
        console.error('Erreur dans updateProfile:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.message || error.message };
    }
}

async function allUsers() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/auth/all`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/auth/all`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(userId) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/auth/delete/${userId}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/auth/delete/${userId}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

function setImageWithFallback(imgElement, imageUrl, fallbackUrl = "/assets/Images/user.webp") {
    imgElement.src = token ? `http://localhost:3000/images/${imageUrl}` : `/images/${imageUrl}` || fallbackUrl;
    imgElement.onerror = function () {
        this.src = fallbackUrl;
        this.onerror = null; // Évite les boucles infinies
    };
}