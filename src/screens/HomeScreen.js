import React, { useState, useEffect } from "react";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Card,
  Button,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import moment from "moment";
import ScreenHeader from "../components/ScreenHeader";


const HomeScreen = (props) => {
  const [post, setpost] = useState("");
  const [postList, setPostList] = useState([]);

  const getData = async () => {
    await getDataJSON("key").then((data) => {
      if (data == null) {
        setPostList([]);
      } else setPostList(data);
    });
  };

  /*const getData = async () => {
    setPostList(await getDataJSON('key'));
  };*/

  const init = async () => {
    await removeData("key");
  };

  useEffect(() => {
    /*const getData = async () => {
      setPostList(await getDataJSON('key'));
    }*/
    getData();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
        <ScreenHeader props ={props} ></ScreenHeader>
          <Card containerStyle={{ backgroundColor: 'white' }}>
            <Input
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="#152a38" />}
              onChangeText={function (currentInput) {
                setpost(currentInput);
              }}
            />
            <Button buttonStyle={{ borderColor: '#29435c' }}
              title="Post"
              titleStyle={{ color: '#29435c' }}
              type="outline"
              onPress={
                async () => {
                let arr = [
                  ...postList,
                  {
                    name: auth.CurrentUser.name,
                    email: auth.CurrentUser.email,
                    date: moment().utcOffset('+06:00').format("DD MMM, YYYY hh:mm:ss a"),
                    post: post,
                    key: post,
                  },
                ];

                await storeDataJSON("key", arr).then(() => {
                  setPostList(arr);
                  alert("Posted!");
                });
              }} />

          </Card>
          <FlatList
              data={postList}
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    author={item.name}
                    time={item.date}
                    body={item.post}
                    nav = {props}
                  />
                );
              }}
            />
        </View>
      )}
    </AuthContext.Consumer>
      );
};

const styles = StyleSheet.create({
        textStyle: {
        fontSize: 30,
    color: "blue",
  },
  viewStyle: {
        flex: 1,
    backgroundColor: '#D9D2D2'
  },
});

export default HomeScreen;
