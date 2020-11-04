import React, { useState } from "react";
import { View, StyleSheet,Text } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { Feather, AntDesign, Ionicons, Entypo, MaterialIcons} from "@expo/vector-icons";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import DatePicker from 'react-native-datepicker'


const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [DOB, setDOB] = useState()
  const [HomeAddress, setHomeAddress] = useState("")
  const [WorkAddress, setWorkAddress] = useState("");

  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to The Blog App!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Ionicons name="ios-person" size={24} color="#B30205" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="#B30205" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        />
        <Input
          leftIcon={<Entypo name="email" size={24} color="#B30205" />}
          placeholder="E-mail Address"
          onChangeText={function (currentInput) {
            setEmail(currentInput);
          }}
        />

        <Input
          placeholder="Password"
          leftIcon={<Feather name="key" size={24} color="#B30205" />}
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
        format="DD-MM-YYYY"
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

      <Input
          placeholder="Home Address"
          leftIcon={<Entypo name="address" size={24} color="#B30205" />}
          onChangeText={function (currentInput) {
            setHomeAddress(currentInput);
          }}
        />
         <Input
          placeholder="Work Address"
          leftIcon={<MaterialIcons name="work" size={24} color="#B30205" />}
          onChangeText={function (currentInput) {
            setWorkAddress(currentInput);
          }}
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
              homeAddress: HomeAddress,
              workAddress: WorkAddress,
            };
            alert("Signed Up!");
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
    backgroundColor: "#D9D2D2",
  },
});
export default SignUpScreen;
