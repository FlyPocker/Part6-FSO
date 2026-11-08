const Buttons = ({ feedback }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => feedback('good')}>good</button>
      <button onClick={() => feedback('neutral')}>neutral</button>
      <button onClick={() => feedback('bad')}>bad</button>
    </div>
  )
}

export default Buttons
