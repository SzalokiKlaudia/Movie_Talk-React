import React, { useState } from 'react'
import useAuthContext from '../../contexts/AuthContext'
import '../../style/AdminUsers.css'


export default function ActiveUser(props) {
  //console.log(props.user.created_at)
  
    const text = props.user.created_at
    const data = new Date(text)
    const formattedText = data.toISOString().split("T")[0].replace(/-/g, ". ")

// {/*hozzárendeltük az eseményt a checkboxhoz */}
  return (
    <>
    <tr>
      <td>
        <input
              type="checkbox"
              onChange={(e) => props.handleCheckBoxChange(e, props.user.id)} 
        />
      </td>
      <td>{props.user.id}</td>
      <td>{props.user.user_name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.name}</td>
      <td>{props.user.gender}</td>
      <td>{props.user.birth_year}</td>
      <td>{formattedText}</td>
  
    </tr>
    </>

  )
}
