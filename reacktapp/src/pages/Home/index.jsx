import React from 'react'
import './styles.css'

import { Card } from '../../components/Card'
import { useState, useEffect } from 'react'

export function Home() {
  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(stadoAnteior => [...stadoAnteior, newStudent])
  }

  useEffect(() => {
    // tudo que tiver aqui e o que eu quero que execute
    fetch('https://api.github.com/users/maximuspho')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
    .catch()
  }, [])

  return (
    <div className='container'>

      <header>
      <h1>Lista de Presença!</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt='Foto de Perfil'></img>
      </div>
      </header>

      <input
        type="text"
        placeholder="Digite o seu nome."
        onChange={e => setStudentName(e.target.value)} />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />)

      }

    </div>
  )
}