// notifications.js
import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

export async function setupPushNotifications() {
  // Request permissions
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
  }
  
  const enabled = await messaging().hasPermission();
  if (!enabled) {
    await messaging().requestPermission();
  }

  // Get token
  const token = await messaging().getToken();
  console.log('Device token:', token);

  // Notification listeners
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened from notification:', remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Foreground notification:', remoteMessage);
    // The library will automatically display the notification
  });

  // Check if app was opened from a notification
  const initialNotification = await messaging().getInitialNotification();
  if (initialNotification) {
    console.log('App opened from quit state:', initialNotification);
  }
}