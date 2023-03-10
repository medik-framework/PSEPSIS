const PlainDialog = ({ text }) => {
  return (
    <>{
      text.map((msg, idx) => <div key={idx}>{msg}</div>)
    }</>
  )
}

export default PlainDialog;
