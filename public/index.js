'use strict';

function getReporters() {
  let httpRequest1 = new XMLHttpRequest();
  httpRequest1.open('GET', 'http://localhost:8080/users');
  httpRequest1.send(null);
  httpRequest1.onreadystatechange = function() {
  if (httpRequest1.readyState === 4 && httpRequest1.status === 200) {
    let response = JSON.parse(httpRequest1.response);
    response.users.forEach(element => {
      appendReporterToSelect(element.id);
    });
  };
  };
};

function appendReporterToSelect(reporter) {
  let item = document.createElement('option');
  document.querySelector(`select.reporter`).appendChild(item);
  item.innerText = reporter;
};

function sendReport() {

  const manufacturer = document.querySelector('#manufacturer');
  const serialNumber = document.querySelector('#serial_number');
  const description = document.querySelector('#description');

  const payload = {
    manufacturer: manufacturer.value,
    priority: serialNumber.value,
    description: description.value,
  };

  let httpRequest2 = new XMLHttpRequest();
  httpRequest2.open('POST', 'http://localhost:8080/tickets');
  httpRequest2.setRequestHeader('content-type', 'application/json');
  httpRequest2.send(JSON.stringify(payload));
  httpRequest2.onreadystatechange = function() {
  if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
    let response = JSON.parse(httpRequest1.response);
    console.log(response);
  };
  };
};

let button = document.querySelector('button');
button.addEventListener('click', () => {
  sendReport();
});

getReporters();