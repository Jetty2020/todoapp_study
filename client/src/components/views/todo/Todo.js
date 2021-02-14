import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { loadBoard } from "../../../_actions/board_actions";
import { useAsync } from 'react-async';
import axios from 'axios';
import { BOARD_SERVER } from '../../Config.js';

const getUser = async () => {
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
        array.push({
          id: board.id,
          text: board.title,
          checked: false,
        })
      )
    }
  );
  return array;
};

function Todo() {
  const { data, error, isLoading } = useAsync({
    promiseFn: getUser,
  });
  const [todos, setTodos] = useState(createBulkTodos);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
    setTodos(todos => todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
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
          <TodoInsert />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
      </div>
    </>
  );
};

export default Todo;