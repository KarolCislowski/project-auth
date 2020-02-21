import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const TopSecret = () => {
  const token = window.localStorage.accessToken
  const id = window.localStorage.userId
  const [secret, setSecret] = useState('')
  const url = `http://localhost:8080/users/${id}`

  const history = useHistory()



  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          throw "not authorized"
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setSecret(data.secret)
      }, [])
      .catch((err) => {
        history.push("/login")
      })
  })
  return (
    <div>
      <h1>{secret}</h1>
    </div>
  )
}