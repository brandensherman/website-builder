import React, { useState } from 'react'

export default function Home() {
  const [inputData, setInputData] = useState('')
  const [jsonData, setJsonData] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setJsonData(JSON.parse(inputData))
  }

  function traverseObject(inputObject) {
    let type = ''
    let props = null
    let children = null
    let array = []

    type = inputObject.element

    // Traverse array if there is one and recursively call on traverseObject for each element
    if (Array.isArray(inputObject.children)) {
      for (let item of inputObject.children) {
        array.push(traverseObject(item))
      }
      children = array
    } else {
      children = inputObject.children
    }

    if (inputObject.props) {
      props = inputObject.props
    }

    // Create a new element using the data collected from the inputted json
    let htmlElement = React.createElement(type, props, children)

    return htmlElement
  }

  return (
    <div>
      <div>
        <h1>Website Builder</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            cols='60'
            rows='20'
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
      {jsonData ? traverseObject(jsonData) : <div></div>}
    </div>
  )
}
