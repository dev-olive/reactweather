import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TouchableNativeFeedbackBase, View } from 'react-native';
import * as Location from 'expo-location'
import Weather from "./Weather";

const API_KEY = "83ef8f76c5525c1a529c2e8cab221b5d";

export default class App extends React.Component{
  // state
  state = {
    isLoading : false,
    error : null,
    temperature : null,
    name : null
};
componentDidMount(){
  this.geoLocation();
}
// define get openweather api function
_getWeather = async(latitude, longitude) =>{
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`)
    .then(response=>response.json())
    .then(json=>{
      console.log("getWeather ::", json.main.temp,json.weather[0].main)
      this.setState({
        temperature : json.main.temp,
        name: json.weather[0].main,
        isLoading : true,
      });
    });
    
}

geoLocation = async() => {
  try{
      //const response = await Location.requestBackgroundPermissionsAsync();
      const {coords : {latitude, longitude}}  = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);

      // send weather api call
      this._getWeather(latitude, longitude);

      // 위 작업 전부 처리되면 로딩화면 종료 
      this.setState({ isLoading:false });
  } catch(error){
      // 사용자가 허용안하면 위 코드에서 에러가 나고 그럼 여기가 실행
      Alert.alert("Can't find you.", "So sad");
  }        
}

render(){
    const {isLoading, error, temperature, name} = this.state;
    console.log("render ::", temperature, name);
    return(
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        {isLoading ? (
          <Weather weatherName={this.state.name} 
          temp={Math.ceil(this.state.temperature - 273.15)}/>
        ) : (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Getting the Weather {'\n'}🌞💨☔︎❄️☁</Text>
          {error? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        )}
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
  , errorText : {
    color : "red",
    backgroundColor : "transparent",
    marginBottom : 40
  } 
  , loading : {
    flex : 1, 
    backgroundColor : '#FDF6AA',
    justifyContent : 'flex-end',
    paddingLeft : 25
  }
  , loadingText : {
    fontSize : 38,
    marginBottom : 100,
  }
});
