import React, { useState, } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';
import { useDispatch } from "react-redux";
import { uploadBoard } from "../../../_actions/board_actions";

// const TodoInsert = ({ onInsert }) => {
function TodoInsert(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }
	const onSubmit = (event) => {
		event.preventDefault();
		let body = {
			 title: value,
		};
		dispatch(uploadBoard(body))
			.then(response => {
				if (response.payload.success) {
					//  props.history.push('/')
				} else {
					 alert('Error˝')
				};
		});
		setValue(''); // value 값 초기화
	};

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
