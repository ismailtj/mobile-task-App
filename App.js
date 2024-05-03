import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskList from "./src/components/TaskList";
import LoginScreen from "./src/components/Auth/LoginScreen";
import TaskDetailScreen from "./src/components/TaskDetailScreen";
import { Button } from "react-native";
import AddTaskForm from "./src/components/AddTaskForm";
import EditTaskScreen from "./src/components/EditTaskScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskApp">
          <Stack.Screen
            name="Home"
            component={TaskList}
            options={({ navigation }) => ({
              title: "Task List",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate("AddTask")}
                  title="Add"
                  color="#007bff" // Couleur du bouton (bleu par défaut)
                />
              ),
            })}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetailScreen}
            options={{ title: "Task Detail" }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTaskForm}
            options={{ title: "Add Task" }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{ title: "Edit Task" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

