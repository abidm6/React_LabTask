import React, { useState, useEffect } from "react";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
  } from "react-native";
  import {
    Card,
    Button,
    Input,
    Header,
    Avatar,
  } from "react-native-elements";
  import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
  import { AuthContext } from "../providers/AuthProvider";
  import ScreenHeader from "../components/ScreenHeader";
  import CommentComponent from "../components/CommentComponent";
  import moment from "moment";
  import * as firebase from 'firebase';
  import 'firebase/firestore';
import PostCard from "../components/PostCard";

  const PostScreen = (props) =>  {

      //console.log(props)

      const [commentText, setCommentText] = useState("");
      const [commentList, setCommentList] = useState([]);
  
      const loadComments = async () => {
      
        firebase
            .firestore()
            .collection('posts')
            .doc(props.route.params.postID)
            .onSnapshot((querySnapShot) => {
               
                setCommentList(querySnapShot.data().comments);
            })
            .catch((error) => {
                
                alert(error);
            })
    }

      useEffect(() => {
          loadComments();
      }, [])


    
      return(

        <AuthContext.Consumer>
        {(auth) => (
    
        <View style={styles.containerStyle}>  

             
        <ScreenHeader props ={props} ></ScreenHeader>
        <Card containerStyle={{ alignContent: "center"}}>
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
        <Text style = {{fontSize: 20,
        fontWeight: 'bold',
        paddingLeft:5}}
>
          {props.route.params.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> Posted On: {props.route.params.date}</Text>
      <Text
        style={{
          fontSize: 20,
          paddingLeft: 3,
          paddingVertical: 10,
        }}
      >
        {props.route.params.post}
      </Text>
             
  
             <Input
                
                  inputStyle={{color:"black"}}
                                  
                  placeholder="Write Something"
                
                  multiline={true}
                  
                  placeholderTextColor="black"
                  onChangeText={function (currentInput) {
                    setCommentText(currentInput);
                }}
                  
                  inputContainerStyle={styles.inputStyle}
                  leftIcon={<Entypo name="pencil" size={24} color="black" />}
                  /*onChangeText={function (currentInput) {
                     setCurrentInputText(currentInput)
                  }}*/
                />

                    <Button buttonStyle={{ borderColor: 'dodgerblue' }}
                                title="Comment"
                                titleStyle={{ color: '#29435c' }}
                                type="outline"
                                onPress={function () {
                                  firebase
                                      .firestore()
                                      .collection('posts')
                                      .doc(props.route.params.postID)
                                      .set(
                                          {
                                              comments: [...commentList,
                                              {
                                                  comment: commentText,
                                                  commented_by: auth.CurrentUser.displayName,
                                                  commented_at: firebase.firestore.Timestamp.now(),
                                                  commenting_date: moment().format("DD MMM, YYYY")
                                              }]
                                          },
                                          { merge: true }
                                      )
                                      .then((doc) => {
                                        alert("Commented!")
                                      })
                                      .catch((error) => {
                                          alert(error);
                                       })}} />
              
               </Card>


               <FlatList
                        data={commentList}
                        renderItem={commentItem => (
                            <CommentComponent
                                name={commentItem.item.commented_by}
                                date={commentItem.item.commented_at.toDate().toString()}
                                comment={commentItem.item.comment}

                            />


                        )}
                    />


        </View>
        

        
    ) }</AuthContext.Consumer>

                            
      )
  }
  
  const styles=StyleSheet.create({
     
      inputStyle:{
  
          color:"#c08401",
          borderColor:"#c08401",
          marginHorizontal:20,
          marginTop:10,
      },
      containerStyle:{
        marginTop:0,
        flex: 1,
        backgroundColor: '#D9D2D2'
          , 
      },
    
  })
  
  export default PostScreen;