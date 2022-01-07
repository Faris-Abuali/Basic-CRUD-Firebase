import './App.css';
import { useState, useEffect } from 'react'
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from '@firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const usersCollectionRef = collection(db, 'users'); // users is the collection's name


  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      setUsers(data.docs.map((doc) => {
        return ({ ...doc.data(), id: doc.id })
      }));

      console.log(users);
    }

    getUsers();

  }, []);

  const createUser = async () => {
    console.log(newName, newAge);
    // Add a document to our users collection
    const addedDoc = await addDoc(usersCollectionRef,
      {
        name: newName,
        age: Number(newAge)
      })

    // Update the users state (Add the newly added document to the users array)
    setUsers([...users, { id: addedDoc.id, name: newName, age: newAge }]);
    // Update the states
    setNewName('')
    setNewAge(0)
  };

  const updateUser = async (docId, docAge) => {
    //console.log(docId, docAge);
    // First of All: Grab the specific document
    const userDoc = doc(db, 'users', docId);
    // Now the userDoc variable holds the specific document which we want to update, which is a document in the 'users' collection, which is inside the database db
    const newFields = { age: Number(docAge) + 1 };
    await updateDoc(userDoc, newFields);

    // Now update the users' state
    setUsers(
      users.map((user) => {
        if (user.id === docId) {
          return { ...user, age: Number(user.age) + 1 }
        }
        else {
          return user
        }
      })
    );
  }

  const deleteUser = async (docId) => {
    const userDoc = doc(db, 'users', docId);
    await deleteDoc(userDoc);

    // Now update the users' state
    setUsers(
      users.filter((user) => user.id !== docId)
    )
  }

  return (
    <div className="App">
      <input
        placeholder='name'
        onChange={(event) => {
          setNewName(event.target.value)
        }}
        value={newName}
      />

      <input
        type='number'
        placeholder='age'
        onChange={(event) => {
          setNewAge(event.target.value)
        }}
        value={newAge}
      />
      <button
        onClick={createUser}
      >
        Create User
      </button>
      {
        users.map((user) => {
          return (
            <div key={user.id}>
              <div>Name: {user.name}</div>
              <div>Age: {user.age}</div>
              <button
                onClick={() => { updateUser(user.id, user.age) }}
              >
                increase age
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id)
                }}
              >
                Delete User
              </button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
