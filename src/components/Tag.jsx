import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import EditableDiv from './EditableDiv'
import TagView from "./TagView";

const Tag = ({ currTag, onTagDataChange }) => {
    const [expanded, setExpanded] = useState(false)
    const [currentTag, setCurrentTag]= useState(currTag)
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    }
  
    const addChildHandler = () => {
      console.log("AddChildHandler")
      setCurrentTag(currtag => {
          const { data, ...rest } = currtag; // Extract data property and rest of the properties, if data not present, then its undefined
          return {
            ...rest,
            children: [...(currtag.children || []), { id: uuidv4(), name: 'New Child', data: 'Data' }]
          };
        });
      setExpanded(true); // Expand the parent to show the newly added child
      onTagDataChange(currentTag)
    }
  
    const handleDataChange = (event) => {
      console.log("HandleDataChange")
      setCurrentTag(currtag=>{
        const {data, ...rest}= currtag;
        return {
          data: event.target.value,
          ...rest
        }
      }); // Update edited data
      onTagDataChange(currentTag); // Lifted state change
    }
  
    const changeNameHandler=(updatedName)=>{
      console.log("ChangeNameHandler")
      setCurrentTag(currtag=>{
        const {name, ...rest}= currtag;
        return {
          name: updatedName,
          ...rest
        }
      });
      onTagDataChange(currentTag)
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