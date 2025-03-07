import React, { useState } from 'react'
import useAuthContext from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import useFileContext from '../contexts/FileContext'
import '../style/Profil.css'
import Avatar from '@mui/material/Avatar'; // material UI
import { IconButton } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';



export default function ProfilAdmin() {

    const {user} = useAuthContext()
    const { profilPicture, uploadProfilePicture, setProfilePicture } = useFileContext()
    const [imageFile, setImageFile] = useState(null) //kiválasztott kép frissítése

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
    
  return (
    
    <div className="container p-0 custom-border">
      <div className='p-5'>
        <form>

          <div className='update-image-section d-flex align-items-center'>
              <input type="file" onChange={handleImageChange} id="upload" accept="image/*" style={{display: "none"}}
                name="profile_picture"  // nagyon fontos h megegyezzen a backenden ezt validáljuk is
              />
             
            <label htmlFor="upload" className='avatar-section'>
                <IconButton className="upload-button" color="primary" aria-label="upload picture" component="span">
                    <Avatar id="avatar"className='profile-avatar' src={profileImage}/>

                </IconButton>
            </label>
              <div className='m-3'>
                <h3>{user.name}</h3>
                <span className='fw-bold'>Membership since: </span>
                <span>{formattedText}</span>
              </div>
            <label htmlFor="avatar"/>

          </div>

          <div className="mb-3 mt-3 d-flex align-items-center">
            <label htmlFor="name" className="form-label me-2 text-nowrap custom-label">Username</label>
            <input
              type="text"
              value={user.user_name}
             
              className="form-control custom-input"
              id="user_name"
              placeholder="Disabled input"
              name="user_name"
            />
           
          </div>

          <div className="mb-3 mt-3 d-flex align-items-center">
            <label htmlFor="email" className="form-label me-2 text-nowrap custom-label">Email address</label>
            <input
              type="email"
              value={user.email}
            
              className="form-control w-100 custom-input"
              id="email"
              placeholder="email"
              name="email"
            />
           
          </div>

          <div className="mb-3 mt-3 d-flex align-items-center">
            <label htmlFor="name" className="form-label me-2 text-nowrap custom-label">Birth name</label>
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
            <label htmlFor="gender" className="form-label me-2 text-nowrap custom-label">Gender</label>
            <input
              type="text"
              value={user.gender}
             
              className="form-control custom-input"
              id="gender"
              placeholder="gender"
              name="gender"
            />
            
          </div>

          <div className='mb-3 mt-3 d-flex align-items-center'>
            <label htmlFor="birth_year" className='form-label me-2 text-nowrap custom-label'>Birth year</label>
            <input
              type="number"
              id="birth_year"
              className="form-control custom-input"
              min="1900" 
              max={new Date().getFullYear()}
              value={user.birth_year} 
              placeholder="birth year"
            />
            
          </div>

          <div>
            <label>
              <input type="checkbox" checked={isChecked} readOnly />
               Are you an admin?
            </label>
          </div>

        </form>
    </div>
    </div>
  
  )
}
