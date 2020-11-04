import React from 'react'
import {Header} from "react-native-elements";
import {AuthContext} from "../providers/AuthProvider";


const ScreenHeader = ({props}) => {

return(
    <AuthContext.Consumer>
      {(auth) => (

<Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "Blog App", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />    )}
          </AuthContext.Consumer>
)}

export default ScreenHeader