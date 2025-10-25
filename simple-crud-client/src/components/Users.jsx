import React from 'react'


const Users = () => {

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
        alert('User added Successfully!');
        e.target.reset();
      }
    })


  }

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input name='name' type="text" />
        <br />
        <input name='email' type="email" />
        <br />
        <input type="submit" value='ADD USER'  />
      </form>
    </div>
  )
}

export default Users