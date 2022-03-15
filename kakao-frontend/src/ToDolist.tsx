import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
type ToDoType = {
  id: number;
  todo: string;
};

const ToDoList = (): JSX.Element /*리턴타입. 컴포넌트라는 뜻*/ => {
  const [todoList, setTodoList] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>(""); //저장버튼 누르는 타이밍에 갱신

  const updateTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };
  const registerTodo = async () => {
    await axios.post("http://localhost:5000/todos", { todo: todoText });
    setTodoText("");
    await getToDoList();
  };

  const deleteTodo = async (id: number) => {
    await axios.delete("http://localhost:5000/todos/${id}");
    await getToDoList();
  };

  const getToDoList = async () => {
    const { data } = await axios.get<ToDoType[]>("http://localhost:5000/todos");
    setTodoList(data);
  };
  useEffect(() => {
    getToDoList();
  }, []);

  return (
    <section>
      <section>
        <input type="text" value={todoText} onChange={updateTodoText} />
        <button onClick={registerTodo}>등록</button>
      </section>
      <section>
        {todoList.map((todo) => {
          return (
            //key는 중복되면 안됨
            <section key={todo.id}>
              {todo.todo}
              <button onClick={() => deleteTodo(todo.id)}>X</button>
            </section>
          ); //클릭할때만 실행되게 하려고 함수로 한 번 감싸줌
        })}
      </section>
    </section>
  );
};

export default ToDoList;
