const apiURL = 'http://localhost:9090'

function fetchAPI(method, route, body, auth, headers = {}){
  const ops = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + window.atob(localStorage.getItem('password')),
      ...headers }
  }
  
  if (body) ops.body = JSON.stringify(body)
  return fetch(`${apiURL}/${route}`,ops).then(r=>r.json()).catch(()=>{})
}

export default fetchAPI
