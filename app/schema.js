import "@babel/polyfill";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from "graphql";
import axios from "axios";
import dotenv from 'dotenv';

// Reconocer archivos .env
dotenv.config();
/**
 * SpaceX models
 * @description Interfaces like models of launches and rockets from SpaceX API
 */

// Launch model
const LaunchType = new GraphQLObjectType({
  name: "Lanzamientos",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

// Rocket model
const RocketType = new GraphQLObjectType({
  name: "Cohetes",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

/**
 *  NASA models
 *  @description NASA objects data such as images
 */

 // Astronomy picture of the day
const ApodType = new GraphQLObjectType({
    name:"ImagenDeHoy",
    fields: () => ({
        copyright: {type:GraphQLString},
        date: {type: GraphQLString},
        title: {type: GraphQLString},
        url: {type: GraphQLString},
        hdurl: {type:GraphQLString},
        explanation: {type: GraphQLString}
    })
})

const EventType = new GraphQLObjectType({
    name:"EventosHistoricos",
    fields: () => ({
      title: {type: GraphQLString},
      event_date_utc: {type: GraphQLString},
      flight_number: {type: GraphQLInt},
      details: {type: GraphQLString},
      links: {type: LinkType}
    })
})

const LinkType = new GraphQLObjectType({
  name: "ExternalLinks",
  fields:() => ({
    article: {type: GraphQLString},
    wikipedia: {type: GraphQLString}
  })
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    lanzamientos: {
      type: new GraphQLList(LaunchType),
      async resolve(parents, args) {
        const res = await axios
          .get(`https://api.spacexdata.com/v3/launches`);
        return res.data;
      }
    },
    lanzamiento: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const res = await axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`);
        return res.data;
      }
    },
    cohetes: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const res = await axios
          .get("https://api.spacexdata.com/v3/rockets");
        return res.data;
      }
    },
    cohete: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const res = await axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`);
        return res.data;
      }
    },
    apod: {
        type: ApodType,
        async resolve(parents, args) {
            try {
            const res = await axios
              .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&hd=true`);
            return res.data;
          }
          catch (err) {
            return "Hubo un error extrayendo la imagen del dia: "+err;
          }
        }
    },
    ultimoLanzamiento: {
      type: LaunchType,
      async resolve(parent, args) {
        const res = await axios
          .get(`https://api.spacexdata.com/v3/launches/latest`);
        return res.data;
      }
    },
    proximoLanzamiento:{
      type: LaunchType,
      async resolve(parent, args) {
        const res = await axios
          .get(`https://api.spacexdata.com/v3/launches/next`);
        return res.data;
      }
    },
    eventosHistoricos: {
      type:new GraphQLList(EventType),
      async resolve (parents, args) {
        try {
          const res = await axios
            .get(`https://api.spacexdata.com/v3/history?sort=event_date_utc&order=desc`);
          return res.data
        }
        catch (err) {
          return "Whoops, it seems there was an error at Graph server. Error: " + err;
        }
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery
});
