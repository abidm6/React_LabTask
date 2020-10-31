import React, { useState } from "react";
import { View, StyleSheet,Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import DatePicker from 'react-native-datepicker'


const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DOB, setDOB] = useState()

  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to AuthApp!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        />
        <Input
          leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
          placeholder="E-mail Address"
          onChangeText={function (currentInput) {
            setEmail(currentInput);
          }}
        />

        <Input
          placeholder="Password"
          leftIcon={<Feather name="key" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={function (currentInput) {
            setPassword(currentInput);
          }}
        />

        
        <DatePicker
        style={{width: 200}}
        mode="date"
        placeholder="Date of Birth"
        date = {DOB}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 7,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            left: 7,
            bottom: 7,
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={
          setDOB
        }
      />

        <Button
          icon={<AntDesign name="user" size={24} color="white" />}
          title="  Sign Up!"
          type="solid"
          onPress={function () {
            let currentUser = {
              name: Name,
              sid: SID,
              email: Email,
              password: Password,
              date: DOB,
            };
            storeDataJSON(Email, currentUser);
            props.navigation.navigate("SignIn");
          }}
        />
        <Button
          type="clear"
          icon={<AntDesign name="login" size={24} color="dodgerblue" />}
          title="  Already have an account?"
          onPress={function () {
            props.navigation.navigate("SignIn");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
});
export default SignUpScreen;
