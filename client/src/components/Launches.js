import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//import LaunchItem from './Launch';
//import MissionKey from './MissionKey';

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
        <h1 className="display-4 my-3">Launches</h1>
        {/* <MissionKey /> */}
        <Query query={QUERY_LANZAMIENTOS_SPACEX}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log("Esto son los lanzamientos",data);

            return (
              <Fragment>
                  <ul>
                     {/* data.launches.map(launch => (
                  <LaunchItem key={launch.flight_number} launch={launch} />
                )) */
                    data.lanzamientos.map(launch => <li>{launch.mission_name}</li>)
                }  
                  </ul>
               
              </Fragment>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launches;