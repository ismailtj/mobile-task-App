import axios from "react-native-axios";
import vars from "../vars";
import * as SecureStore from "expo-secure-store";

export const getUserById = async (userId) => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.get(`${vars.API_ENDPOINT}/user/${userId}`, {
      headers: { Authorization: tkn },
    });
    return res.data;
  } catch (error) {
    console.log("getting user by id error :", error);
  }
};

export const getAllUsers = async () => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.get(`${vars.API_ENDPOINT}/user`, {
      headers: { Authorization: tkn },
    });
    return res.data;
  } catch (error) {
    console.log("getting all users error :", error);
  }
};
