import React, { useState } from 'react'
import { use } from 'react';


const Users = ({usersPromise}) => {

  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = e =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = {name, email};
    console.log(newUser);

    fetch('http://localhost:1000/users',{
      
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log('data using after creating user in db:', data);

      if(data.insertedId){
        newUser._id = data.insertedId;
        const newUsers = [...users, newUser];
        setUsers(newUsers);
        alert('User added Successfully!');
        e.target.reset();
      }
    })


  }

  const handleUserDelete = (id) =>{

    console.log('delete this user', id);
    fetch(`http://localhost:1000/users/${id}`,{
      method:'DELETE'

    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount){
        const remainingUsers = users.filter(user => user._id !== id);
        setUsers(remainingUsers);
        console.log("after delete:",data);
      }
    })

  }

  return (
    <div>
      <div>
        <h3>Users: {users.length}</h3>
        <form onSubmit={handleAddUser}>
        <input name='name' type="text" />
        <br />
        <input name='email' type="email" />
        <br />
        <input type="submit" value='ADD USER'  />
      </form>
      </div>

      <div>
        {
          users.map(user => <p key={user._id}>
            {user.name} : {user.email}
            <button onClick={()=>handleUserDelete(user._id)}>X</button>
            </p>)
        }
      </div>
    </div>
    

    
  )
}

export default Users