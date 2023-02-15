var httpRequest = new XMLHttpRequest();

httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
    } else {
      console.log(httpRequest.statusText);
    }
  }
}

httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}

httpRequest.open('GET', 'https://fewd-todolist-api.onrender.com/tasks?api_key=112');
httpRequest.send();

var httpRequest = new XMLHttpRequest();
httpRequest.onload = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      console.log(httpRequest.responseText);
    } else {
      console.log(httpRequest.statusText);
    }
  }
}
httpRequest.onerror = function() {
  console.log(httpRequest.statusText);
}
httpRequest.open('GET', 'https://fewd-todolist-api.onrender.com/tasks/2?api_key=112');
httpRequest.send();