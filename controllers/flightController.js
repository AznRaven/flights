// Load the flight model
const { Flights, Destinations } = require("../models/flightModels");

// The callback functions originally the second argument from -> app.get('/', () => {})
module.exports.index = async (req, res) => {
  try {
    // Use the flight model to interact with the database
    // find will get all documents from the flight collection
    const flights = await Flights.find();
    console.log(flights);

    // Looks in the views folder for "flights/Index" and passes { flight } data to the view (kind of like a server props object)
    res.render("flights/Index", { flights });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// Those anonymous callback functions now have names: "index" and "show"
module.exports.show = async (req, res) => {
  try {
    const flight = await Flights.findById(req.params.id).populate(
      "destinations"
    );
    res.render("flights/Show", { flight});
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// GET /flights/new
module.exports.new = (req, res) => {
  const newFlight = new Flights({
    airline: req.body.airline,
    flightNo: req.body.flightNo,
    departs: req.body.departs,
    airport: req.body.airport,
  });

  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/New", { departsDate });
};

// flight /flight
module.exports.create = async (req, res) => {
  console.log("flight /flights");

  try {
    // use the model to interact with db and create a new document in the flight collection
    console.log('**********************************')
    console.log('create', req.body)
    console.log('**********************************')

    const destinations = Destinations.create(req.body);
    const result = await Flights.create(req.body);
    await Flights.findByIdAndUpdate(req.params.id, {
      // and push the new destination document's id
      $push: {
        // to the flight's destinations field/property
        destinations: destinations._id,
      },
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  res.redirect("/flights");
};

// DELETE /flights/:name
module.exports.delete = async (req, res) => {
  try {
    console.log("DELETE /flights/:id");
    await Flights.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// GET /flights/:name/edit
module.exports.edit = async (req, res) => {
  console.log("GET /flights/:id/edit");
  try {
    // const flight = await Flights.findById(req.params.id);
    const flight = await Flights.findByIdAndUpdate(req.params.id, req.body);
    res.render("flights/Edit", { flight });
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// PUT /flights/:id
module.exports.update = async (req, res) => {
  console.log("PUT /flights/:id");
  console.log(req.body);

  if (req.body.shipIsBroken) {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }

  try {
    // pass the id to find the document in the db and the form data (req.body) to update it
    console.log("inside update");
    console.log(req.body);
    await Flights.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/flights/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.seed = async (req, res) => {
  console.log("flight /flights/seed");
  try {
    await Flights.deleteMany({}); // Keep empty to delete everything
    Flights.create(flight);
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

module.exports.clear = async (req, res) => {
  console.log("DELETE /flights/clear");
  try {
    await Flights.deleteMany({});
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
};

// EXTRA LOGIC (for destinations)

module.exports.createDestination = async (req, res) => {
  // create a destination by updating the destinations property in flight
  await Flights.findByIdAndUpdate(req.params.id, {
      // push the req.body to the destinations property/field of this flight document
      $push: {
          destinations: req.body
      }
  })
  res.redirect(`/flights/${req.params.id}`)
}

module.exports.deleteDestination = async (req, res) => {
  // delete a destination by updating the destinations property in flight
  await Flights.findByIdAndUpdate(req.params.id, {
      // pulling out or removing a subdocument  
      $pull: {
          // from the destinations property/field
          destinations: {
              // with a matching destination id
              _id: req.params.cid
          }
      }
  })
  res.redirect(`/flights/${req.params.id}`)
}

module.exports.indexDestination = async (req, res) => {
  // target the destinations property 
  const flight = await Flights.findById(req.params.id)
  res.send(flight.destinations)
}

module.exports.showDestination = async (req, res) => {
  // find the flight and filter it's destinations property array
  const flight = await Flights.findById(req.params.id)
  const [ destination ] = flight.destinations.filter(destination => destination._id.toString() === req.params.cid) 
  res.render('destinations/Edit', { flightId: req.params.id, destination })
}

module.exports.updateDestination = async (req, res) => {
  // update a destination by updating an item in the destinations property in flight

  // OPTION 1: using only Mongo operators and queries (more confusing)
console.log(req.body) 
  // find the flight with the matching id, then check that flight's destinations for matching destination id
  await Flights.updateOne({ _id: req.params.id, 'destinations._id': req.params.cid }, {
      // set/replace the content 
      $set: {
          // of the destination at index (represented by $) and change its body property   -->    destinations[1].body = 'value
          'destinations.$.body': req.body.body // req.body is the form data and req.body.body is the updated value of the destination
      }
  })

  // OPTION 2: using plain JavaScript together with Mongo queries (less efficient)

  // const flight = await Flights.findById(req.params.id)
  // const index = flight.destinations.findIndex(destination => destination._id.toString() === req.params.cid)
  // flight.destinations[index].body = req.body.body
  // await flight.save()

  res.redirect(`/flights/${req.params.id}`)
}