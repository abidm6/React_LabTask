import React, { useState, useEffect } from 'react';
import { View, Platform ,Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Card} from 'react-native-elements';

const ImageUpload=(props) =>{

  const [image, setImage] = useState(null);

  /*const getImage = async() => {
    await getDataJSON(props.auth.currentUser.sid).then((data) => {
        setImage(data.picture)
    })};
 
    useEffect(() =>{
    getImage();
  },[]); */

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  

  return (
    <View>
        <Text style = {{ fontWeight: "bold", paddingLeft: 18}}>Tap Below to Upload Image!</Text>
        <Card.Divider/>
    <Avatar
          size="xlarge"
          
          onPress={function(){
            pickImage()
            /*let currentUser = {
                name: props.auth.currentUser.name,
                sid: props.auth.currentUser.sid,
                email: props.auth.currentUser.email,
                password: props.auth.currentUser.password,
                date: props.auth.currentUser.date,
                homeAddress: props.auth.currentUser.homeAddress,
                workAddress: props.auth.currentUser.workAddress,
                picture:image,
              };
              storeDataJSON(props.auth.currentUser.sid, image);*/
          }}
          rounded 
          source={{
            
            uri: image 
               }}
            
              />
 

 
 </View>
  );
}

export default  ImageUpload;