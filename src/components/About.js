import React, { useContext } from 'react'
import notecontext from '../context/notes/noteContext'
const About = () => {
  const a = useContext(notecontext)
  return (
    <div>
      About {a.name}
    </div>
  )
}

export default About
