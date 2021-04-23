import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import axios from "axios"

const baseUrl = "http://localhost:5500/api"

function HomeScreen() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState(null);

  const Login = async() => {
    const user = {
      text,password
    }
    const res =  await axios.post(`${baseUrl}/login`, user) 
    if(res){
      navigation.navigate("List");
    } else {
      alert("user not found")
    }
  }



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.textLogin}>Login</Text>
      <View style={styles.containerView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="username"
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="password"
          secureTextEntry
        />
      </View>
      <View style={styles.btn}>
        <View style={styles.btnlogin}>
          <Button
            title="Login"
            onPress={() => {Login()}}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

function List() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.containerList}>
        <View style={styles.buttonC}>
          <Button
            title="Check In"
            color="#dc143c"
            onPress={() => navigation.navigate("MyModal")}
          />
        </View>
        <View>
          <Button
            title="Logout"
            color="#000000"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <RootStack.Screen name="List" component={List} />
    </RootStack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  textLogin: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    padding: 12,
    borderWidth: 1,
  },
  btn: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  containerView: {
    width: "100%",
    alignItems: "center",
  },
  btnlogin: {
    width: "50%",
    marginHorizontal: 10,
    textAlign: "center",
  },
  containerList: {
    flexDirection: "row",
  },
  buttonC: {
    marginRight: 20,
  },
});
