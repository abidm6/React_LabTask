import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { storeDataJSON, getDataJSON} from "../functions/AsyncStorageFunctions";
import { useNavigation } from "@react-navigation/native";


const PostCard = (props) => {

  const useStackNavigation = useNavigation();


  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        
        <Avatar
          containerStyle={{ backgroundColor: "#e0c96c" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> Posted On: {props.time}</Text>
      <Text
        style={{
          fontSize: 20,
          paddingLeft: 3,
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
          type="outline"
          title="Like"
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
        />
        <Button type="solid" title="Comments"
        onPress={function () {
          useStackNavigation.navigate("Post",{
            author: props.author,
            date: props.time,
            post: props.body,
            authorID: props.authorID,
            postID: props.postID
        });}} />
      </View>
    </Card>
  );
};

export default PostCard;
