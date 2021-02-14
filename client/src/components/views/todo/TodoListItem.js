import React, { useState, useCallback } from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdEdit,
  MdCheck,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';


const TodoListItem = ({ todo, onRemove, onToggle, onEdit, onEditToggle,  style }) => {
  const { id, title, checked, edit } = todo;
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }
  
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      var va = value ? value : title;
      onEdit(id, va);
      onEditToggle(id);
    },
    [onEdit, value],
  );

  return (
    <div className={cn('TodoListItem-virtualized', { edit })} style={style}>
      {edit 
      ? 
        <form 
        className="TodoEdit" 
        onSubmit={onSubmit}
        >
          <input
            placeholder={title}
            value={value ? value : title}
            onChange={onChange}
          />
          <button 
            type="submit"
            onClick={() => onEdit(id)}
          >
            <MdCheck />
          </button>
        </form>
      : 
        <div className="TodoListItem">
          <div
            className={cn('checkbox', { checked })}
            onClick={() => onToggle(id)}
          >
            {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            <div className="text">{title}</div>
          </div>
          <div className="editIcon" onClick={() => onEditToggle(id)}>
            <MdEdit />
          </div>
          <div className="remove" onClick={() => onRemove(id)}>
            <MdRemoveCircleOutline />
          </div>
        </div>
      }
    </div>
  );
};

export default React.memo(TodoListItem);
