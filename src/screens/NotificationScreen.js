import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import ScreenHeader from "../components/ScreenHeader";
const NotificationScreen = (props) => {

  //console.log(props)
  return ( 
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ScreenHeader props ={props} ></ScreenHeader>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "thumbs-o-up",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                Notifications Show Here
              </Text>
            </View>
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: '#D9D2D2'
  },
});

export default NotificationScreen;
