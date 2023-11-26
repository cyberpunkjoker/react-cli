import React, { memo, useCallback, useMemo, useReducer, useState } from "react";

const firstUser = {
  name: 'yahaha',
  age: '100',
  city: 'cd',
}

const cats = ['tom', 'ooup', 'taaaaka']

const Cat = ({ name, meow }) => {
  console.log(`rendering ${name}`);
  return <p onClick={() => meow(name)}>{name}</p>
}

// 使用 memo 缓存  ---- 这里要注意一下
  // 1. 要在 HookTest 外面写 memo 组件，不然会导致memo组件重新渲染，从而无效
  // 2. 像 上面的 meow function 一样传入会导致memo 失效，所以可以使用断言（ (pre, next) =>  pre.name === next.name ）。自己控制组件的渲染
  // 3. 如果这里不想使用 断言 可以使用 useCallback 来控制 meow function （ const meow = useCallback(name => console.log(`${name} has meowed`), []) ）
const PureCat = memo(
  Cat,
  (pre, next) =>  pre.name === next.name
)

const HookTest: React.FC = () => {
  const [user, setUser] = useReducer(
    (user, newInfos) => ({ ...user, ...newInfos }),
    firstUser
  )

  const [catsList, setCats] = useState(cats)

  // 使用 useMemo 缓存
  const renderUser = useMemo(() => {
    console.log('render UserInfo');
    return (
      <div>
         useReducer:
        <div>{user.name}</div>
        <div>{user.age}</div>
        <div>{user.city}</div>

        <button onClick={() => setUser({ name: 'link' })}>change name</button>
        <br />
      </div>
    )
  }, [user])

  const meow = useCallback(name => console.log(`${name} has meowed`), [])

  return (
    <div>
      {renderUser}
      memo:
      { catsList.map(name => (
        <PureCat key={name} name={name} meow={meow}></PureCat>
      )) }

      <button onClick={() => setCats((c) => [...c, Math.random().toString()])}>加一只🐱</button>

    </div>
    
  )
}

export default HookTest