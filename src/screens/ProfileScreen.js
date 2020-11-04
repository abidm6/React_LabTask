import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Card } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import ImageUpload from "../components/ImageUpload";
import ScreenHeader from "../components/ScreenHeader";
import { removeData} from "../functions/AsyncStorageFunctions";

const ProfileScreen = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ScreenHeader props = {props} ></ScreenHeader>
          <View style={{justifyContent:"center",marginHorizontal:125,marginVertical:40}}>
            <ImageUpload props={props} />
           
            </View>
          <Card containerStyle={{ backgroundColor: "#6ca7eb"}}>
            <View style={styles.cardViewStyle}>
              <Text style={styles.textStyle}>
                Name: {auth.CurrentUser.name}
              </Text>
            </View>
          </Card>
          <Card containerStyle={{ backgroundColor: "#6ca7eb"}}>
            <View style={styles.cardViewStyle}>
              <Text style={styles.textStyle}>
                Born On: {auth.CurrentUser.date}
              </Text>
            </View>
          </Card>
          <Card containerStyle={{ backgroundColor: "#6ca7eb"}}>
            <View style={styles.cardViewStyle}>
              <Text style={styles.textStyle}>
                Address: {auth.CurrentUser.homeAddress}
              </Text>
            </View>
          </Card>
          <Card containerStyle={{ backgroundColor: "#6ca7eb"}}>
            <View style={styles.cardViewStyle}>
              <Text style={styles.textStyle}>
                Works at: {auth.CurrentUser.workAddress}
              </Text>
            </View>
          </Card>

          <Card.Divider/>

          <View style = {{flexDirection: "column", alignItems: "center"}}>

          <Button  buttonStyle={{ borderColor: 'black' }}
              title="Delete Profile!"
              titleStyle={{ color: '#29435c' }}
              type="outline"
              type="solid"
              onPress={function () {
                removeData(auth.CurrentUser.email);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />

            </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  viewStyle: {
    flex: 1,
    
  },
  cardViewStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ProfileScreen;
