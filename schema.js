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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    lanzamientos: {
      type: new GraphQLList(LaunchType),
      resolve(parents, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches`)
          .then(res => res.data);
      }
    },
    lanzamiento: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    cohetes: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    cohete: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    },
    apod: {
        type: ApodType,
        resolve(parents, args) {
            return axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&hd=true`)
            .then(res => res.data)
            .catch(err => console.log("Hubo un error extrayendo la imagen del dia: ", err))
        }
    },
    ultimoLanzamiento: {
      type: LaunchType,
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/latest`)
          .then(res => res.data);
      }
    },
    proximoLanzamiento:{
      type: LaunchType,
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/next`)
          .then(res => res.data);
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery
});
