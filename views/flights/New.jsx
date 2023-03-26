import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

function New({departsDate}) {
  // const now = new Date();
  // const offset = now.getTimezoneOffset() * 60 * 1000;
  // const adjusted = new Date(now.getTime() - offset).toLocaleDateString();
  let today = new Date(); // Get today's date and time
  let futureDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate() + 2,
    today.getHours(),
    today.getMinutes(),
    today.getSeconds()
  );
  let currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours()-4,
    today.getMinutes(),
    today.getSeconds()
  );
  const getRandomFlightNumber = () => {
    return Math.floor(Math.random() * 9990) + 10;
  }

  const flightNo = getRandomFlightNumber();

  return (
    <DefaultLayout>
      <div>
        <h1>New Captains Log</h1>
        <br />
        <br />
        <br />

        <form action="/flights" method="POST">
          {/* Airline */}
          <div class="input-group mb-3">
            <div class="form-floating text-center d-flex justify-content-center">
              <select
                class="form-select"
                style={{ width: "30vw" }}
                name="airline"
                aria-label="Default select example"
              >
                <option selected>Select an Airline</option>
                <option value="American">American</option>
                <option value="Southwest">Southwest</option>
                <option value="United">United</option>
              </select>
            </div>
          </div>
          {/* Destination */}
          <div class="input-group mb-3">
            <div class="form-floating text-center d-flex justify-content-center">
              <select
                class="form-select"
                style={{ width: "30vw" }}
                name="airport"
                aria-label="Default select example"
              >
                <option selected>Select a Destination</option>
                <option value="AUS">AUS</option>
                <option value="DAL">DAL</option>
                <option value="LAX">LAX</option>
                <option value="SAN" selected>SAN</option>
                <option value="SEA">SEA</option>
              </select>
            </div>
          </div>
          {/* Date Picker */}
          <div class="">
            <div class="text-center d-flex align-items-center justify-content-center flex-column">
              <label for="meeting-time">
                Choose a date/time for your flight:
              </label>
              <input
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                value={currentDate.toISOString().slice(0, 16)}
                // min="2018-06-07T00:00"
                // max="2018-06-14T00:00"
              ></input>
              
              <br />
            </div>
          </div>

          {/* Flight # */}
          <div class="input-group mb-3">
            <div class="form-floating text-center d-flex justify-content-center">
              <input
                class="form-control text-center"
                placeholder="Leave an entry here"
                id="entry"
                style={{ width: "30vw" }}
                name="flightNo"
                value={flightNo}
              ></input>
              <label for="flightNo" class="text-center">
                Flight Number
              </label>
            </div>
          </div>
          {/* Departure */}
          <div class="input-group mb-3">
            <div class="form-floating text-center d-flex justify-content-center">
              <input
                type="text"
                class="form-control text-center"
                id="ts"
                name="departs"
                placeholder="Username"
                value={`${departsDate.slice(0,10)} ${departsDate.slice(11,16)}`}
                style={{ width: "30vw" }}
              />
              <label for="departs" class="text-center">
                Departure
              </label>
            </div>
          </div>
          {/* <div class="text-center d-flex justify-content-center">
            <input
              type="checkbox"
              id="shipIsBroken"
              name="shipIsBroken"
              value="shipIsBroken"
              className="mx-3"
            ></input>
            <label htmlFor="shipIsBroken">Ship Is Broken</label>
          </div> */}
          <br />
          {/* Submit */}
          <div class="text-center d-flex justify-content-center">
            <button type="submit" class="btn btn-outline-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default New;
