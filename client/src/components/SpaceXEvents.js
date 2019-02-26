import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const QUERY_EVENT = gql`
  query EventsQuery {
    eventosHistoricos {
      title
      event_date_utc
      flight_number
      details
      links {
        article
        wikipedia
      }
    }
  }
`;

export default function SpaceXEvents({ type }) {
  return (
    <Fragment>
      <div className={type === "Recent" ? "" : "container"}>
        <h3 className="display-5">
          {type === "Recent" ? "Recent " : "Historic "} events
        </h3>
        <Query query={QUERY_EVENT}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) console.log(error);
            if (data) {
              console.log("Estos son los eventos historicos", data);
              return (
                <Fragment>
                  <div className="list-group">
                    {type === "Recent"
                      ? data.eventosHistoricos
                          .slice(0, 3)
                          .map(
                            (
                              {
                                title,
                                event_date_utc,
                                details,
                                links: { wikipedia, article }
                              },
                              key
                            ) => (
                              <a
                                key={key}
                                href={article}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="list-group-item list-group-item-action flex-column align-items-start"
                              >
                                <div className="d-flex w-100 justify-content-between">
                                  <h5 className="mb-1">{title}</h5>
                                  <small>
                                    <Moment fromNow>{event_date_utc}</Moment>
                                  </small>
                                </div>
                                <p className="mb-1">{details}</p>
                                <small>
                                  {wikipedia != null ? wikipedia : article}
                                </small>
                              </a>
                            )
                          )
                      : data.eventosHistoricos.map(
                          (
                            {
                              title,
                              event_date_utc,
                              details,
                              links: { wikipedia, article }
                            },
                            key
                          ) => (
                            <a
                              key={key}
                              href={article}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="list-group-item list-group-item-action flex-column align-items-start"
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{title}</h5>
                                <small>
                                  <Moment fromNow>{event_date_utc}</Moment>
                                </small>
                              </div>
                              <p className="mb-1">{details}</p>
                              <small>
                                {wikipedia != null ? wikipedia : article}
                              </small>
                            </a>
                          )
                        )}
                  </div>
                  {type && (
                    <div className="d-flex justify-content-end">
                      <Link
                        to={`/spaceXEvents`}
                        className="btn btn-secondary my-2 "
                      >
                        See all
                      </Link>
                    </div>
                  )}
                </Fragment>
              );
            } else return <h5>Error</h5>;
          }}
        </Query>
      </div>
    </Fragment>
  );
}
