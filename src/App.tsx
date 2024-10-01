import {SparkleIcon, WalletIcon} from 'lucide-react'
import {Button, Group} from './ui'

const App = () => {
  return (
    <Group gap={8} wrap="wrap" justify="space-between">
      <Button leftSection={<WalletIcon />} variant="filled">
        Купить 129 990₽
      </Button>
      <Button variant="light">Заказать дизайн</Button>
      <Button variant="outline">Заказать...</Button>
      <Button variant="subtle">subtle</Button>
      <Button variant="default" leftSection={<SparkleIcon color="var(--ui-color-blue-5)" size={25} />}>
        Cделать заказ
      </Button>
    </Group>
  )
}

export default App
