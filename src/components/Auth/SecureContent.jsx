import React, { useEffect, useState, Children } from "react";
import { isTokenValid } from "../../API/auth";
import * as SecureStore from "expo-secure-store";

const SecureContent = ({ children, navigation }) => {
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
    if (ValidToken === false) {
      navigation.replace("Login");
    }
  }, [ValidToken]);

  return <>{children}</>;
};

export default SecureContent;
