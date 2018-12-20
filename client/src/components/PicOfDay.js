import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_IMAGEN_DEL_DIA = gql`
  query LaunchesQuery {
    apod {
        copyright
        date
        title
        url
        hdurl
        explanation
    }
  }
`;
const PicOfDay = props => {
  return (
    <Fragment>
      <Query query={QUERY_IMAGEN_DEL_DIA}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);
          console.log("Esta es la imagen del dia", data);
          const { copyright, date, title, url, hdurl, explanation} = data.apod;  
          return (
            <Fragment>
              <div style={{width:500}} className="card mb-4 shadow-sm">
                <div className="card-header">NASA Picture of the Day</div>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <img className="card-img-top mb-2" src={url} alt={title}></img>
                  <p className="card-text">
                    <strong>
                      <i className="fas fa-play" /> Photo by{" "}
                    </strong>{" "}
                    : {copyright}
                    <br />
                    <strong>
                      <i className="fas fa-compact-disc" /> Date{" "}
                    </strong>{" "}
                    : {date}
                  </p>
                </div>
              </div>
            </Fragment>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default PicOfDay;
