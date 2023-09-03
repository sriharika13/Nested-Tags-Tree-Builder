import { useState } from "react";

const EditableDiv=({name, onChangeName})=>{
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(name);
  
    const handleDivClick = () => {
      setIsEditing(true);
    };
  
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
  
    const handleInputBlur = () => {
      setIsEditing(false);
      console.log('Edited text:', text);
      onChangeName(text)
    };
  
    const handleInputKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleInputBlur();
      }
    };
  
    return (
      <div>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <div className='tag-content' onClick={handleDivClick}>{text}</div>
        )}
      </div>
    );
  }

  export default EditableDiv