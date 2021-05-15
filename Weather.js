import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Ionicons} from "@expo/vector-icons";
import PropTypes from "prop-types"

const weatherCases = {
    Rain : {
        colors:["#00C6FB", "#005BEA"],
        title : "Raining like a MF",
        subtitle : "For more info look outside rain allday",
        icon : 'ios-rainy',
    },
    Clear : {
        colors:["#FEF253", "#FF7300"],
        title : "Sunny as fuck",
        subtitle : "Go get your ass burnt",
        icon : 'ios-sunny',
    },
    Thunderstorm : {
        colors:["#00ECBC", "#007ADF"],
        title : "Thunderstorm in the house",
        subtitle : "Actually, outside of the house",
        icon : 'ios-thunderstorm',
    },
    Clouds : {
        colors:["#D7D2CC", "#304352"],
        title : "Clouds",
        subtitle : "I know, fucking boring",
        icon : 'ios-cloudy',
    },
    Snow : {
        colors:["#7DE2FC", "#B9B6ES"],
        title : "Cold as balls",
        subtitle : "Do you want to build a snowman? Fuck no.",
        icon : 'ios-snow',
    },
    
};
export default function Weather({weatherName, temp}){
    console.log("###", weatherName, temp);
    return(
        <LinearGradient 
            colors={weatherCases[weatherName].colors}
             style={styles.container}>
            <View style= {styles.upper}>
                <Ionicons color="white" size={144} name={weatherCases[weatherName].icon}></Ionicons>
                <Text style={styles.temp}>{temp}°C</Text>
            </View>
            <View style= {styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.sub}>{weatherCases[weatherName].subtitle}</Text>
            </View>
        </LinearGradient>
    );
}
Weather.propTypes ={
    temp: PropTypes.number.isRequired,
    //weatherName: PropTypes.string.isRequired
}
//export default Weather; 

const styles=StyleSheet.create({
    container:{
        flex : 1,

    }
    , upper : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }
    ,temp : {
        fontSize : 38,
        backgroundColor : 'transparent',
        color : 'white',
        marginTop : 24
    }
    , lower : {
        flex : 1,
        alignItems : 'flex-start',
        justifyContent : 'flex-end',
        paddingLeft : 25
    }
    , title : {
        fontSize : 38,
        color : 'white',
        backgroundColor : 'transparent',
        marginBottom : 10,
        fontWeight : "300"
    }
    , sub : {
        fontSize : 24,
        color : 'white',
        marginBottom : 60,
        backgroundColor : 'transparent'
    }
})