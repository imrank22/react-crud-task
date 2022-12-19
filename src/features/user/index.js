import './User.css';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { setUsers, setUserToEdit } from './userSlice';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import { useSelector } from 'react-redux'
import { fetchUsers } from './userService';


function App() {
  const dispatch = useDispatch()
  const { users, userToEdit } = useSelector(state => state.userReducer)

  useEffect(() => {
    fetchUsers()
      .then(data => {
        if (data.status === 200) {
          let users = data.data.slice(0, 5).map(ele => {
            ele.companyName = ele.company.name
            return ele
          })
          dispatch(setUsers(users))
        }
        else dispatch(setUsers())
      })
      .catch(err => dispatch(setUsers()))

    return () => dispatch(setUsers())
  }, [])

  const deleteUser = (id) => {
    let newUsers = JSON.parse(JSON.stringify(users))
    newUsers = newUsers.filter(ele => ele.id !== id)
    dispatch(setUsers(newUsers))
  }

  const editUser = (user) => dispatch(setUserToEdit(user))

  return (
    <div className="App" style={{ width: '70%', margin: '0 auto', marginTop: '4%' }}>

      <AddUser user={userToEdit} users={users} />
      <UserList users={users} deleteUser={deleteUser} editUser={editUser} />

    </div>
  );
}

export default App;
