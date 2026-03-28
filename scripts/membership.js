async function createMembership(Nom, email, localisation, linkedInUrl, mainSector, CurrentRole, Organisation, experienceYears, description, hightDegree, institution, buisnness, EntityName, LegalStructure, StartupStage, ConsultingNiche, Website, HeadOffice, isCompanyHiring, OfferProBonoSession, SeekingPartners, OfferDetails, Bio, Mentoring, ResearchBusinessCollaboration, NAAAWebinarSpeaker, PeerNetworking) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/membership/`, { "Nom": Nom, "email": email, "localisation": localisation, "linkedInUrl": linkedInUrl, "mainSector": mainSector, "CurrentRole": CurrentRole, "Organisation": Organisation, "experienceYears": experienceYears, "description": description, "hightDegree": hightDegree, "institution": institution, "buisnness": buisnness, "EntityName": EntityName, "LegalStructure": LegalStructure, "StartupStage": StartupStage, "ConsultingNiche": ConsultingNiche, "Website": Website, "HeadOffice": HeadOffice, "isCompanyHiring": isCompanyHiring, "OfferProBonoSession": OfferProBonoSession, "SeekingPartners": SeekingPartners, "OfferDetails": OfferDetails, "Bio": Bio, "Mentoring": Mentoring, "ResearchBusinessCollaboration": ResearchBusinessCollaboration, "NAAAWebinarSpeaker": NAAAWebinarSpeaker, "PeerNetworking": PeerNetworking }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/membership/`, { "Nom": Nom, "email": email, "localisation": localisation, "linkedInUrl": linkedInUrl, "mainSector": mainSector, "CurrentRole": CurrentRole, "Organisation": Organisation, "experienceYears": experienceYears, "description": description, "hightDegree": hightDegree, "institution": institution, "buisnness": buisnness, "EntityName": EntityName, "LegalStructure": LegalStructure, "StartupStage": StartupStage, "ConsultingNiche": ConsultingNiche, "Website": Website, "HeadOffice": HeadOffice, "isCompanyHiring": isCompanyHiring, "OfferProBonoSession": OfferProBonoSession, "SeekingPartners": SeekingPartners, "OfferDetails": OfferDetails, "Bio": Bio, "Mentoring": Mentoring, "ResearchBusinessCollaboration": ResearchBusinessCollaboration, "NAAAWebinarSpeaker": NAAAWebinarSpeaker, "PeerNetworking": PeerNetworking }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function updateMembership(membershipId, Nom, email, localisation, linkedInUrl, mainSector, CurrentRole, Organisation, experienceYears, description, hightDegree, institution, buisnness, EntityName, LegalStructure, StartupStage, ConsultingNiche, Website, HeadOffice, isCompanyHiring, OfferProBonoSession, SeekingPartners, OfferDetails, Bio, Mentoring, ResearchBusinessCollaboration, NAAAWebinarSpeaker, PeerNetworking) {
    try {
        let response = null;
        if (token) {
            response = await axios.put(`http://localhost:3000/api/membership/${membershipId}`, { Nom, email, localisation, linkedInUrl, mainSector, CurrentRole, Organisation, experienceYears, description, hightDegree, institution, buisnness, EntityName, LegalStructure, StartupStage, ConsultingNiche, Website, HeadOffice, isCompanyHiring, OfferProBonoSession, SeekingPartners, OfferDetails, Bio, Mentoring, ResearchBusinessCollaboration, NAAAWebinarSpeaker, PeerNetworking }, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.put(`/api/membership/${membershipId}`, { Nom, email, localisation, linkedInUrl, mainSector, CurrentRole, Organisation, experienceYears, description, hightDegree, institution, buisnness, EntityName, LegalStructure, StartupStage, ConsultingNiche, Website, HeadOffice, isCompanyHiring, OfferProBonoSession, SeekingPartners, OfferDetails, Bio, Mentoring, ResearchBusinessCollaboration, NAAAWebinarSpeaker, PeerNetworking }, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function deleteMembership(membershipId) {
    try {
        let response = null;
        if (token) {
            response = await axios.delete(`http://localhost:3000/api/membership/${membershipId}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.delete(`/api/membership/${membershipId}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function getAllMemberships() {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/membership/`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/membership/`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function searchMemberships(query) {
    try {
        let response = null;
        if (token) {
            response = await axios.get(`http://localhost:3000/api/membership/search/${query}`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.get(`/api/membership/search/${query}`, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function approveMembership(Id) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/membership/approve/${Id}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/membership/approve/${Id}`, {}, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

async function rejectMembership(Id) {
    try {
        let response = null;
        if (token) {
            response = await axios.post(`http://localhost:3000/api/membership/reject/${Id}`, {}, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true });
        } else {
            response = await axios.post(`/api/membership/reject/${Id}`, {}, { withCredentials: true });
        }

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}