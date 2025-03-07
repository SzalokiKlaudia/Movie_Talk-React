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

  const { selectedValue, activeUsers,inActiveUsers, deleteUser, restoreUser, getActiveUsers,getInActiveUsers, currentPage,totalPages, setCurrentPage } = useAuthContext()
  const [selectedUsers, setSelectedUsers] = useState([]) //itt tárolódnak a userek id-ai checkbox miatt kell

  //checkbox-ot kezeljük
  const handleCheckBoxChange = (e, userId) => { //esemény ami tárolja a változásokat a checkboxban
    if(e.target.checked) { // ha pipa van
      setSelectedUsers (prevSelectedUsers => [...selectedUsers, userId]) //létrehozunk a tömbről másolatot ami tartalmazza az id-ket
    }else {// ha kipipáljuk
      setSelectedUsers ( prevSelectedUsers => prevSelectedUsers.filter(id => id != userId)) //eltávolítjuk a usert akihez a checkbox tartozik
      //1 oylan új tömböt ad vissza ami nem tartalmazza azokat a usereket akiket kipipáltunk,  akiv user eltávolítjuk
    }
  }
  //a törlés a pipa során
  const handleDelete = async () => {
    try {
      for (const userId of selectedUsers) {
        await deleteUser(userId) // vár amíg midnen törlés befejeződik
      }
  
      alert('User is succesfully deleted!')
    } catch (error) {
      console.error(error);
      alert('Find an error during the delete proccess.')
    }
  }

  //visszaállítja a felh-kat
  const handleRestore = async () => {
    try {
      for (const userId of selectedUsers) {
        await restoreUser(userId); // vár amíg midnen törlés befejeződik
      }
  
      alert('The user is succesfully restored!')
    } catch (error) {
      console.error(error);
      alert('Find an error during the restore proccess.')
    }
  }

  const [searchUser, setSearchUser] = useState("") // a keresett felh neve amit inputban adunk, itt tároljuk


    //a keresés kezelése ha beírun kegy user nevet
    const handleSearch = (e) => {
      setSearchUser(e.target.value) //setteljük az input értékét
    }

    let filteredActiveUsers = activeUsers.filter(user => //végigmegyünk az aktívakon, és ellenőrizzük h egyezik az input értékkel ha igen, visszatérünk vele
      user.user_name.toLowerCase().includes(searchUser.toLowerCase())  
    )

    let filteredInActiveUsers = inActiveUsers.filter(user =>
      user.user_name.toLowerCase().includes(searchUser.toLowerCase())  
    )

    let usersToShow

    if (selectedValue === 'active') {
      usersToShow = filteredActiveUsers
    } else {
      usersToShow = filteredInActiveUsers
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
              value={searchUser}
              onChange = {handleSearch}
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
                           
                  {usersToShow.length > 0 ? (
                usersToShow.map((user) => {
                  if (selectedValue === 'active') {
                    return <ActiveUser key={user.id} user={user} handleCheckBoxChange={handleCheckBoxChange} />
                  } else if (selectedValue === 'inactive') {
                    return <InactiveUser key={user.id} user={user} handleCheckBoxChange={handleCheckBoxChange} />
                  }
                  return null
                })
              ) : (
                <tr><td colSpan="8">No users found</td></tr>
              )}
                  </tbody>
          
            </table>
        </div>

      
      </div>
      



    </div>

  )

}