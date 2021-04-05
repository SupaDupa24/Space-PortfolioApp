import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "./loader";
import Emoji from "./Emoji";

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
      <Query asyncMode query={QUERY_IMAGEN_DEL_DIA}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Fragment>
                <div className="row d-sm-none d-md-block">
                  <div
                    style={{ width: 500 }}
                    className="card mb-4 shadow-sm mx-auto"
                  >
                    <div className="card-header text-bold font-weight-bold">
                      {" "}
                      NASA <span className="text-success">
                        {" "}
                        Astronomy{" "}
                      </span>{" "}
                      Picture of the Day
                    </div>
                    <div className="card-body">
                      <Loader />
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          if (error) console.log(error);
          if (data) {
            console.log("Esta es la imagen del dia", data);
            const {
              copyright,
              date,
              title,
              url,
              explanation
            } = data.apod;
            let acum = 0
            let parr1 = []
            let parr2 = []
            if (explanation) {
              const size = explanation.length
              const stringArray = explanation.replace(/([.?!])\s*(?=[A-Z])/g, "$1| ").split("|")
              stringArray.forEach(current => {
              
                if (acum < size/2 ) 
                  parr1.push(current)
                else 
                  parr2.push(current)
                acum += current.length
                
              });
            }
          
            if (!url.startsWith("https://www.youtube")) {
              return (
                <Fragment>
                  <div id="APOD" style={{}} className="card mb-4 shadow-sm">
                    <div className="card-header text-bold font-weight-bold">
                      {" "}
                      NASA <span className="text-success">
                        {" "}
                        Astronomy{" "}
                      </span>{" "}
                      Picture of the Day
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{title}</h4>
                      <div className="row">
                        <div className="col-md">
                          <img
                            className="card-img-top mb-2"
                            src={url}
                            alt={title}
                          />
                          <p className="card-text">
                            <strong>
                              <i className="fas fa-play" /> Photo by{" "}
                            </strong>{" "}
                            : {copyright !== null ? copyright : <i>Public</i>}
                            <br />
                            <strong>
                              <i className="fas fa-compact-disc" /> Date{" "}
                            </strong>{" "}
                            : {date}
                          </p>
                        </div>{" "}
                        <div className="col-md">
                          <h5>Description</h5>
                          <div>
                            <p className=" text-justify text-muted">
                              {
                                parr1.map(e => e)
                              }
                              <br/> <br/>
                              {
                                parr2.length !== 0 ? parr2.map(e => e) :""
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            } else {
              return (
                <Fragment>
                  <div id="APOD" style={{}} className="card mb-4 shadow-sm">
                    <div className="card-header text-bold font-weight-bold">
                      {" "}
                      NASA <span className="text-success">
                        {" "}
                        Astronomy{" "}
                      </span>{" "}
                      Picture of the Day
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{title}</h4>
                      <div className="row">
                        <div className="col-md">
                          <div className="embed-responsive embed-responsive-16by9 mb-2">
                            <iframe
                            title={title}
                              className="embed-responsive-item"
                              src={url}
                              allowFullScreen
                            />
                          </div>
                          <p className="card-text">
                            <strong>
                              <i className="fas fa-play" /> Photo by{" "}
                            </strong>{" "}
                            : {copyright === null ? <span>Not Specified</span>: copyright  }
                            <br />
                            <strong>
                              <i className="fas fa-compact-disc" /> Date{" "}
                            </strong>{" "}
                            : {date}
                          </p>
                        </div>{" "}
                        <div className="col-md">
                          <h5>Description</h5>
                          <div>
                            <p className=" text-justify text-muted">
                              {explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            }
          } else {
            return (
              <Fragment>
                <div className="row">
                  <div
                    style={{ width: 550 }}
                    className="card mb-4 shadow-sm mx-auto"
                  >
                    <div className="card-header text-bold font-weight-bold">
                      {" "}
                      NASA <span className="text-success">
                        {" "}
                        Astronomy{" "}
                      </span>{" "}
                      Picture of the Day
                    </div>
                    <div className="card-body">
                      <h4 className="card-text">
                        Whoops! It seems there is no picture for today{" "}
                        <Emoji symbol="😟" />
                      </h4>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          }
        }}
      </Query>
    </Fragment>
  );
};

export default PicOfDay;
