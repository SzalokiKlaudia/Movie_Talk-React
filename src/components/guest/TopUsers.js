
import React from 'react'
import TopUser from './TopUser'
import '../../style/TopUsers.css'

export default function TopUsers(props) {
  console.log(props.users)
  return (
    <div className='users-wrapper'>
        <ol className='user-list'>
            {props.users.map((user) => {
                return < TopUser user = {user} key ={user.id} />
            })}

        </ol>

    </div>
  )
}
