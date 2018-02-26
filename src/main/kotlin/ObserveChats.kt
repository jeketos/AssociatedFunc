import bindings.*
import data.Message
import data.Winner
import kotlin.js.Promise

fun observeChats(){
    exports.observeChats = Functions.database
        .ref("/develop/chats/{lobbyId}/{messageId}")
        .onCreate<Message>{ event ->
            val message = event.data.`val`()
            val lobbyId = event.params.lobbyId
            ref("/develop/selectedWords/$lobbyId/selectedWord")
                .once<String>("value")
                .then {
                    if(it.`val`() == message.message){
                    ref("/develop/lobbies/public/$lobbyId").once<dynamic>("value")
                        .then {
                            val lobby = it.`val`()
                            val members = lobby.members
                            val membersKeys = js("Object").keys(members) as Array<String>
                            for(key in membersKeys){
                                lobby.members[key].drawer = key == message.userId
                            }
                            val push = ref("/develop/lobbies/public/").push()
                            ref("/develop").updateAll(
                                    "lobbies/public/${push.key}" to lobby,
                                    "winners/$lobbyId" to Winner(message.userId),
                                    "lobbies/public/$lobbyId" to null,
                                    "chats/$lobbyId" to null,
                                    "drawPoints/$lobbyId" to null,
                                    "selectedWords/$lobbyId" to null,
                                    "emptyLobbies/$lobbyId" to null
                            )
                        }
                    } else {
                        console.log("no word matches")
                        Promise.resolve(Unit)
                    }
                }.catch { console.log(it) }
        }
}