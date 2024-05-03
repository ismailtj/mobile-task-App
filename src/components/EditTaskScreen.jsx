import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as UserApi from "../API/User";
import * as TaskApi from "../API/Tasks";
import { Picker } from "@react-native-picker/picker";
import SecureContent from "./Auth/SecureContent";

const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params; // Récupère la tâche à éditer depuis les params de navigation
  const [taskName, setTaskName] = useState(task.title);
  const [selectedUser, setSelectedUser] = useState(task.user); // Initial user selection
  const [UserList, setUserList] = useState();
  const [TaskDone, setTaskDone] = useState();

  const handleEditTask = async () => {
    await TaskApi.updateTask(
      { title: taskName, user: selectedUser, done: TaskDone },
      task._id
    );

    navigation.goBack();
  };
  const loadUsers = async () => {
    const res = await UserApi.getAllUsers();
    setUserList(res.userList);
  };
  const loadTask = async () => {
    const res = await TaskApi.getTaskByID(task._id);
    console.log(res);
    setTaskName(res.task.title);
    setSelectedUser(res.task.user);
    setTaskDone(res.task.done);
  };
  useEffect(() => {
    loadUsers();
    loadTask();
  }, []);

  return (
    <SecureContent navigation={navigation}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Task</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="Task Name"
          value={taskName} // Affiche le nom de la tâche à éditer
          onChangeText={(text) => setTaskName(text)} // Met à jour le nom de la tâche dans le state
        />
        {/* Autres champs à éditer selon les besoins */}
        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
          style={{ height: 50 }}
        >
          {UserList?.map((user, key) => (
            <Picker.Item label={user.username} key={key} value={user._id} />
          ))}
        </Picker>
        <Button title="Save Changes" onPress={handleEditTask} />
      </View>
    </SecureContent>
  );
};

export default EditTaskScreen;
