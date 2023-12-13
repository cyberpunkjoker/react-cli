import React, { useEffect, useContext } from "react";
import useTodoList, { TodoStatus } from "@/models/useTodoList";
import './index.less'

const Demo: React.FC = () => {
  const { list, addTodoList, queryTodoList, delTodoItem, changeTodoItemStatus } = useTodoList()

  useEffect(() => { queryTodoList() }, [])

  return (
    <div className="todoList-wapper">
      <button onClick={addTodoList}>增加</button>
      {
        list.map((item) => {
          return (
            <div className="todoList-item">
              <div>{item.content}</div>
              <div onClick={() => delTodoItem(item.id)}>❌</div>
              <div onClick={() => changeTodoItemStatus(item.id, TodoStatus.done)}>✅</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Demo