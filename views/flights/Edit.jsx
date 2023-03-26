import React from "react";
import DefaultLayout from "../layouts/DefaultLayout";

function Edit(props) {
  return (
    <DefaultLayout>
      <div>
        <h1>Edit caplog</h1>
        <form action={`/caplog/${props.caplog._id}?_method=PUT`} method="POST">
          <label htmlFor="nme">Name:</label>
          <br />
          <input type="text" id="nme" name="title" value={props.caplog.title} />
          <br />
          <br />
          <input type="text" id="entry" name="entry" value={props.caplog.entry} />
          <br />
          <br />
          <button className="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    </DefaultLayout>
  );
}

export default Edit;