import React from "react";

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="stylesheet" href="../../public/css/styles.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
      </head>
      <body>
        
        <nav class="navbar sticky-top navbar-expand-lg bg-dark">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                
                <li class="nav-item">
                  <a class="nav-link text-white  fs-3" href="/flights">
                  All Flights
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white  fs-3" href="/flights/New">
                  Add Flight
                  </a>
                </li>
    
                
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {/* // renders everything inside the wrapping component tags */}
          {props.children}
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  );
}

export default DefaultLayout;
