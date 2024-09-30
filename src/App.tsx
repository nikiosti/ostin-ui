import {Button} from './ui'

const App = () => {
  return (
    <div style={{display: 'flex', gap: 16, alignItems: 'center', marginTop: 100, marginLeft: 100}}>
      <Button variant="filled">filled</Button>
      <Button variant="light">light</Button>
      <Button variant="outline">outline</Button>
      <Button variant="subtle">subtle</Button>
      <Button variant="default">Сделать заказ</Button>
    </div>
  )
}

export default App
