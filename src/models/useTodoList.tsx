/**
 * todoList 组件 -- 数据管理
 */
import { useEffect, useState, useRef } from 'react'

export enum TodoStatus {
  /** 待做 */ 
  'todo' = 'todo',
  /** 正在做 */
  'doing' = 'doing',
  /** 已完成 */
  'done' = 'done',
}

interface TodoListProps {
  content: string;
  id: string;
  sort: number;
  status: `${TodoStatus}`;
}

interface OTodoList {
  /** todo List */
  list: TodoListProps[];
  /** 查询list */
  queryTodoList: () => any;
  /** 增加 todo 项 */
  addTodoList: () => any;
  /** 删除 todo-item 项 */
  delTodoItem: (id: string) => any;
  /** 修改当前 todo 项状态 */
  changeTodoItemStatus: (id: string, newStatus: `${TodoStatus}`) => any;
}

const listKey = 'TODO_LIST'

export default function useTodoList(): OTodoList {
  const [list, setList] = useState<TodoListProps[]>([])
  
  const isFirstRef = useRef(true)

  const createNewTodoItem = (): TodoListProps => {
    return { 
      content: '',
      id: Math.random().toString(),
      sort: list.length + 1,
      status: TodoStatus.todo
    }
  }

  const setDataToStorage = (list: TodoListProps[]) => {
    localStorage.setItem(listKey, JSON.stringify(list))
  }

  const getStorageData = () => {
    const dataJson = localStorage.getItem(listKey)
    return JSON.parse(dataJson)
  }

  const queryTodoList = () => {
    const res = getStorageData()
    setList(res)
  }

  const addTodoList = () => {
    list.push(createNewTodoItem())

    setList([...list])
  }

  const delTodoItem = (id: string) => {
    const newArr = list.filter(item => item.id !== id)

    setList(newArr)
  }

  const changeTodoItemStatus = (id: string, newStatus: `${TodoStatus}`) => {
    const newArr = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
        }
      }
      return item
    })

    setList(newArr)
  }
  
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current =  false
    } else {
      setDataToStorage(list)
    }
  }, [list])

  return { list, queryTodoList, addTodoList, delTodoItem, changeTodoItemStatus }
}