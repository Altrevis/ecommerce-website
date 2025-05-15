// filepath: /ecommerce-website/ecommerce-website/src/utils/api.js

// Définit l'URL de base de l'API backend
const API_BASE_URL = 'http://localhost:8000/api'; // À adapter selon ton environnement

// Fonction pour effectuer des requêtes GET
export const get = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Retourne la réponse JSON
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Fonction pour effectuer des requêtes POST
export const post = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Retourne la réponse JSON
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Fonction pour effectuer des requêtes PUT (mise à jour)
export const put = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Retourne la réponse JSON
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// Fonction pour effectuer des requêtes DELETE (suppression)
export const del = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Retourne la réponse JSON
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};