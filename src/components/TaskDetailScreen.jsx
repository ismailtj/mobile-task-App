import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as UserApi from "../API/User";
import * as TaskApi from "../API/Tasks";
import { useFocusEffect } from "@react-navigation/native";
import SecureContent from "./Auth/SecureContent";

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const [taskName, setTaskName] = useState(task.title);
  const [selectedUser, setSelectedUser] = useState(task.user); // Initial user selection
  const [User, setUser] = useState();
  const [TaskDone, setTaskDone] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate("EditTask", { task: task })}
          title="Edit"
          color="#007bff" // Couleur du bouton (bleu par défaut)
        />
      ),
    });
  }, [navigation]);
  const loadUser = async () => {
    const res = await UserApi.getUserById(task.user);
    console.log(res.user);
    setUser(res.user);
  };
  const loadTask = async () => {
    const res = await TaskApi.getTaskByID(task._id);
    console.log(res);
    setTaskName(res.task.title);
    setSelectedUser(res.task.user);
    setTaskDone(res.task.done);
  };
  const handlDone = async () => {
    await TaskApi.updateTask(
      { title: taskName, user: selectedUser, done: true },
      task._id
    );
    loadUser();
    loadTask();
  };
  useEffect(() => {
    loadUser();
    loadTask();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      loadUser();
      loadTask();
    }, [])
  );

  return (
    <SecureContent navigation={navigation}>
      <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{taskName}</Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}>
          assigned to : {User?.username}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 16 }}>id : {task._id}</Text>
        {TaskDone == false ? (
          <TouchableOpacity style={styles.button} onPress={() => handlDone()}>
            <Text style={styles.buttonText}>done</Text>
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </SecureContent>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2c92ff",
    borderRadius: 50, // Adjust the border radius as needed
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    height: 80,
    width: 80,
    bottom: 0,
    right: 0,
    marginRight: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TaskDetailScreen;
