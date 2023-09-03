import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TagView from './components/TagView';

const tagsTree = [{
  id: uuidv4(),
  name: 'root',
  children:
    [
      {
        id: uuidv4(),
        name: 'child1',
        children:
          [
            { id: uuidv4(), name: 'child1-child1', data: "c1-c1 Hello" },
            { id: uuidv4(), name: 'child1-child2', data: "c1-c2 JS" }
          ]
      },
      {
        id: uuidv4(),
        name: 'child2',
        data: "c2 World"
      }
    ]
}]

function App() {
  const [tagsTreeArr, setTagsTreeArr] = useState(tagsTree)
  const [content, setContent]= useState('')

  function removeIds(obj) {
    if (Array.isArray(obj)) {
      return obj.map(item => removeIds(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const { id, ...rest } = obj;
      return Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, removeIds(value)])
      );
    }
    return obj;
  }


  const exportHandler=()=>{
    const displayObj = removeIds(tagsTreeArr[0]);
    setContent(JSON.stringify(displayObj, null, 2))
  }

  const tagDataChangeHandler = (updatedTag) => {
    const updateObjectById=(updatedTag, originalObj)=>{
      if (originalObj.id === updatedTag.id) {
        console.log("updatedTag from App.jsx: ", updatedTag)
        if ('data' in updatedTag) {
          return { ...originalObj, ...updatedTag };
        } else {
          const { data, ...rest } = originalObj;
          return { ...rest, ...updatedTag };
        }
      }
    
      if (originalObj.children) {
        const updatedChildren = originalObj.children.map(child =>
          updateObjectById(updatedTag, child)
        );
        return { ...originalObj, children: updatedChildren };
      }
      return originalObj;
    }
    
    // Create a deep copy of the current tagsTreeArr, to ensure we're not modifying the original object directly. 
    const updatedTagsTreeArr = JSON.parse(JSON.stringify(tagsTreeArr));

    const updatedTreeObj= updateObjectById(updatedTag, updatedTagsTreeArr[0]);
    setTagsTreeArr([updatedTreeObj]);
  };

  return (
    <div className="App">
      <TagView items={tagsTreeArr} onTagDataChange={tagDataChangeHandler}/>
      <button className="btn btn-primary btn-sm" onClick={exportHandler}>Export</button>
      <div>{content}</div>
    </div>
  );
}

export default App;
