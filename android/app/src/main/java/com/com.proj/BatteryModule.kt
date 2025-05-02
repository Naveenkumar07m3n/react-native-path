package com.proj

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class BatteryModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val batteryIntent: Intent? = reactApplicationContext.registerReceiver(
                null,
                IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            )

            val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
            val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

            val batteryLevel = if (level >= 0 && scale > 0) {
                (level.toFloat() / scale.toFloat()) * 100
            } else {
                -1.0
            }

            promise.resolve(batteryLevel.toInt())
        } catch (e: Exception) {
            promise.reject("BATTERY_ERROR", "Failed to get battery level", e)
        }
    }
}
