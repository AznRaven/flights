import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

function Show(props) {
  console.log(props.flight.destinations);
  let today = new Date(); // Get today's date and time

  let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours() - 4,
    today.getMinutes(),
    today.getSeconds()
  );
  currentDate = currentDate.toISOString().slice(0, 16);
  console.log(currentDate);

  console.error("Error: Today's date is undefined");
  const usedAirports = props.flight.destinations.map(
    (destination) => destination.airport
  );
  const availableAirports = ["AUS", "DAL", "LAX", "SAN", "SEA"].filter(
    (airport) => !usedAirports.includes(airport)
  );

  return (
    <DefaultLayout>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h1>Airline: {props.flight.airline}</h1>
        <h3>Flight Number: {props.flight.flightNo}</h3>
        <h3>Departs: {props.flight?.departs?.toString()}</h3>
        {/* <h3>Destination: {props.flight.destinations[0].name}</h3> */}

        <ul>
          {props.flight.destinations.map((destination) => (
            <>
            <div className="d-flex">
              <form
                action={`/flights/${props.flight._id}/destinations/${destination._id}?_method=DELETE`}
                method="POST"
              >
                <input type="submit" value="X" />
              </form>

              <li key={destination._id} style={{ listStyle: "none" }}>
                <p>Airport: {destination.airport}</p>
                <p>Arrival: {destination?.arrival?.toString()}</p>
              </li>
            </div>
              
            </>
          ))}
        </ul>

        <br />
        <br />
        {/* details */}
        <details>
          <summary style={{ opacity: ".5" }}>Destinations:</summary>
          <form
            action={`/flights/${props.flight._id}/destinations`}
            method="POST"
          >
            {/* <h4>Aiport: {}</h4>
            <h4>Arrival:</h4> */}
            <div class="input-group mb-3">
              <div class="form-floating text-center d-flex justify-content-center">
                <select
                  class="form-select"
                  style={{ width: "30vw" }}
                  name="airport"
                  aria-label="Default select example"
                >
                  <option selected>Select a Destination</option>
                  {/* <option value="AUS">AUS</option>
                  <option value="DAL">DAL</option>
                  <option value="LAX">LAX</option>
                  <option value="SAN" selected>
                    SAN
                  </option>
                  <option value="SEA">SEA</option> */}
                  {availableAirports.map((airport) => (
                    <option value={airport}>{airport}</option>
                  ))}
                </select>
              </div>
            </div>
            <div class="">
              <div class="text-center d-flex align-items-center justify-content-center flex-column">
                <label for="arrival">Choose a date/time for your flight:</label>
                <input
                  type="datetime-local"
                  id="arrival"
                  name="arrival"
                  value={currentDate}
                  // min="2018-06-07T00:00"
                  // max="2018-06-14T00:00"
                ></input>

                <br />
              </div>
            </div>
            <button>Add Destination</button>
          </form>
        </details>
        {/* details */}
        <br />
        <div className="d-flex">
          {/* <a href={`/flights/${props.flight._id}/edit`}>
            <button className="btn btn-outline-primary">Edit</button>
          </a> */}
          <form action={`/flights/${props.flight._id}/edit`}>
            <button className="btn btn-outline-primary">Edit</button>
          </form>
          {/* <form
            action={`/flights/${props.flight._id}?_method=DELETE`}
            method="POST"
          >
            <button className="btn btn-outline-danger mx-5">Delete</button>
          </form> */}
          <form
            action={`/flights/${props.flight._id}?_method=DELETE`}
            method="POST"
          >
            <button className="btn btn-outline-danger mx-5">Delete</button>
          </form>
          {/* <a href="/flights">
            <button className="btn btn-outline-dark">Back</button>
          </a> */}
          <form action="/flights">
            <button className="btn btn-outline-dark">Back</button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Show;
