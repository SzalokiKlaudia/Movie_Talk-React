import React, { useState } from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import useFileContext from '../contexts/FileContext'
import '../style/Profil.css'
import Avatar from '@mui/material/Avatar'; // material ui használat...
import { IconButton } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenFancy } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'



export default function ProfilUser() {

    const {user, postUserDataModify, getUser, userErrors, setUserErrors } = useAuthContext()
    const { profilPicture, uploadProfilePicture, setProfilePicture } = useFileContext()
    const [imageFile, setImageFile] = useState(null) //kiválasztott kép frissítése
    const [ isEdit, setIsEdit ] = useState(false)//ikonok láthatóságáért felel ha true active lesz, és a gomb feliratért false-ként edit, true-ként save, input szerkesztéséért felel

    const defaultProfilePicture = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    const profileImage = profilPicture ? profilPicture : defaultProfilePicture
    //ha nincs kiválasztott kép a default kép lesz, ha van akkor a kiválasztott lesz


    //console.log(user)
    //console.log(profilPicture) //akt profilkép elérési útja


    const handleImageChange = (event) => {// a kiválasztott fájlt beállítjuk az imagefilba
      const file = event.target.files[0];
      if (file) {
          setImageFile(file)
          uploadProfilePicture(file)//majd a filet feltöltjük post kéréssel
      }
    }


    const isChecked = user.is_admin === 1

    const text = user.created_at
    const data = new Date(text)
    const formattedText = data.toISOString().split("T")[0].replace(/-/g, ".")
    //console.log(formattedText)

    //profil adatok változtatása
    const [ user_name, setUser_name ] = useState(user.user_name)
    const [ email, setEmail ] = useState(user.email)
    const [ birth_year, setBirth_year ] = useState(user.birth_year) 
    const [ showNoValidEmail, setShowNovalidEmail ] = useState(false) 
    const isValidateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g

  
    
    //validálás regex-el

    const validateEmail = (e) => {
      const value = e.target.value || ''//hogy módosítható legyen az input értéke
      setEmail(value)

      if(e.target?.value && e.target.value.match(isValidateEmail)){
        setShowNovalidEmail(false)//ne jelenjen meg hibaüzenet ha valid az email

      }else{
        setShowNovalidEmail(true)
      }
    }

    const handleSubmit = async (e) => {
      e?.preventDefault()//ha az esemény undef nem fog hibára futni, hiba elkerürés


      if(user_name != user.user_name || email != user.email || birth_year != user.birth_year){//ne küldjük el az alap állapotot újra...
       
        if(email.length && email.match(isValidateEmail)){
          setEmail(email)
        
          const postData = {
            user_name : user_name,
            email : email,
            birth_year :parseInt(birth_year),
      
          }
  
          try{
            await postUserDataModify(postData, 'api/user/update')
            await getUser()

            console.log(postData)
            setIsEdit(false)//gomb feliratát visszaállítjuk savere
            setUserErrors({})
    
          }catch(error){
            setUser_name(user.user_name)
            setBirth_year(user.birth_year)
    
            console.error('No datas')
          }

        }else{
        Swal.fire("Please, add a valid email!")
        setEmail(user.email)


        }
      }
    }
  
    //klikk esemény gombra
    const handleClick = (e) => {//rákatt az edit gomb vagy save gombra
      e.preventDefault()

      setIsEdit(!isEdit)// az editből save lesz, a saveből edit lesz

      if(isEdit){//ha szerekszthető állapotban van akkro fusson csak a submit folyamat

        handleSubmit()
      }else{//ha nem változtatunk semmit akkor is változzon a gomb felirata vissza

        setIsEdit(true)

      }
    
      //console.log('isEdit', isEdit)

    }

    //console.log(userErrors)

  return (
    <>
  
    
    <div className='main-profile-admin'>
   
      <div className="container p-0 custom-border-user">
        <div className='profil-cont'>
          <form className='form' onSubmit={handleSubmit}>

              <div className='update-image-section d-flex align-items-center'>
                  <input type="file" 
                      onChange={handleImageChange} 
                      id="upload" 
                      accept="image/*" 
                      name="profile_picture"  // nagyon fontos h megegyezzen a backenden ezt validáljuk is
                  /> 
              
                  <label htmlFor="upload" className='avatar-section'>
                    <IconButton className="upload-button" 
                      color="primary" 
                      aria-label="upload picture" 
                      component="span">
                      <Avatar id="avatar"
                        className='profile-avatar' 
                        src={profileImage}
                      />

                    </IconButton>
                  </label>

                <div className='m-3'>
                  <h3>{user.name}</h3>
                  <span className='fw-bold'>Membership since: </span>
                  <span>{formattedText}.</span>
                </div>
              </div>

            <div className="mb-3 mt-3 d-flex align-items-center position-relative">
              <label htmlFor="name" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Username</label>
              <input
                onChange= {(e) => {
                  setUser_name(e.target.value)
                }

                }
                
                readOnly = {!isEdit}
                aria-expanded={isEdit ? "true" : "false"}
                type="text"
                value={user_name}
                className="form-control custom-input"
                id="user_name"
                placeholder={isEdit ? 'Editable input' : 'Disabled input'}
                name="user_name"/>

              
              <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} 
              />
               
            </div>
            <div>
                  {userErrors.user_name && (
                    <span className="text-danger">{userErrors.user_name}</span>
                  )}
            </div>

            <div className="mb-3 mt-3 d-flex align-items-center position-relative">
              <label htmlFor="email" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Email address</label>
              <input
                onChange= {validateEmail}
                readOnly = {!isEdit}
                type="email"
                value={email}
                className="form-control w-100 custom-input"
                id="email"
                placeholder="email"
                name="email"
             /> 
              <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} />
            </div>
            <div>
                  {userErrors.email && (
                    <span className="text-danger">{userErrors.email}</span>
                  )}
            </div>

            <div className="mb-3 mt-3 d-flex align-items-center">
              <label htmlFor="name" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Birth name</label>
              <input
                type="text"
                onChange= {(e) => {
                
                }

                }
                value={user.name}
                readOnly = {false}
                className="form-control custom-input"
                id="name"
                placeholder="name"
                name="name"
                disabled = 'disabled'
              /> 
           
            </div>

            <div className="mb-3 mt-3 d-flex align-items-center">
              <label htmlFor="gender" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Gender</label>
              <input
                type="text"
                value={user.gender}
              
                className="form-control custom-input"
                id="gender"
                placeholder="gender"
                name="gender"
                disabled = 'disabled'
              /> 
            
            </div>

            <div className='mb-3 mt-3 d-flex align-items-center position-relative'>
              <label htmlFor="birth_year" className='form-label me-2 text-nowrap custom-label d-none d-md-block'>Birth year</label>
              <input
                onChange= {(e) => {
                  setBirth_year(e.target.value)
                }

                }
                readOnly = {!isEdit}
                type="number"
                id="birth_year"
                className="form-control custom-input"
                value={birth_year} 
                placeholder="birth year"
              /> 
              <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} />

            </div>
            <div>
                  {userErrors.birth_year && (
                    <span className="text-danger">{userErrors.birth_year[0]}</span>
                  )}
            </div>

            <div className=''>
            <button className='edit-btn d-block m-auto' 
            onClick={handleClick}
            type='button'
            aria-expanded={isEdit ? "true" : "false"}> 
              {!isEdit ? 'Edit' : 'Save'}</button>
            </div>
        </form>
      
        </div>
      </div>
    </div>
  </>
  )
}
