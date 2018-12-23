import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Loading2 from "./loader2";


const QUERY_DE_LANZAMIENTO = gql`
  query LaunchQuery($flight_number: Int!) {
    lanzamiento(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <div className="container">
          <div className="row my-5">
            <Query
              asyncMode
              query={QUERY_DE_LANZAMIENTO}
              variables={{ flight_number }}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loading2 />;
                if (error) console.log(error);
                const {
                  mission_name,
                  flight_number,
                  launch_year,
                  launch_success,
                  rocket: { rocket_id, rocket_name, rocket_type }
                } = data.lanzamiento;

                return (
                  <div>
                    <h1 className="display-4 my-3">
                      <span className="text-dark">Mission:</span> {mission_name}
                    </h1>
                    <h4 className="mb-3">Launch Details</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        Flight Number: {flight_number}
                      </li>
                      <li className="list-group-item">
                        Launch Year: {launch_year}
                      </li>
                      <li className="list-group-item">
                        Launch Successful:{" "}
                        <span
                          className={classNames({
                            "text-success": launch_success,
                            "text-danger": !launch_success
                          })}
                        >
                          {launch_success ? "Yes" : "No"}
                        </span>
                      </li>
                    </ul>

                    <h4 className="my-3">Rocket Details</h4>
                    <ul className="list-group">
                      <li className="list-group-item">
                        Rocket ID: {rocket_id}
                      </li>
                      <li className="list-group-item">
                        Rocket Name: {rocket_name}
                      </li>
                      <li className="list-group-item">
                        Rocket Type: {rocket_type}
                      </li>
                    </ul>
                    <hr />
                    <Link to="/" className="btn btn-secondary">
                      Back
                    </Link>
                  </div>
                );
              }}
            </Query>
          </div>
        </div>
       
      </Fragment>
    );
  }
}

export default Launch;
