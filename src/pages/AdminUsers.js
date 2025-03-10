import React, { useEffect, useState } from 'react'
import useAuthContext from '../contexts/AuthContext'
import { all } from 'axios'
import AdminAside from '../components/admin/AdminAside'
import '../style/AdminAside.css'
import '../style/AdminUsers.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ActiveUser from '../components/admin/ActiveUser'

export default function AdminUsers() {

  const { selectedValue, activeUsers,inActiveUsers, deleteUser, restoreUser, getActiveUsers,getInActiveUsers, user } = useAuthContext()
  const [ usersToShow, setUsersToShow ] = useState([]) //ide mentjük az aktuálisan megjeleítendő usereket, aktív vagy inaktív
  //checkbox-ot kezeljük
  const [selectedUsers, setSelectedUsers] = useState([]) //itt tárolódnak a userek id-ai checkbox miatt kell
  const [searchUser, setSearchUser] = useState("") // a keresett felh neve amit inputban adunk, itt tároljuk
  

  //itt jelenítem meg az aktív és  inaktív userek aszerint h melyik gombra kattintanak acitive vagy inakvtiv
  useEffect(() => {
    getActiveUsers()

    if(selectedValue == 'active'){ //api hívás a selectedvalue változásakor
      getActiveUsers()
      setUsersToShow(activeUsers)
    }else if(selectedValue == 'inactive'){
      getInActiveUsers()
      setUsersToShow(inActiveUsers)
    }


  },[selectedValue])

  //console.log(selectedValue)
  //console.log(activeUsers)
  //console.log(inActiveUsers)

//frissíti a kiválasztott iuserek listáját
  const handleCheckBoxChange = (e, userId) => { //esemény ami tárolja a változásokat a checkboxban
  if(e.target.checked) { // ha pipa van
    setSelectedUsers ([...selectedUsers, userId])
  }else {
    setSelectedUsers(selectedUsers.filter((id) => id !== userId))
  }
}


  //a törlés a pipa során
  const handleDelete = async () => {
    const currentUserId = user.id
    try {
      console.log(selectedUsers)
      for (const userId of selectedUsers) {
        if(userId == currentUserId){
          alert('Sorry, you can not delete yourself!')
          return
        }
        await deleteUser(userId) // vár amíg midnen törlés befejeződik
      }
  
      alert('User is succesfully deleted!')

      const updatedUsersToShow = usersToShow.filter((user) =>!selectedUsers.includes(user.id))//kiszedjük a törölt id-kat

      setUsersToShow(updatedUsersToShow) //frissítjük
      getInActiveUsers()
      setSelectedUsers([])

    } catch (error) {
      console.error(error);
      alert('Find an error during the delete proccess.')
    }
  }

  //visszaállítja a felh-kat
  const handleRestore = async () => {
    try {
      for (const userId of selectedUsers) {
        await restoreUser(userId)// vár amíg midnen törlés befejeződik
      }
      alert('The user is succesfully restored!')
      const updatedUsersToShow = usersToShow.filter((user) =>!selectedUsers.includes(user.id))//kiszedjük a törölt id-kat

      setUsersToShow(updatedUsersToShow) //frissítjük
      getActiveUsers()
      setSelectedUsers([])

    } catch (error) {
      console.error(error);
      alert('Find an error during the restore proccess.')
    }
  }

    //a keresés kezelése ha beírun kegy user nevet
    const handleSearch = (e) => {
      setSearchUser(e.target.value) //setteljük az input értékét
      console.log(searchUser)

      if(e.target.value == ""){
        if(selectedValue === 'active'){
          setUsersToShow(activeUsers)
        }else{
          setUsersToShow(inActiveUsers)
        }
      }else{
           //console.log(e.target.value)
           const filteredUsers = usersToShow.filter(user => {
            return user.user_name.toLowerCase().includes(searchUser.toLowerCase())
          })
    
          setUsersToShow(filteredUsers) //itt állítjuk be a megjelenítést
      }

    }

  let restoreButtonDisabled = false
  let deleteButtonDisabled = false

  if(selectedValue === 'active'){
    restoreButtonDisabled = true
  }else{
    deleteButtonDisabled = true
    
  }
  
    
  return (
    <div className='container custom-t-container'>
    
      <div className='row flex-wrap-nowrap gap-0 mb-2 custom-search-cont'>
        <div className='col-md-2 text-search'>
          <div className='text-center fw-bold'>Find the user:</div>
        </div>

        <div className='col-md-10 d-flex align-items-center justifiy-content-start gap-3 custom-form'>

          <form className='w-100 d-flex'>
              <input 
              className='form-control flex-grow-1 search-input'
              type="search" 
              value={searchUser}
              onChange = {handleSearch}
              placeholder='search..'
              />
            </form>

          <div className='d-flex buttons'>
          <button 
          className='del-btn'
          disabled= {deleteButtonDisabled}
          onClick = {handleDelete} >
            Delete
          </button>
          </div>

          <div className='d-flex buttons'>
          <button className='res-btn'
          onClick = {handleRestore}
          disabled= {restoreButtonDisabled}
          
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

              <table className='table table-hover table-bordered custom-table'>
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
                    return <ActiveUser key={user.id} user={user} handleCheckBoxChange={handleCheckBoxChange} />
                
                  })
                  ) : (
                  <tr><td colSpan="8">No users found</td></tr> //kitölti a táblázatot
                  )}
               
              </tbody>
          
            </table>
        </div>

      
      </div>
      

    </div>

  )

}