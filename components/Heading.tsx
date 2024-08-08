// *********************
// Role of the component: Simple H2 heading component
// Name of the component: Heading.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Heading title={title} color={color | null} />
// Input parameters: { title: string }
// Output: h2 heading title with some styles 
// *********************

import React from 'react'

const Heading = ({ title, color} : { title: string, color: string|null }) => {
  return (
    <h2 className={`text-${color ? color :"white"} text-7xl font-extrabold text-center mt-20 max-lg:text-5xl`}>{ title }</h2>
  )
}

export default Heading