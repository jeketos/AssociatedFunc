package data

class Lobby(
    val name: String,
    var members: Map<String, Drawer>
)

class Drawer(val drawer: Boolean)