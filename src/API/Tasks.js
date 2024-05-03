import axios from "react-native-axios";
import vars from "../vars";
import * as SecureStore from "expo-secure-store";

export const getAllTasks = async () => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.get(`${vars.API_ENDPOINT}/task`, {
      headers: { Authorization: tkn },
    });
    return res.data;
  } catch (error) {
    console.log("getting all tasks error :", error);
  }
};
export const getTaskByID = async (id) => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.get(`${vars.API_ENDPOINT}/task/${id}`, {
      headers: { Authorization: tkn },
    });
    return res.data;
  } catch (error) {
    console.log("getting task by id error :", error);
  }
};
export const addNewTask = async (title, user) => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.post(
      `${vars.API_ENDPOINT}/task`,
      { title, user },
      {
        headers: { Authorization: tkn },
      }
    );
    return res.data;
  } catch (error) {
    console.log("add new task error :", error);
  }
};
export const deleteTask = async (taskId) => {
  const tkn = await SecureStore.getItemAsync("token");
  try {
    const res = await axios.delete(`${vars.API_ENDPOINT}/task/${taskId}`, {
      headers: { Authorization: tkn },
    });
    return res.data;
  } catch (error) {
    console.log("delete task error :", error);
  }
};

export const updateTask = async (newTask, taskId) => {
  const tkn = await SecureStore.getItemAsync("token");
  console.log(newTask);
  console.log(taskId);
  try {
    const res = await axios.put(
      `${vars.API_ENDPOINT}/task/${taskId}`,
      { title: newTask.title, user: newTask.user, done: newTask.done },
      {
        headers: { Authorization: tkn },
      }
    );
    return res.data;
  } catch (error) {
    console.log("update task error :", error);
  }
};
