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

  const PostScreen = (props) =>  {

      //console.log(props)

      const [comment, setComment] = useState("");
      const [commentList, setCommentList] = useState([]);
      //const [commentCount, setCommentCount] = useState(0);
      const init = async () => {
        await removeData(props.route.params.post);
      };
  
      const getComment = async () => {
          await getDataJSON(props.route.params.post).then((data) => {
              if (data == null) {
                  setCommentList([]);
              } else setCommentList(data);
          });
      };
      useEffect(() => {
          getComment();
          //init();
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
                    setComment(currentInput);
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
                                onPress={async () => {
                                    let arr = [
                                        ...commentList,
                                        {
                                            name: auth.CurrentUser.name,
                                            email: auth.CurrentUser.email,
                                            date:  moment().utcOffset('+06:00').format("DD MMM, YYYY hh:mm:ss a"),
                                            comment: comment,
                                            key: comment,
                                        },
                                    ];

                                
                                    await storeDataJSON(props.route.params.post, arr).then(() => {
                                        setCommentList(arr);
                                        alert("Commented!")
                                        //setCommentCount = setCommentCount + 1
                                    });


                                }} />
              
               </Card>


               <FlatList
                        data={commentList}
                        renderItem={commentItem => (
                            <CommentComponent
                                name={commentItem.item.name}
                                date={commentItem.item.date}
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