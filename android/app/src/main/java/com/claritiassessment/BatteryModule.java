package com.claritiassessment;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.content.BroadcastReceiver;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BatteryModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public BatteryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        // Register battery level and state change listener
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        reactContext.registerReceiver(batteryReceiver, filter);
    }

    private final BroadcastReceiver batteryReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            float batteryPct = level * 100 / (float) scale;

            int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
            String batteryState;

            switch (status) {
                case BatteryManager.BATTERY_STATUS_CHARGING:
                    batteryState = "charging";
                    break;
                case BatteryManager.BATTERY_STATUS_FULL:
                    batteryState = "full";
                    break;
                case BatteryManager.BATTERY_STATUS_DISCHARGING:
                case BatteryManager.BATTERY_STATUS_NOT_CHARGING:
                    batteryState = "unplugged";
                    break;
                default:
                    batteryState = "unknown";
            }

            sendEvent("onBatteryLevelChange", batteryPct);
            sendEvent("onBatteryStateChange", batteryState);
        }
    };

    private void sendEvent(String eventName, Object data) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, data);
        }
    }

    @ReactMethod
    public void getBatteryLevel(Promise promise) {
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = reactContext.registerReceiver(null, filter);

        if (batteryStatus != null) {
            int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            float batteryPct = level * 100 / (float) scale;
            promise.resolve(batteryPct);
        } else {
            promise.reject("BATTERY_ERROR", "Unable to fetch battery level");
        }
    }

    @Override
    public String getName() {
        return "BatteryModule";
    }
}
