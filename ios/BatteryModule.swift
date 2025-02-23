import Foundation
import React

@objc(BatteryModule)
class BatteryModule: RCTEventEmitter {
    
    override init() {
        super.init()
        UIDevice.current.isBatteryMonitoringEnabled = true
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(batteryLevelChanged),
            name: UIDevice.batteryLevelDidChangeNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(batteryStateChanged),
            name: UIDevice.batteryStateDidChangeNotification,
            object: nil
        )
    }

    @objc func batteryLevelChanged() {
        let batteryLevel = UIDevice.current.batteryLevel
        sendEvent(withName: "onBatteryLevelChange", body: ["batteryLevel": batteryLevel * 100])
    }

    @objc func batteryStateChanged() {
        let batteryState: String
        switch UIDevice.current.batteryState {
        case .charging:
            batteryState = "charging"
        case .full:
            batteryState = "full"
        case .unplugged:
            batteryState = "unplugged"
        default:
            batteryState = "unknown"
        }
        sendEvent(withName: "onBatteryStateChange", body: ["batteryState": batteryState])
    }

    override func supportedEvents() -> [String] {
        return ["onBatteryLevelChange", "onBatteryStateChange"]
    }

    @objc func getBatteryLevel(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        #if targetEnvironment(simulator)
             resolve(["batteryLevel": 50]) // Return mock value for iOS Simulator
         #else
             let batteryLevel = UIDevice.current.batteryLevel
             if batteryLevel >= 0 {
                 resolve(["batteryLevel": batteryLevel * 100])
             } else {
                 reject("BATTERY_ERROR", "Unable to fetch battery level", nil)
             }
         #endif
    }

    override static func moduleName() -> String {
        return "BatteryModule"
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
