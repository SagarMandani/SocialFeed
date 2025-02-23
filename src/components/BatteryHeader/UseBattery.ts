import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

const {BatteryModule} = NativeModules;
const android = Platform.OS === 'android';

if (!BatteryModule) {
  throw new Error('BatteryModule is not linked. Try rebuilding the project.');
}

const useBattery = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryState, setBatteryState] = useState('unknown');

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(BatteryModule);

    // Subscribe to battery level changes
    const batteryLevelListener = eventEmitter.addListener(
      'onBatteryLevelChange',
      event => {
        setBatteryLevel(android ? event : event.batteryLevel);
      },
    );

    // Subscribe to battery state changes
    const batteryStateListener = eventEmitter.addListener(
      'onBatteryStateChange',
      event => {
        setBatteryState(android ? event : event.batteryState);
      },
    );

    // Fetch initial battery level
    getBatteryLevel();

    return () => {
      batteryLevelListener.remove();
      batteryStateListener.remove();
    };
  }, []);

  const getBatteryLevel = async () => {
    try {
      BatteryModule.getBatteryLevel()
        .then(res => setBatteryLevel(android ? res : res.batteryLevel))
        .catch(err => console.log('Battery fetch error:', err));
    } catch (error) {
      console.error('Error fetching battery level:', error);
      return null;
    }
  };

  return {batteryLevel, batteryState, getBatteryLevel};
};

export default useBattery;
