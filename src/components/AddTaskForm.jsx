import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as UserApi from "../API/User";
import * as TaskApi from "../API/Tasks";
import { Picker } from "@react-native-picker/picker";
import SecureContent from "./Auth/SecureContent";
import { useNavigation } from "@react-navigation/native";

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [selectedUser, setSelectedUser] = useState(); // Initial user selection
  const [UserList, setUserList] = useState();
  const navigation = useNavigation();

  const handleAddTask = async () => {
    // Perform action to add the task here
    console.log("Task Name:", taskName);
    console.log("Selected User:", selectedUser);
    await TaskApi.addNewTask(taskName, selectedUser);
    navigation.goBack();
  };

  const loadUsers = async () => {
    const res = await UserApi.getAllUsers();
    setUserList(res.userList);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <SecureContent navigation={navigation}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Add New Task</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 20,
          }}
          placeholder="Task Name"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />

        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}
          style={{ height: 50 }}
        >
          {UserList?.map((user, key) => (
            <Picker.Item label={user.username} key={key} value={user._id} />
          ))}
        </Picker>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </SecureContent>
  );
};

export default AddTaskForm;
