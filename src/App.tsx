import {Image, Resizable, TextResizable} from './ui'

const App = () => {
  return (
    <div>
      <TextResizable>
        <h1 style={{userSelect: 'none', wordBreak: 'break-all'}}>Pavel Durov</h1>
      </TextResizable>
      <TextResizable>
        <h2 style={{userSelect: 'none', wordBreak: 'break-all'}}>Bobr</h2>
      </TextResizable>
      <Resizable>
        <Image url="https://upload.wikimedia.org/wikipedia/commons/9/99/Pavel_Durov_sitting_portrait.jpg" />
      </Resizable>
      <Resizable>
        <Image url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Beaver.jpg/240px-American_Beaver.jpg" />
      </Resizable>
      <Resizable>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 6v12" />
          <path d="M17.196 9 6.804 15" />
          <path d="m6.804 9 10.392 6" />
        </svg>
      </Resizable>
    </div>
  )
}

export default App
