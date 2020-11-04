import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Avatar } from "react-native-elements";

const CommentComponent = (props) => {
    return (

        <View>
            <Card containerStyle={styles.cardViewStyle}>
                
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            containerStyle={{ backgroundColor: "dodgerblue", }}
                            rounded
                            icon={{ name: "user", type: "font-awesome", color: "black" }}
                            activeOpacity={1}
                        />

                        <Text style={styles.textStyle} > {props.name} </Text>
                    </View>
                    <Text style={{ fontStyle: "italic" }}> {props.date} </Text>

                </View>
                <Text
                    style={{
                        paddingVertical: 10,
                        paddingLeft: 5,
                        fontSize: 15
                    }}
                >
                    {props.comment}
                </Text>

            </Card>

        </View>
    )

};

const styles = StyleSheet.create({
    cardViewStyle: {
        fontSize: 30,
        backgroundColor: 'white',
        width: '90%',
        alignSelf: "center",
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold',

    }
});

export default CommentComponent;