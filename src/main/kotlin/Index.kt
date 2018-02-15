import kotlin.js.Json
import kotlin.js.json

external fun require(module: String): dynamic
external val exports: dynamic

fun main(args: Array<String>) {
    val functions = require("firebase-functions")
    val admin = require("firebase-admin")
    admin.initializeApp(functions.config().firebase)

//    exports.saveString = functions.https.onRequest { req, res ->
//        val text = req.query.text
//
//        admin.database().ref("/testMessage").push(text).then {
//            res.status(200).send("Saved: $text")
//        }
//    }
    exports.findGame = functions.https.onRequest { req, res ->
        val id = req.query.id
        console.log(req.query.id)
        val ref = admin.database().ref("/develop/emptyLobbies")
        ref.once("value", { snapshot ->
            val data = snapshot.`val`()
            console.log(data)
            if(data !== null){
                val key = js("Object").keys(data)[0]
                val count = data[key].membersCount
                if(count < 5){
                    ref.child(key).update(EmptyLobbiesData(count + 1))
                    admin.database().ref("/develop/lobbies/public/${key}/members/$id").set(true)
                }
                res.status(200).send(snapshot.`val`())
            } else {
               val push = ref.push()
                val lobbiesRef = admin.database().ref("/develop/lobbies/public/${push.key}")
                push.set(EmptyLobbiesData())
                lobbiesRef.set(PublicLobby("Открытое лобби", id))
                res.status(200).send(push.key)
            }
        })
    }
}

class EmptyLobbiesData(val membersCount: Int = 1)

class PublicLobby(val name: String, memberToAdd: String){
    val members: dynamic = object {}
    init {
        members[memberToAdd] = true
    }

}
