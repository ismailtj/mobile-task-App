import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { isTokenValid, login } from "../../API/auth";

const LoginScreen = ({ navigation }) => {
  const [UserName, setUserName] = useState("");
  const [Pwd, setPwd] = useState("");
  const [ValidToken, setValidToken] = useState();

  useEffect(() => {
    const isVtoken = async () => {
      try {
        const tkn = await SecureStore.getItemAsync("token");
        const isvalid = await isTokenValid(tkn);
        setValidToken(isvalid);
      } catch (error) {
        console.log("token Validation error", error);
      }
    };
    isVtoken();
    if (ValidToken === true) {
      navigation.replace("Home");
    }
  }, [ValidToken]);

  const handleUsrname = (usrnm) => {
    setUserName(usrnm);
  };
  const handlePwd = (pwd) => {
    setPwd(pwd);
  };

  const handleLogin = async () => {
    const res = await login(UserName, Pwd);
    SecureStore.setItem("token", res.token);
    navigation.replace("Home");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Username"
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          width: "80%",
        }}
        onChangeText={handleUsrname} // Bind onChangeText to update state
        value={UserName} // Bind the input value to the state
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          width: "80%",
        }}
        onChangeText={handlePwd} // Bind onChangeText to update state
        value={Pwd} // Bind the input value to the state
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
