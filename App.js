import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      console.log(status);

      if(status !== 'granted') {
        console.log('Please grant location permissions');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('Location:');
      console.log(currentLocation);
    }
    getPermissions();
  }, []);

  // Get an address, return coords
  const geoCode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log('Geocoded Address: ');
    console.log(geocodedLocation);
  }

  //Get coords, return address
  const reversedGeoCode = async () => {
    const reversedGeoCodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });

    console.log('Reversed Geocoded');
    console.log(reversedGeoCodedAddress);
  }

  return (
    <View style={styles.container}>
      <Text>Geolocation</Text>
      <TextInput placeholder='address' value={address} onChangeText={setAddress} />
      <Button title='Geocode Address' onPress={geoCode} />
      <Button title='Reversed Geocode' onPress={reversedGeoCode} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
