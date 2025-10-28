import React from 'react'
import {useLoaderData} from 'react-router-dom';

const UpdateUser = () => {
  const user = useLoaderData();

  const handleUpdateUser = e =>{
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const UpdateUser = {name, email};
      console.log(UpdateUser);

      //update user info in the db
      fetch(`http://localhost:1000/users/${user._id}`,{
        method:'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(UpdateUser)
      })
      .then(req=> req.json())
      .then(data=> {
        if(data.modifiedCount){
          console.log('update done', data);
        }
        
      })
    }

  return (
    <div>
      <form onSubmit={handleUpdateUser}>
        <input type='text' name='name' defaultValue={user.name}></input>
        <br />
        <input type="email" name='email' defaultValue={user.email} />
        <br />
        <input type="submit" value='Update User' />
      </form>
    </div>
  )
}

export default UpdateUser