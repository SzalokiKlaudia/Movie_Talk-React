import React from 'react'
import '../../style/TopUsers.css'
import useFileContext from '../../contexts/FileContext';
import useAuthContext from '../../contexts/AuthContext';


export default function TopUser(props) {
    
    //console.log(props.user)
    //áthoztuk a lekérdezésből a számot h mely felh hányszor szavazott és abból top 5 ez a number
    const baseUrl = process.env.REACT_APP_API_URL + '/storage'

    const imageUrl = baseUrl + `/${props.user.profile_picture_name}`
    //console.log(props.user.profile_picture_name)
    const defaultProfilePicture = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"

    const maxValue = 100
    //itt számoljuk ki a szélességet a meternek dinamikusan
    const percentage = Math.min((props.user.number / maxValue) * 100, 100)//nem haladja meg a 100% feletti értéket

  return (
    <li className='user'>
        <div className='avatar'>
            <img src={props.user.profile_picture_name ? imageUrl : defaultProfilePicture}  alt="picture" />

        </div>
        <div className='data'>
            <h4>{props.user.user_name}</h4>
            <div className='meter-all'>
                <div  className='meter'style={{width: `${percentage}%` }}></div>
                <h6 className='number'>{props.user.number}</h6>
              
            </div>

        </div>

    </li>
  )
}
