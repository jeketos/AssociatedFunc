
fun observeChats(admin: dynamic, functions: dynamic){
    exports.observeChats = functions.database
            .ref("/develop/chats/{chatId}/{messageId}")
            .onCreate{ event ->
                console.log("chatId = ${event.params.chatId}; messageId = ${event.params.messageId}")
                return@onCreate event.data.ref.child("nice")
            }
}