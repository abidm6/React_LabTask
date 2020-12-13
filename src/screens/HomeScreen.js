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
import * as firebase from "firebase";
import "firebase/firestore";


const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  const loadPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
      })
      .catch((error) => {

        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
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
              onChangeText={function (currentText) {
                setInput(currentText);
              }}
            />
            <Button buttonStyle={{ borderColor: '#29435c' }}
              title="Post"
              titleStyle={{ color: '#29435c' }}
              type="outline"
              onPress={
                function () {
                  firebase
                    .firestore()
                    .collection("posts")
                    .add({
                      userId: auth.CurrentUser.uid,
                      body: input,
                      author: auth.CurrentUser.displayName,
                      created_at: firebase.firestore.Timestamp.now(),
                      likes: [],
                      comments: [],
                    })
                    .then((doc) => {
                      alert("Post created Successfully!  PostID: " + doc.ZE.path.segments[1] );
                    })
                    .catch((error) => {
                      alert(error);
                    });
                }} />

          </Card>
          <FlatList
              data={posts}
              renderItem={({ item }) =>  {
                return (
                  <PostCard
                    author={item.data.author}
                    time={item.data.created_at.toDate().toString()}
                    body={item.data.body}
                    authorID={item.data.userId}
                    postID={item.id}
                    userID={auth.CurrentUser.uid}
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
