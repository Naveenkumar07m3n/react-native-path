package com.proj

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MyModule" // This is how JS will refer to this module
    }

    @ReactMethod
    fun showToast(message: String) {
        Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show()
    }
}
