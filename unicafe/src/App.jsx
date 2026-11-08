import Buttons from './components/Buttons'
import Statistics from './components/Statistics'
import { useFeedbackStore } from './store'

const App = () => {
  const feedback = useFeedbackStore()

  return (
    <>
      <h1>Unicafe</h1>
      <Buttons feedback={feedback.giveFeedback} />
      <Statistics feedback={feedback} />
    </>
  )
}

export default App
