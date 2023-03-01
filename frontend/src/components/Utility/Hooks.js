import { useSelector } from "react-redux";

function useRemoteRequest() {
  const apiURL = useSelector((state) => state.misc['apiURL']);

  function send(method, data) {
    fetch( 'http://'+apiURL+method, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    }).catch(error => {
        console.log('Post error:', error)
    })
  }

  return [send];
}

// function useKWebSocket() {
//   // implement customized hook for websocket
// }

export default useRemoteRequest;
