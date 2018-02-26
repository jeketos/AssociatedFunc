import kotlin.js.Math
import kotlin.js.Promise

fun getWords(admin: dynamic, functions: dynamic) {

    exports.getWords = functions.https.onRequest { req, res ->
        val defaultCount: Int = 3
        console.log(req.query.count)
        val wordsCount: Int = try {
            (req.query.count as String).toInt()
        } catch (e: Exception){
            defaultCount
        }
        val ref = admin.database().ref("/words")
        Promise.all(Array(wordsCount, {
            ref.child(getRandom(1002)).once("value", { snapshot  ->
                snapshot.`val`()
            }) as Promise<String>
        })).then {
            res.status(200).send(it)
        }


    }
}


fun getRandom(max: Int): Int =
    Math.floor(Math.random() * (max - 0 + 1) + 0)
