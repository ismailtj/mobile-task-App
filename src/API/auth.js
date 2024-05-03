import axios from "react-native-axios";
import vars from "../vars";

export const login = async (username, password) => {
  try {
    const res = await axios.post(`${vars.API_ENDPOINT}/auth/login`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("Erreur de connexion :", err);
  }
};

export const isTokenValid = async (tkn) => {
  try {
    const res = await axios.get(`${vars.API_ENDPOINT}/auth/tokenValid`, {
      headers: { Authorization: tkn },
    });
    if (res.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("token validation error :", error);
    return false;
  }
};
