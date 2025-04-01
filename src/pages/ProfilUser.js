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



export default function ProfilUser() {

    const {user, postUserDataModify } = useAuthContext()
    const { profilPicture, uploadProfilePicture, setProfilePicture } = useFileContext()
    const [imageFile, setImageFile] = useState(null) //kiválasztott kép frissítése
    const [ isEdit, setIsEdit ] = useState(false)

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

    const [ user_name, setUser_name ] = useState(user.user_name)
    const [ email, setEmail ] = useState(user.email)
    const [ birth_year, setBirth_year ] = useState(user.birth_year) 

    const handleSubmit = async (e) => {
      e?.preventDefault()//ha az esemény undef nem fog hibára futni, hiba elkerürés

      const postData = {
        user_name : user_name,
        email : email,
        birth_year :parseInt(birth_year),
  
      }
      try{
        await postUserDataModify(postData, 'api/user/update')
        console.log(postData)

      }catch(error){
        console.error('No datas')
      }


    }

  

    const handleClick = (e) => {//rákatt az edit gomb
      e.preventDefault()
      setIsEdit(!isEdit)

      if(isEdit){
        handleSubmit()
      }else{
        setIsEdit(true)
      }
    
      //console.log(isEdit)

    }

    
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
                <span>{formattedText}</span>
              </div>
            <label htmlFor="avatar"/>

          </div>

          <div className="mb-3 mt-3 d-flex align-items-center position-relative">
            <label htmlFor="name" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Username</label>
            <input
              onChange= {(e) => {
                setUser_name(e.target.value)
              }

              }
                
              readOnly = {!isEdit}
              type="text"
              value={user_name}
              className="form-control custom-input"
              id="user_name"
              placeholder={isEdit ? 'Editable input' : 'Disabled input'}
              name="user_name">

              </input>
              <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} 
              />


            
          </div>

          <div className="mb-3 mt-3 d-flex align-items-center position-relative">
            <label htmlFor="email" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Email address</label>
            <input
                onChange= {(e) => {
                  setEmail(e.target.value)
                }

                }
  
                

              type="email"
              value={email}
              className="form-control w-100 custom-input"
              id="email"
              placeholder="email"
              name="email"
            />
            <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} />


           
          </div>

          <div className="mb-3 mt-3 d-flex align-items-center">
            <label htmlFor="name" className="form-label me-2 text-nowrap custom-label d-none d-md-block">Birth name</label>
            <input
              type="text"
              value={user.name}
            
              className="form-control custom-input"
              id="name"
              placeholder="name"
              name="name"
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
            />
            
          </div>

          <div className='mb-3 mt-3 d-flex align-items-center position-relative'>
            <label htmlFor="birth_year" className='form-label me-2 text-nowrap custom-label d-none d-md-block'>Birth year</label>
            <input
               onChange= {(e) => {
                setBirth_year(e.target.value)
               }

               }
              type="number"
              id="birth_year"
              className="form-control custom-input"
              min="1900" 
              max={new Date().getFullYear()}
              value={birth_year} 
              placeholder="birth year"
            />
            <FontAwesomeIcon className={`position-absolute edit-icon ${isEdit ? "active" : ""}`} icon={faPenFancy} />

          </div>

          <div className=''>
          <button className='d-block m-auto' 
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
