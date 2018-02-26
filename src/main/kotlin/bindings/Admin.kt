package bindings

@JsModule("firebase-admin")
@JsNonModule
external object Admin {
    fun initializeApp(config: dynamic)
    fun database(): Database
}

fun ref(path: String): Reference = Admin.database().ref(path)