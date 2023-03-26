import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout';

function Edit(props) {
    return ( 
        <DefaultLayout>
            <h1>Edit Destination</h1>
            <div className='buttons' style={{ flexDirection: 'column' }}>
                <form action={`/flights/${props.postId}/destinations/${props.destinations._id}?_method=PUT`} method="POST">

                    <label htmlFor="clr">Body:</label><br />
                    <textarea name="body" id="clr" cols="30" rows="10" defaultValue={props.comment.body} /><br /><br />

                    <button>Submit</button>
                </form>
                <form action={`/flights/${props.postId}`}>
                    <button>Back</button>
                </form>
            </div>
        </DefaultLayout>
    );
}

export default Edit;