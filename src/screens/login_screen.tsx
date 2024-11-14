import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username == "admin" && password == "admin") {
      navigation.navigate("Home");
    } else if (
      username == null ||
      password == null ||
      username == "" ||
      password == ""
    ) {
      alert("Please fill in both fields");
    } else {
      alert("Wrong combination, please check again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color="#4682B4" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default LoginScreen;
