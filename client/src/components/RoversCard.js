import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader2 from "./loader2";
import { Link } from "react-router-dom";

const QUERY_CURIOSITY = gql`
  query CuriosistyQuery {
    curiosity {
      id
      sol
      img_src
      earth_date
      rover {
        id
        name
        status
        launch_date
        landing_date
      }
    }
  }
`;

export default function RoversCard() {
  return (
    <Fragment>
        <h2 className="display-5 my-4 text-center">
           Rover Pictures
        </h2>
      <Query query={QUERY_CURIOSITY}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div>
                <Loader2 />
                <h5 className="text-center">Loading Rover Pics...</h5>
              </div>
            );
          if (error) console.log(error);
          if (data) {
            console.log("Esto son las imagenes del rovers", data);
            const { curiosity } = data;
            return (
              <Fragment>
                <div className="container my-5">
                  <div className="row">
                    {curiosity.map(imagen => {
                      return (
                        <div className="col-lg-4">
                          <div className="card mb-3">
                            <h3 className="card-header" />
                            <div className="card-body">
                              <h5 className="card-title">
                                Special title treatment
                              </h5>
                            </div>
                            <img
                              style={{ height: 200 }}
                              src={imagen.img_src}
                              alt="Card image"
                            />

                            <div className="card-body">
                              <p  className="card-text">
                                Mars Rover: <span className="bold">{imagen.rover.name}</span>
                                <br></br>
                                Rover status: <span className="text-success">{imagen.rover.status}</span>
                                <br></br>
                                Launch date: {imagen.rover.launch_date}
                                <br></br>
                                Landing date: {imagen.rover.landing_date}
                              </p>
                              <p>
                                  Photo Taken <span className="text-primary">{imagen.earth_date}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          } else {
            return (
              <Fragment>
                <u className="h4 text-danger">No Rover Images Found!</u>
                <h5>
                  Check your internet connection or see if GraphQl endpoint is
                  up and running.
                </h5>
              </Fragment>
            );
          }
        }}
      </Query>
    </Fragment>
  );
}
