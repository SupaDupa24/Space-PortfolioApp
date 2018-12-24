"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _cors = _interopRequireDefault(require("cors"));

var _schema = require("./schema");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reconocer archivos .env
_dotenv.default.config();

var app = (0, _express.default)();
var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 4000 : _process$env$PORT; // Habilita cors

app.use((0, _cors.default)()); // Crea servidor HTTP

app.server = _http.default.createServer(app); // Configura GraphQl ennpoint

app.use('/graphql', (0, _expressGraphql.default)({
  schema: _schema.schema,
  graphiql: "".concat(process.env.GRAPHIQL) || true
}));
app.use(_express.default.static('public'));
app.get('*', function (req, res) {
  res.sendFile(_path.default.resolve(__dirname, 'public', 'index.html'));
}); //Levanta servidor en puerto de configuracion o 4000 por defecto

app.server.listen(PORT, function () {
  return console.log("Servidor API levantado en el puerto ".concat(app.server.address().port));
});
//# sourceMappingURL=server.js.map