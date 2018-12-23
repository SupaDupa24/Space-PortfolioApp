import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export default function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success }
}) {
  return (
    <div className="card card-body mb-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Mission:{' '}
            <span
              className={classNames({
                'text-success': launch_success,
                'text-danger': !launch_success
              })}
            >
              {mission_name.substring(0,21)}
            </span>
          </h4>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link to={`/spaceX/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}