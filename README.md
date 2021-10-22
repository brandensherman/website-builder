# Unison Frontend Engineer Mini-Project

## Notes - Thought Process

My intiial thought process was that when a user submits a json schema, I need to convert that string into a json object. I would need to check to see if the the current key is "element" or "children" and create a new element by looping through the object. If the children is an array of elements, then I would need to call the function recursively on each element of that array in order to create it.

However, if I make the assumption that the schema must strictly use "element", "children" and "props" as keys, then I could access those keys directly and assign them more easily rather than looping through the object.

Creating new elements dynamically and appending children, potentially with children of their own, was not something I had ever tried in React. I even considered using left/right pointers to enclose the tags. But after a quick search I found that React.createElement is used precisely for this scenario.

Constraints I noted:

- It should make sure the html element provided is a valid element
- The json itself must be valid (ex: no trailing commas on the last property of an object's scope)
- It should account for the user initially inputting an array of objects

To implement the drag and drop feature (with the code and direction I have gone in) I would probably need to convert the outputted html back into json, looping through the elements and identifying their properties, then running the outputElement function again once that state changes to reflect that change in the order of elements. If I were to plan it out more thoroughly from the start, and if this were a much larger application, then making each element a separate component from the start could be a direction explore.

## Task

For this mini-project, you will create a config driven website builder. We primarily focus on your thought process to architecting and designing frontend applications so please feel free to use any scaffolding tool like [Create React App](https://create-react-app.dev/) or reach for any library that you feel comfortable using. This project is designed to take less than two hours.

## Requirements

_**Please feel free to send us the Github link when you are finished.**_

The application is a simple website builder application that allows users to submit a JSON schema that creates elements on a page. The application should have a form to submit the schema and a UI to display the elements.

### Example JSON Schema and Output

```json
{
  "element": "div",
  "children": [
    { "element": "h1", "children": "Hello World!" },
    { "element": "p", "children": "I love pizza!" },
    {
      "element": "div",
      "children": [
        {
          "element": "a",
          "children": "Order pizza!",
          "props": { "href": "https://unison.com" }
        }
      ]
    }
  ]
}
```

```html
<div>
  <h1>Hello World!</h1>
  <p>I love pizza!</p>
  <div>
    <a href="https://unison.com">Order pizza!</a>
  </div>
</div>
```

**The output should be the actual elements not the text representation.**

### Extra Credit

- Add a feature that allows a user to change the order of child elements via drag and drop. The JSON schema should also update to reflect the order change.
