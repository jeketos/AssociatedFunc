(function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  function main$lambda$lambda(closure$ref, closure$admin, closure$id, closure$res) {
    return function (snapshot) {
      var data = snapshot.val();
      console.log(data);
      if (data !== null) {
        var key = Object.keys(data)[0];
        var count = data[key].membersCount;
        if (count < 5) {
          closure$ref.child(key).update(new EmptyLobbiesData(count + 1));
          closure$admin.database().ref('/develop/lobbies/public/' + key + '/members/' + closure$id).set(true);
        }
         else {
          closure$ref.set(null);
          createLobby(closure$admin, closure$id);
        }
        return closure$res.status(200).send(snapshot.val());
      }
       else {
        return createLobby(closure$admin, closure$id);
      }
    };
  }
  function main$lambda(closure$admin) {
    return function (req, res) {
      var id = req.query.id;
      console.log(req.query.id);
      var ref = closure$admin.database().ref('/develop/emptyLobbies');
      return ref.once('value', main$lambda$lambda(ref, closure$admin, id, res));
    };
  }
  function main(args) {
    var functions = require('firebase-functions');
    var admin = require('firebase-admin');
    admin.initializeApp(functions.config().firebase);
    exports.findGame = functions.https.onRequest(main$lambda(admin));
  }
  function createLobby(admin, id) {
    var push = admin.database().ref('/develop/emptyLobbies').push();
    var lobbiesRef = admin.database().ref('/develop/lobbies/public/' + push.key);
    push.set(new EmptyLobbiesData());
    lobbiesRef.set(new PublicLobby('\u041E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u043B\u043E\u0431\u0431\u0438', id));
    return push.key;
  }
  function EmptyLobbiesData(membersCount) {
    if (membersCount === void 0)
      membersCount = 1;
    this.membersCount = membersCount;
  }
  EmptyLobbiesData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EmptyLobbiesData',
    interfaces: []
  };
  function PublicLobby(name, memberToAdd) {
    this.name = name;
    this.members = new PublicLobby$members$ObjectLiteral();
    this.members[memberToAdd] = true;
  }
  function PublicLobby$members$ObjectLiteral() {
  }
  PublicLobby$members$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  PublicLobby.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PublicLobby',
    interfaces: []
  };
  _.main_kand9s$ = main;
  _.createLobby_hwpqgh$ = createLobby;
  _.EmptyLobbiesData = EmptyLobbiesData;
  _.PublicLobby = PublicLobby;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
