external fun require(module: String): dynamic
external val exports: dynamic

fun main(args: Array<String>) {
    val functions = require("firebase-functions")
    val admin = require("firebase-admin")
    admin.initializeApp(functions.config().firebase)
    exports.findGame = functions.https.onRequest { req, res ->
        val id = req.query.id
        console.log(req.query.id)
        val ref = admin.database().ref("/develop/emptyLobbies")
        ref.once("value", { snapshot ->
            val data = snapshot.`val`()
            res.status(200).send(
                if(data !== null){
                    val key = js("Object").keys(data)[0]
                    val count = data[key].membersCount
                    if(count < 5){
                        ref.child(key).update(EmptyLobbiesData(count + 1))
                        admin.database().ref("/develop/lobbies/public/${key}/members/$id").set(Member(false))
                        ValueHolder<String>(key)
                    } else {
                        ref.set(null)
                        createLobby(admin, id,true)
                    }
                } else {
                    createLobby(admin, id, true)
                })
        })
    }
    getWords(admin, functions)
    observeChats()
}


fun createLobby(admin: dynamic, id: dynamic, drawer: Boolean = false): ValueHolder<String> {
    val push = admin.database().ref("/develop/emptyLobbies").push()
    val lobbiesRef = admin.database().ref("/develop/lobbies/public/${push.key}")
    push.set(EmptyLobbiesData())
    lobbiesRef.set(PublicLobby("Открытое лобби", id, drawer))
    return ValueHolder(push.key)
}


class EmptyLobbiesData(val membersCount: Int = 1)
class  ValueHolder<out T>(val value: T)

class PublicLobby(val name: String, memberToAdd: dynamic, drawer: Boolean = false){
    val members: dynamic = object {}
    init {
        members[memberToAdd] = Member(drawer)
    }

}

class Member(val drawer: Boolean)
