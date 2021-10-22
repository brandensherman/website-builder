import React, { useState } from 'react'

export default function Home() {
  const [inputData, setInputData] = useState('')
  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState(false)
  let keyCounter = 1

  function handleSubmit(e) {
    e.preventDefault()
    setJsonData(JSON.parse(inputData))
  }

  function createChildrenElements(children) {
    let array = []
    for (let element of children) {
      array.push(outputElement(element))
    }
    return array
  }

  function outputElement(inputJSON) {
    let type = ''
    let props = null
    let children = null

    // Account for initially inputting an array of elements
    if (Array.isArray(inputJSON)) {
      type = 'div'
      children = createChildrenElements(inputJSON)
    } else {
      // If initial input is an object
      type = inputJSON.element

      // If children is an array, loop through and recursively call on outputElement for each element
      if (Array.isArray(inputJSON.children)) {
        children = createChildrenElements(inputJSON.children)
      } else {
        children = inputJSON.children
      }
    }

    // If there are any props, add them, and a key for each element
    if (inputJSON.props) {
      inputJSON.props.key = keyCounter
      keyCounter++
      props = inputJSON.props
    } else {
      props = { key: keyCounter }
      keyCounter++
    }

    // Create a new element using the data collected from the inputted json
    const htmlElement = React.createElement(type, props, children)

    return htmlElement
  }

  return (
    <div className='container'>
      <div>
        <h1 className='title'>Input JSON</h1>
        <form className='form-container' onSubmit={handleSubmit}>
          <textarea
            cols='60'
            rows='20'
            onChange={(e) => setInputData(e.target.value)}
          ></textarea>
          <button className='btn' type='submit'>
            Submit
          </button>
        </form>
      </div>

      <div>
        <h1 className='title'>Output HTML</h1>
        {jsonData ? (
          outputElement(jsonData)
        ) : (
          <div>
            <p>Please submit valid JSON with valid HTML elements</p>
          </div>
        )}
      </div>
    </div>
  )
}
