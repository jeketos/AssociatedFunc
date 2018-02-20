(function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var throwCCE = Kotlin.throwCCE;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Exception = Kotlin.kotlin.Exception;
  function main$lambda$lambda(closure$res, closure$ref, closure$admin, closure$id) {
    return function (snapshot) {
      var tmp$, tmp$_0;
      var data = snapshot.val();
      tmp$_0 = closure$res.status(200);
      if (data !== null) {
        var key = Object.keys(data)[0];
        var count = data[key].membersCount;
        if (count < 5) {
          closure$ref.child(key).update(new EmptyLobbiesData(count + 1));
          closure$admin.database().ref('/develop/lobbies/public/' + key + '/members/' + closure$id).set(new Member(false));
          tmp$ = new ValueHolder(key);
        }
         else {
          closure$ref.set(null);
          tmp$ = createLobby(closure$admin, closure$id, true);
        }
      }
       else {
        tmp$ = createLobby(closure$admin, closure$id, true);
      }
      return tmp$_0.send(tmp$);
    };
  }
  function main$lambda(closure$admin) {
    return function (req, res) {
      var id = req.query.id;
      console.log(req.query.id);
      var ref = closure$admin.database().ref('/develop/emptyLobbies');
      return ref.once('value', main$lambda$lambda(res, ref, closure$admin, id));
    };
  }
  function main(args) {
    var functions = require('firebase-functions');
    var admin = require('firebase-admin');
    admin.initializeApp(functions.config().firebase);
    exports.findGame = functions.https.onRequest(main$lambda(admin));
    getWords(admin, functions);
  }
  function createLobby(admin, id, drawer) {
    if (drawer === void 0)
      drawer = false;
    var push = admin.database().ref('/develop/emptyLobbies').push();
    var lobbiesRef = admin.database().ref('/develop/lobbies/public/' + push.key);
    push.set(new EmptyLobbiesData());
    lobbiesRef.set(new PublicLobby('\u041E\u0442\u043A\u0440\u044B\u0442\u043E\u0435 \u043B\u043E\u0431\u0431\u0438', id, drawer));
    return new ValueHolder(push.key);
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
  function ValueHolder(value) {
    this.value = value;
  }
  ValueHolder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ValueHolder',
    interfaces: []
  };
  function PublicLobby(name, memberToAdd, drawer) {
    if (drawer === void 0)
      drawer = false;
    this.name = name;
    this.members = new PublicLobby$members$ObjectLiteral();
    this.members[memberToAdd] = new Member(drawer);
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
  function Member(drawer) {
    this.drawer = drawer;
  }
  Member.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Member',
    interfaces: []
  };
  function getWords$lambda$lambda$lambda(snapshot) {
    return snapshot.val();
  }
  function getWords$lambda$lambda(closure$res) {
    return function (it) {
      return closure$res.status(200).send(it);
    };
  }
  var Array_0 = Array;
  function getWords$lambda(closure$admin) {
    return function (req, res) {
      var tmp$, tmp$_0;
      var defaultCount = 3;
      console.log(req.query.count);
      try {
        tmp$_0 = toInt(typeof (tmp$ = req.query.count) === 'string' ? tmp$ : throwCCE());
      }
       catch (e) {
        if (Kotlin.isType(e, Exception)) {
          tmp$_0 = defaultCount;
        }
         else
          throw e;
      }
      var wordsCount = tmp$_0;
      var ref = closure$admin.database().ref('/develop/words');
      var array = Array_0(wordsCount);
      var tmp$_1;
      tmp$_1 = array.length - 1 | 0;
      for (var i = 0; i <= tmp$_1; i++) {
        var tmp$_2;
        array[i] = Kotlin.isType(tmp$_2 = ref.child(getRandom(1002)).once('value', getWords$lambda$lambda$lambda), Promise) ? tmp$_2 : throwCCE();
      }
      return Promise.all(array).then(getWords$lambda$lambda(res));
    };
  }
  function getWords(admin, functions) {
    exports.getWords = functions.https.onRequest(getWords$lambda(admin));
  }
  function getRandom(max) {
    return Math.floor(Math.random() * (max - 0 + 1 | 0) + 0);
  }
  _.main_kand9s$ = main;
  _.createLobby_u5mjnp$ = createLobby;
  _.EmptyLobbiesData = EmptyLobbiesData;
  _.ValueHolder = ValueHolder;
  _.PublicLobby = PublicLobby;
  _.Member = Member;
  _.getWords_wn2jw4$ = getWords;
  _.getRandom_za3lpa$ = getRandom;
  main([]);
  Kotlin.defineModule('index', _);
  return _;
}(module.exports, require('kotlin')));
