import React, { Component } from "react";

export class Intro extends Component {
  render() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <h1 className="jumbotron-heading">Space is Awesome!</h1>
                <p className="lead text-muted">
                  Small app I made to practice my React skills. It is connected
                  to a personal GraphQl API using Apollo.  <br />
                  It fetches data of{" "}
                  <b>SpaceX</b> missions and <b>NASA</b> cool pics too. <br />
                  Click bellow to query.
                </p>
                <p>
                  <button href="#" className="btn btn-primary my-2 mx-1 ">
                    SpaceX Missions
                  </button>
                  <button href="#" className="btn btn-secondary my-2 mx-1">
                    NASA Goodies
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Intro;
