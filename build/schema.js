"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = void 0;

require("@babel/polyfill");

var _graphql = require("graphql");

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Reconocer archivos .env
_dotenv.default.config();
/**
 * SpaceX models
 * @description Interfaces like models of launches and rockets from SpaceX API
 */
// Launch model


var LaunchType = new _graphql.GraphQLObjectType({
  name: "Lanzamientos",
  fields: function fields() {
    return {
      flight_number: {
        type: _graphql.GraphQLInt
      },
      mission_name: {
        type: _graphql.GraphQLString
      },
      launch_year: {
        type: _graphql.GraphQLString
      },
      launch_date_local: {
        type: _graphql.GraphQLString
      },
      launch_success: {
        type: _graphql.GraphQLBoolean
      },
      rocket: {
        type: RocketType
      }
    };
  }
}); // Rocket model

var RocketType = new _graphql.GraphQLObjectType({
  name: "Cohetes",
  fields: function fields() {
    return {
      rocket_id: {
        type: _graphql.GraphQLString
      },
      rocket_name: {
        type: _graphql.GraphQLString
      },
      rocket_type: {
        type: _graphql.GraphQLString
      }
    };
  }
});
/**
 *  NASA models
 *  @description NASA objects data such as images
 */
// Astronomy picture of the day

var ApodType = new _graphql.GraphQLObjectType({
  name: "ImagenDeHoy",
  fields: function fields() {
    return {
      copyright: {
        type: _graphql.GraphQLString
      },
      date: {
        type: _graphql.GraphQLString
      },
      title: {
        type: _graphql.GraphQLString
      },
      url: {
        type: _graphql.GraphQLString
      },
      hdurl: {
        type: _graphql.GraphQLString
      },
      explanation: {
        type: _graphql.GraphQLString
      }
    };
  }
});
var EventType = new _graphql.GraphQLObjectType({
  name: "EventosHistoricos",
  fields: function fields() {
    return {
      title: {
        type: _graphql.GraphQLString
      },
      event_date_utc: {
        type: _graphql.GraphQLString
      },
      flight_number: {
        type: _graphql.GraphQLInt
      },
      details: {
        type: _graphql.GraphQLString
      },
      links: {
        type: LinkType
      }
    };
  }
});
var LinkType = new _graphql.GraphQLObjectType({
  name: "ExternalLinks",
  fields: function fields() {
    return {
      article: {
        type: _graphql.GraphQLString
      },
      wikipedia: {
        type: _graphql.GraphQLString
      }
    };
  }
}); // Root Query

var RootQuery = new _graphql.GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    lanzamientos: {
      type: new _graphql.GraphQLList(LaunchType),
      resolve: function () {
        var _resolve = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(parents, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/launches");

                case 2:
                  res = _context.sent;
                  return _context.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function resolve(_x, _x2) {
          return _resolve.apply(this, arguments);
        }

        return resolve;
      }()
    },
    lanzamiento: {
      type: LaunchType,
      args: {
        flight_number: {
          type: _graphql.GraphQLInt
        }
      },
      resolve: function () {
        var _resolve2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(parent, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/launches/".concat(args.flight_number));

                case 2:
                  res = _context2.sent;
                  return _context2.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function resolve(_x3, _x4) {
          return _resolve2.apply(this, arguments);
        }

        return resolve;
      }()
    },
    cohetes: {
      type: new _graphql.GraphQLList(RocketType),
      resolve: function () {
        var _resolve3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(parent, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/rockets");

                case 2:
                  res = _context3.sent;
                  return _context3.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function resolve(_x5, _x6) {
          return _resolve3.apply(this, arguments);
        }

        return resolve;
      }()
    },
    cohete: {
      type: RocketType,
      args: {
        id: {
          type: _graphql.GraphQLInt
        }
      },
      resolve: function () {
        var _resolve4 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee4(parent, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/rockets/".concat(args.id));

                case 2:
                  res = _context4.sent;
                  return _context4.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function resolve(_x7, _x8) {
          return _resolve4.apply(this, arguments);
        }

        return resolve;
      }()
    },
    apod: {
      type: ApodType,
      resolve: function () {
        var _resolve5 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee5(parents, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.prev = 0;
                  _context5.next = 3;
                  return _axios.default.get("https://api.nasa.gov/planetary/apod?api_key=".concat(process.env.NASA_API_KEY, "&hd=true"));

                case 3:
                  res = _context5.sent;
                  return _context5.abrupt("return", res.data);

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5["catch"](0);
                  return _context5.abrupt("return", "Hubo un error extrayendo la imagen del dia: " + _context5.t0);

                case 10:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, this, [[0, 7]]);
        }));

        function resolve(_x9, _x10) {
          return _resolve5.apply(this, arguments);
        }

        return resolve;
      }()
    },
    ultimoLanzamiento: {
      type: LaunchType,
      resolve: function () {
        var _resolve6 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee6(parent, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/launches/latest");

                case 2:
                  res = _context6.sent;
                  return _context6.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function resolve(_x11, _x12) {
          return _resolve6.apply(this, arguments);
        }

        return resolve;
      }()
    },
    proximoLanzamiento: {
      type: LaunchType,
      resolve: function () {
        var _resolve7 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee7(parent, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _axios.default.get("https://api.spacexdata.com/v3/launches/next");

                case 2:
                  res = _context7.sent;
                  return _context7.abrupt("return", res.data);

                case 4:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7, this);
        }));

        function resolve(_x13, _x14) {
          return _resolve7.apply(this, arguments);
        }

        return resolve;
      }()
    },
    eventosHistoricos: {
      type: new _graphql.GraphQLList(EventType),
      resolve: function () {
        var _resolve8 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee8(parents, args) {
          var res;
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.prev = 0;
                  _context8.next = 3;
                  return _axios.default.get("https://api.spacexdata.com/v3/history?sort=event_date_utc&order=desc");

                case 3:
                  res = _context8.sent;
                  return _context8.abrupt("return", res.data);

                case 7:
                  _context8.prev = 7;
                  _context8.t0 = _context8["catch"](0);
                  return _context8.abrupt("return", "Whoops, it seems there was an error at Graph server. Error: " + _context8.t0);

                case 10:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8, this, [[0, 7]]);
        }));

        function resolve(_x15, _x16) {
          return _resolve8.apply(this, arguments);
        }

        return resolve;
      }()
    }
  }
});
var schema = new _graphql.GraphQLSchema({
  query: RootQuery
});
exports.schema = schema;
//# sourceMappingURL=schema.js.map