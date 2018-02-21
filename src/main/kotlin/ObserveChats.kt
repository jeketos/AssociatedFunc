
fun observeChats(admin: dynamic, functions: dynamic){
    exports.observeChats = functions.database
            .ref("/develop/chats/{lobbyId}/{messageId}")
            .onCreate{ event ->
                val lobbyId = event.params.lobbyId
                console.log("lobbyId = ${lobbyId}; messageId = ${event.params.messageId}")
                admin.database()
                        .ref("/develop/selectedWords/$lobbyId/selectedWord")
                        .once("value", { snapshot ->
                            val data = snapshot.`val`()
                            data
                        })
                return@onCreate event.data.ref.child("nice")
            }
}