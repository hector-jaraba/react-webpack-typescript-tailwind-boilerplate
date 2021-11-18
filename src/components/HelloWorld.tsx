import React from 'react'

interface Props {
  name: string
}

const HelloWorld = ({name}: Props) => {
  return (
    <div className="wrapper text-center text-red-400">
      <h1>Happy development! ;) {name}</h1>
    </div>
  )
}

export default HelloWorld
