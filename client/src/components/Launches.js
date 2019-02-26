import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader2 from "./loader2";
import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";
import { Link } from "react-router-dom";

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
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <div className={this.props.type === "Recent" ? "" : "container"}>
          <h2 id="Launches" className="display-4 my-4 text-center">
            SpaceX {this.props.type ? "Recent" : ""} Launches
          </h2>

          <Query query={QUERY_LANZAMIENTOS_SPACEX}>
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div>
                    <Loader2 />
                    <h5 className="text-center">Loading Missions...</h5>
                  </div>
                );
              if (error) console.log(error);
              if (data) {
                console.log("Esto son los lanzamientos", data);
                return (
                  <Fragment>
                    <MissionKey />
                    {this.props.type
                      ? data.lanzamientos
                          .slice(-5)
                          .map(launch => (
                            <LaunchItem
                              key={launch.flight_number}
                              launch={launch}
                            />
                          ))
                      : data.lanzamientos.map(launch => (
                          <LaunchItem
                            key={launch.flight_number}
                            launch={launch}
                          />
                        ))}
                  </Fragment>
                );
              } else {
                return (
                  <Fragment>
                    <u className="h4 text-danger">No Launches Found!</u>
                    <h5>
                      Check your internet connection or see if GraphQl endpoint
                      is up and running.
                    </h5>
                  </Fragment>
                );
              }
            }}
          </Query>
          {this.props.type && (
            <div className="d-flex justify-content-end">
              <Link to={`/spaceXLaunches`} className="btn btn-secondary my-2 ">
                See all
              </Link>
            </div>
          )
          }
        </div>
      </Fragment>
    );
  }
}

export default Launches;
