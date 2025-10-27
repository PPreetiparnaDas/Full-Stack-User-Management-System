import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ✅ Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ================= COUNTRY APIs =================
export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/countries/listCountriesAPI`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching countries:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createCountry = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/countries/createCountryAPI`,
      data,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating country:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ================= STATE APIs =================
export const fetchStates = async () => {
  try {
    const response = await axios.get(`${API_URL}/states/listStatesAPI`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching states:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createState = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/states/createStateAPI`,
      data,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating state:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch states by country
export const fetchStatesByCountry = async (countryId) => {
  try {
    const response = await axios.get(
      `${API_URL}/states/listStatesByCountry/${countryId}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching states by country:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ================= USER APIs =================
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/listUsersAPI`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/users/createUserAPI`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/getUserByIdAPI/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/updateUserAPI/${id}`,
      data,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `${API_URL}/users/deleteUserAPI/${id}`,
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
