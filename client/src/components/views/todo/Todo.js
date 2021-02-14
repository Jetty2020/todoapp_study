import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { loadBoard } from "../../../_actions/board_actions";
import { useAsync } from 'react-async';
import axios from 'axios';
import { BOARD_SERVER } from '../../Config.js';
import { useDispatch } from "react-redux";
import { 
  uploadBoard,
  deleteBoard 
} from "../../../_actions/board_actions";

const getBoards = async () => {
  const response = await axios.get(`${BOARD_SERVER}/load`,);
  
  return response.data.board;
};

const createBulkTodos = () => {
  const array = [];
  const board = loadBoard();
  board.then(res => 
    {
      const boards = res.payload.board;
      boards.map(board =>
        array.unshift({
          id: board._id,
          title: board.title,
          checked: false,
        })
      )
    }
  );
  return array;
};

function Todo() {
  const { data, error, isLoading } = useAsync({
    promiseFn: getBoards,
  });
  const [todos, setTodos] = useState(createBulkTodos);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);
  const dispatch = useDispatch();
  const onInsert = useCallback(
    title => {
      const todo = {
        id: nextId.current,
        title,
        checked: false,
      };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
    let todos = {
			title,
      checked: false,
		};
		dispatch(uploadBoard(todos))
			.then(response => {
				if (response.payload.success) {
					//  props.history.push('/todo')
				} else {
					 alert('Error˝')
				};
		});
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
    let data = {
      id
		};
    dispatch(deleteBoard(data))
			.then(response => {
				if (response.payload.success) {
					//  props.history.push('/todo')
				} else {
					 alert('Error˝')
				};
		});
    console.log(id);
  }, []);

  const onToggle = useCallback(id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);
  if (isLoading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  return (
    <>
      <div className="app">
        <TodoTemplate>
          <TodoInsert onInsert={onInsert} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
      </div>
    </>
  );
};

export default Todo;