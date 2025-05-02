

import React,{useEffect,useState} from 'react';
import { View,Text,Button } from 'react-native';
import { setupPushNotifications } from '../react-native-path/src/notification'; // Adjust path as needed
import { NativeModules } from 'react-native';


const { MyModule } = NativeModules; 
// const { BatteryModule } = NativeModules;
// NativeModules it is a function
const App = () =>{
  // MyModule.showToast('Hello from Native!');
  const [battery, setBattery] = useState(null);
  
  //push notification
  useEffect(() => {
    setupPushNotifications();
  }, []);

  const fetchBatteryLevel = async () => {
    try {
      const level = await BatteryModule.getBatteryLevel();
      setBattery(`${level}%`);
    } catch (e) {
      setBattery('Error');
    }
  };

  return(
    <View>
        <Text>Hiii</Text>
        <Button title="Show Toast" onPress={() => MyModule.showToast('Hello from native!')} />
        {/* <Button title="Get Battery Level" onPress={fetchBatteryLevel} /> */}
        {/* <Text>Battery Level: {battery}</Text> */}
    </View>
  )
}
export default App;
