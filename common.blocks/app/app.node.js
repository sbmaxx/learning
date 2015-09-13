var fs = require('fs'),
    PATH = require('path'),
    VM = require('vm'),
    express = require('express'),
    app = express(),
    Vow = require('vow'),
    pathToBundle = PATH.join('.', 'desktop.bundles', 'index'),
    pathToStatic = PATH.join('.', 'public'),

    ormConnect = require('./_ormConnect'),

    redirects = require('./routes/redirects'),

    routes = require('./routes/index'),

    server;


// html/css/js кэшируем на день, картинки на год.
//app.use(express.static(pathToBundle, { maxAge: 86400000 }));


app.use(express.static(pathToStatic, { maxAge: 3153600000000 }));

app.use(ormConnect);

app.use(redirects);

var context = VM.createContext({
    console: console,
    Vow: Vow
});

app.use(routes, function(req, res) {

    /*
     VM.runInContext(res.bemtree, context);

     var BEMTREE = context.BEMTREE;


     BEMTREE.apply([{ block: 'blackboard' }]).then(function(bemjson) {
     if (res.searchObj.json) {
     return res.end(JSON.stringify(bemjson, null, 4));
     }
     res.end(res.BEMHTML.apply(bemjson));
     });
     */
    var r;

    if (res.html) {
        r = res.html;
    } else if (res.priv) {
        r =  res.priv.main({ text: 'Hello World!' });
        r = res.BEMHTML.apply(r);
    }

    res.end(r);

});

server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
