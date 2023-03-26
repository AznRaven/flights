import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

function Index(props) {
  // can't use hooks or state
  // can't use event listeners in the same way
  return (
    <DefaultLayout>
      <div className="container-fluid d-flex flex-column flex-wrap justify-content-around align-items-center">
        <div className="container-fluid flex-column justify-content-center align-items-center">
          <h1 className="text-center">Flight</h1>
          <br />
          <br />
        </div>
        {/* buttons */}
        <div className="d-flex">
          <a href="/flights/new">
            <button type="button" class="btn btn-outline-primary mx-10">
              Add...
            </button>
          </a>
          <form action="/flights/clear?_method=DELETE" method="POST">
            <button class="btn btn-outline-danger">CLEAR</button>
          </form>
        </div>

        <ul
          className="d-flex flex-wrap justify-content-around my-3 flex-column"
          style={{ listStyle: "none" }}
         
        >
          {props && props.flights.map((flight, index) => (
            <div key={index}>
              <div class="p-3 my-3 justify-content-center bg-primary bg-opacity-10  border border-primary border-top-0 border-end-0 border-bottom-0 rounded-end border-5" style={{width: "50vw"}}>
                <div class="card-body">
                <a href={`/flights/${flight._id}`}><h5 class="card-title text-center ">{flight.airline}</h5></a>
                <br />
                  <h6 class="card-subtitle mb-2  text-center">Flight Number: {flight.flightNo}</h6>
                  <br />
                  <p class="card-text text-center">
                  {flight.departs.toString()}
                  </p>
                  {/* <a href="#" class="card-link">
                    Card link
                  </a>
                  <a href="#" class="card-link">
                    Another link
                  </a> */}
                </div>
              </div>
              
            </div>
          ))}
        </ul>
        {/* buttons */}
        <div className="d-flex">
          <a href="/flights/new">
            <button type="button" class="btn btn-outline-primary  mx-3">
              Add...
            </button>
          </a>

          <form action="/flights/clear?_method=DELETE" method="POST">
            <button class="btn btn-outline-danger">CLEAR</button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Index;
