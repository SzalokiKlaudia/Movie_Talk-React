import React from 'react'
import '../../style/TopUsers.css'


export default function TopUser(props) {
    console.log(props.user)

    const maxValue = 100; 
    const percentage = Math.min((props.user.number / maxValue) * 100, 100)
  return (
    <li className='user'>
        <span className='avatar'>
            <a href=""></a>

        </span>
        <div className='data'>
            <h4>{props.user.user_name}</h4>
            <div className='meter-all'>
                <div  className='meter'style={{ '--width': `${percentage}%` }}></div>
                <h6 className='number'>{props.user.number}</h6>
              
            </div>

        </div>

    </li>
  )
}
