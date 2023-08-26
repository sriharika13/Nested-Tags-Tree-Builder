import Tag from './Tag'
import { useEffect, useState } from 'react';

const TagView = ({ items, onTagDataChange }) => { //root component

    return (
      <ul>
        {items.map(item =>
          <Tag
            key={item.id}
            currTag={item}
            onTagDataChange={onTagDataChange}
          />
        )}
      </ul>
    );
  };


  export default TagView;