import React, { useState } from 'react'
import useAuthContext from '../contexts/AuthContext'
import { all } from 'axios'
import AdminAside from '../components/admin/AdminAside'
import '../style/AdminAside.css'
import '../style/AdminUsers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ActiveUser from '../components/admin/ActiveUser'
import InactiveUser from '../components/admin/InactiveUser'

export default function AdminUsers() {

  const [searchUser, setSearchUser] = useState("")
  const { selectedValue, activeUsers,inActiveUsers, deleteUser, restoreUser } = useAuthContext()
  const [selectedUsers, setSelectedUsers] = useState([]) //itt tárolódnak a suerek id-ai

  const handleCheckBoxChange = (e, userId) => { //esemény ami tárolja a változásokat
    if(e.target.checked) { // ha pipa van
      setSelectedUsers (prevSelectedUsers => [...selectedUsers, userId]) //létrehozunk a tömbről másolatot ami tartalmazza az id-ket
    }else {// ha kipipáljuk
      setSelectedUsers ( prevSelectedUsers => prevSelectedUsers.filter(id => id != userId)) //eltávolítjuk a usert akihez a checkbox tartozik
      //1 oylan új tömböt ad vissza ami nem tartalmazza azokat a usereket akiket kipipáltunk,  akiv user eltávolítjuk
    }
  }

  const handleDelete = async () => {
    try {
      for (const userId of selectedUsers) {
        await deleteUser(userId); // vár amíg midnen törlés befejeződik
      }
  
      alert('A felhasználók sikeresen törölve!')
    } catch (error) {
      console.error(error);
      alert('Hiba történt a felhasználók törlése közben.')
    }
  }

  const handleRestore = async () => {
    try {
      for (const userId of selectedUsers) {
        await restoreUser(userId); // vár amíg midnen törlés befejeződik
      }
  
      alert('A felhasználók sikeresen visszaállítva!')
    } catch (error) {
      console.error(error);
      alert('Hiba történt a felhasználók közben.')
    }
  }


 



    
  return (
    <div className='container custom-t-container'>
      <div className='row flex-wrap-nowrap gap-0 mb-2 custom-search-cont'>
        <div className='col-md-2 align-content-center text-search'>
          <div className='text-center fw-bold'>Find the user:</div>
        </div>

        <div className='col-md-10 d-flex align-items-center justifiy-content-start gap-3 custom-form'>

          <form className='w-100 d-flex'>
              <input 
              className='form-control flex-grow-1'
              type="search" 
              placeholder='search..'
              />
            </form>

          <div className='d-flex buttons'>
          <button 
          className='del-btn'
          onClick = {handleDelete} >
            Delete
          </button>
          </div>

          <div className='d-flex buttons'>
          <button className='res-btn'
          onClick = {handleRestore}
          
          >Restore</button>
          </div>
        
        </div>

      </div>
       
      <div className='row table-container'>
 
        <div className='col-md-2 custom-aside'>
          <AdminAside/>
        </div>

        <div className='col-md-10 table-responsive'>
        <div>
        
      </div>

              <table className='table table-hover table-bordered'>
                  <thead>
                      <tr className=''>
                          <th scope='col'>Choose</th>
                          <th scope="col">User id</th>
                          <th scope="col">User name</th>
                          <th scope="col">Email address</th>
                          <th scope="col">Name</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Birth year</th>
                          <th scope="col">Membership</th>
                      </tr>
                  
                  </thead>
                  <tbody>
                           
                      {selectedValue === 'active' ? (
                      activeUsers.map((user) => (
                        <ActiveUser key={user.id} user={user}  handleCheckBoxChange={handleCheckBoxChange}/>
                      ))
                    ) : (
                      inActiveUsers.map((user) => (
                        <InactiveUser key={user.id} user={user}  handleCheckBoxChange={handleCheckBoxChange}/> 
                      ))
                    )}
          
          
                  </tbody>
          
              </table>
        </div>
     
      </div>



    </div>

  )

}