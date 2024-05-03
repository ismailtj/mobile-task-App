import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import SecureContent from "./Auth/SecureContent";
import SwipeableListItem from "./SwipeableListItem";
import * as TaskApi from "../API/Tasks";
import { useFocusEffect } from "@react-navigation/native";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState();

  const handleTaskPress = (task) => {
    navigation.navigate("TaskDetail", { task });
  };

  const handleDeleteTask = async (taskId) => {
    await TaskApi.deleteTask(taskId);
    refreshTasks();
  };

  const renderTaskItem = ({ item }) => (
    <SwipeableListItem
      item={item}
      onDelete={handleDeleteTask}
      onPress={handleTaskPress}
    />
  );

  const refreshTasks = async () => {
    const newTasksList = await TaskApi.getAllTasks();
    setTasks(newTasksList.taskList);
  };

  useEffect(() => {
    refreshTasks();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      refreshTasks();
    }, [])
  );

  return (
    <SecureContent navigation={navigation}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </SecureContent>
  );
};

export default TaskList;
