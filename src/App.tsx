import {SparkleIcon, WalletIcon} from 'lucide-react'
import {Button, Group, List} from './ui'

const App = () => {
  return (
    <Group gap={8}>
      <Button leftSection={<WalletIcon color="var(--ui-color-white)" />} variant="filled">
        Купить {222 + 444}₽
      </Button>

      <Button variant="default" leftSection={<SparkleIcon color="var(--ui-color-blue-5)" />}>
        Cделать заказ
      </Button>

      <Button radius={100} variant="default" disabled>
        Скоро
      </Button>

      <List>
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>Run tests to make sure your changes do not break the build</List.Item>
        <List.Item>Submit a pull request once you are done</List.Item>
      </List>
    </Group>
  )
}

export default App
