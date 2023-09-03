import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditableDiv from './EditableDiv';

const TagView = ({ items, onTagDataChange }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const addChildHandler = (item) => {
    const {data, ...rest}= item
    const updatedItem = {
      ...rest,
      children: [
        ...(item.children || []),
        { id: uuidv4(), name: 'New Child', data: 'Data' },
      ],
    };
    setExpandedItems([...expandedItems, item.id]);
    onTagDataChange(updatedItem);
  };

  const handleDataChange = (item, newData) => {
    const updatedItem = { ...item, data: newData };
    onTagDataChange(updatedItem);
  };

  const changeNameHandler = (item, newName)=>{
    const updatedItem = {
      ...item,
      name: newName
    };
    onTagDataChange(updatedItem);
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="tag">
          <div className="tag-box">
            <div
              className={`arrow ${expandedItems.includes(item.id) ? 'expanded' : ''}`}
              onClick={() => toggleExpand(item.id)}
            ></div>
            <EditableDiv name={item.name} onChangeName={(newName) => changeNameHandler(item, newName)} />
            <button className="btn btn-primary btn-sm" onClick={() => addChildHandler(item)}>
              Add Child
            </button>
          </div>
          {expandedItems.includes(item.id) && (
            <div className="expanded-box">
              {'data' in item  && (
                <div className="data-box">
                  <p>Data:</p>
                  <input
                    type="text"
                    value={item.data}
                    onChange={(e) => handleDataChange(item, e.target.value)}
                  />
                </div>
              )}
              {item.children && <TagView items={item.children} onTagDataChange={onTagDataChange} />}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TagView;
