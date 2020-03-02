import React, { Component } from 'react'
import GeoLocation from 'react-native-geolocation-service'
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Entypo'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Latitude: 0,
      Longitude: 0,
      UserLatitude: 0,
      UserLongitude: 0
    }
  }

  componentDidMount = () => {
    this.getPosition()
  }

  getPosition = () => {
    if (GeoLocation) {
      GeoLocation.getCurrentPosition(this.showPosition)
    }
    else {
      alert("Permission Denied")
    }
  }

  showPosition = (position) => {
    console.log(position)
    this.setState({
      UserLatitude: position.coordinate.latitude,
      UserLongitude: position.coordinate.longitude
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appHeader}>
          <Text style={styles.headerText}>Geolocation in React Native</Text>
        </View>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          zoomEnabled={true}
          zoomControlEnabled={true}
          initialRegion={{
            latitude: this.state.UserLatitude,
            longitude: this.state.UserLongitude,
            latitudeDelta: 24.5847,
            longitudeDelta: 73.7301
          }}
          onRegionChange={(region) => this.setState({
            Latitude: region.latitude,
            Longitude: region.longitude
          })} >
          <Marker
            coordinate={{
              latitude: this.state.UserLatitude,
              longitude: this.state.UserLongitude
            }}
            title="Current Location"
          >
            <Icon name="home" size={30}></Icon>
          </Marker>
        </MapView>
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appHeader: {
    backgroundColor: '#006266',
    height: '9%',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 21,
    marginTop: '5%',
    fontWeight: 'bold',
    color: 'snow'
  },
  mapStyle: {
    marginTop: '17%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})