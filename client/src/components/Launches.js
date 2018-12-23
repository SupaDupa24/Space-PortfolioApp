import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader2 from './loader2'
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const QUERY_LANZAMIENTOS_SPACEX = gql`
  query LaunchesQuery {
    lanzamientos {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export class Launches extends Component {
  render() {
    return (
      <Fragment>
        <h2 className="display-4 my-4 text-center">SpaceX Launches</h2>
        
        <Query query={QUERY_LANZAMIENTOS_SPACEX}>
          {({ loading, error, data }) => {
            if (loading) return <div><Loader2></Loader2><h5 className="text-center">Loading Missions...</h5></div>;
            if (error) console.log(error);
            if (data) {
              console.log("Esto son los lanzamientos", data);
              return (
                <Fragment>
                  <MissionKey />
                  <ul>
                    {
                      data.lanzamientos.map(launch => (
                      <LaunchItem key={launch.flight_number} launch={launch} />
                    ))}
                  </ul>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <u className="h4 text-danger">No Launches Found!</u>
                  <h5>Check your internet connection or see if GraphQl endpoint is up and running.</h5>
                </Fragment>
              );
            }
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;
