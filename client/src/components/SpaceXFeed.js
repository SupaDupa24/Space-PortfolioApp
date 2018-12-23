import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader2 from "./loader2";
import LaunchItem from "./LaunchItem";

const QUERY_ULTIMO_LANZAMIENTO = gql`
  query LastLaunchQuery {
    ultimoLanzamiento {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const QUERY_PROXIMO = gql`
  query NextLaunchQuery {
    proximoLanzamiento {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export default function SpaceXFeed() {
  return (
    <Fragment>
      <div className="container my-5">
      <h3 className="text-center my-4">SpaceX Latest News</h3>
        <div className="row">            
          <div className="col-md">
          <h4 className="text-center my-3 font-weight-bold"> <span className="text-info">Last Launch Performed</span></h4>
            <Query query={QUERY_ULTIMO_LANZAMIENTO}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <div>
                      <Loader2 />
                      <h5 className="text-center">Loading...</h5>
                    </div>
                  );
                if (error) console.log(error);
                
                if (data) {
                  console.log("Este es el ultimo lanzamiento", data.ultimoLanzamiento);
                  return (
                    <Fragment>
                      <LaunchItem
                            key={data.ultimoLanzamiento.flight_number}
                            launch={data.ultimoLanzamiento}
                          />
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment>
                      <u className="h4 text-danger">No Launches Found!</u>
                      <h5>
                        Check your internet connection or see if GraphQl
                        endpoint is up and running.
                      </h5>
                    </Fragment>
                  );
                }
              }}
            </Query>
          </div>
          <div className="col-md" >
          <h4 className="text-center my-3 font-weight-bold"> <span className="text-warning">Next Launch to Come!</span></h4>
            <Query query={QUERY_PROXIMO}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <div>
                      <Loader2 />
                      <h5 className="text-center">Loading...</h5>
                    </div>
                  );
                if (error) console.log(error);
                
                if (data) {
                  console.log("Este es el ultimo lanzamiento", data.proximoLanzamiento);
                  return (
                    <Fragment>
                      <LaunchItem
                            key={data.proximoLanzamiento.flight_number}
                            launch={data.proximoLanzamiento}
                          />
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment>
                      <u className="h4 text-danger">No Launches Found!</u>
                      <h5>
                        Check your internet connection or see if GraphQl
                        endpoint is up and running.
                      </h5>
                    </Fragment>
                  );
                }
              }}
            </Query>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
