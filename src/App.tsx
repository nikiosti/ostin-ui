import {Image, Resizable} from './ui'

const App = () => {
  return (
    <div>
     
      <Resizable>
        <Image url="https://upload.wikimedia.org/wikipedia/commons/9/99/Pavel_Durov_sitting_portrait.jpg" />
      </Resizable>
      <Resizable>
        <Image url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Beaver.jpg/240px-American_Beaver.jpg" />
      </Resizable>
     
    </div>
  )
}

export default App
