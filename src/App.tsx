import {SparkleIcon, WalletIcon} from 'lucide-react'
import {Button, Group} from './ui'

const App = () => {
  return (
    <Group gap={8} wrap="wrap">
      <Button leftSection={<WalletIcon color="var(--ui-color-white)" />} variant="filled">
        Купить {222 + 444}₽
      </Button>

      <Button variant="default" leftSection={<SparkleIcon color="var(--ui-color-blue-5)" />}>
        Cделать заказ
      </Button>

      <Button variant="default" disabled>
        Скоро
      </Button>
    </Group>
  )
}

export default App
