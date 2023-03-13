const PlainDialog = ({ text }) => {
  return (
    <div display={'flex'}>{
      text.map((msg, idx) => <div width={'100%'} key={idx}>{msg}</div>)
    }</div>
  )
}

export default PlainDialog;
