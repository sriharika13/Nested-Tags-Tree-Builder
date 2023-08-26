import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import EditableDiv from './EditableDiv'
import TagView from "./TagView";

const Tag = ({ currTag, onTagDataChange }) => {
    const [expanded, setExpanded] = useState(false)
    const [currentTag, setCurrentTag]= useState(currTag)

    const updateAndNotifyChange = (updatedTag) => {
      setCurrentTag(updatedTag);
      onTagDataChange(updatedTag);
    }
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    }
  
    const addChildHandler = () => {
      const {data, ...rest}= currentTag;
      const updatedTag = {
        ...rest,
        children: [
          ...(currentTag.children || []), 
          { id: uuidv4(), name: 'New Child', data: 'Data' }
        ]
      };
      setExpanded(true); // Expand the parent to show the newly added child
      updateAndNotifyChange(updatedTag);
    }
  
    const handleDataChange = (event) => {
      const updatedTag = {
        ...currentTag,
        data: event.target.value
      };
      updateAndNotifyChange(updatedTag);
    }
  
    const changeNameHandler= (updatedName)=>{
      const updatedTag = {
        ...currentTag,
        name: updatedName
      };
      updateAndNotifyChange(updatedTag);
    }

    return (
      <li className='tag'>
        <div className='tag-box'>
          <div className={`arrow ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}></div>
          <EditableDiv name={currentTag.name} onChangeName={changeNameHandler}/>
          <button className="btn btn-primary btn-sm" onClick={addChildHandler}>Add Child</button>
        </div>
        {expanded && (
            <div className='expanded-box'>
              {currentTag.data && (
                <div className='data-box'>
                  <p>Data:</p>
                  <input type="text" value={currentTag.data} onChange={handleDataChange}/>
                </div>
              )}
              {currentTag.children && <TagView items={currentTag.children} onTagDataChange={onTagDataChange} />}
            </div>
          )}
      </li>
    )
  }

  export default Tag;