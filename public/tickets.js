'use strict';

function createTable(firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn, sixthColumn, seventhColumn) {
  let line =
  `<td>${firstColumn}</td>
  <td>${secondColumn}</td>
  <td>${thirdColumn}</td>
  <td>${fourthColumn}</td>
  <td>${fifthColumn}</td>
  <td>${sixthColumn}</td>
  <td>${seventhColumn}</td>`;
  let row = document.createElement('tr');
  document.querySelector('table').appendChild(row);
  row.classList.add('movehere');
  row.classList.add(`${firstColumn}`);
  row.innerHTML = line;
};

function getTable() {
  let httpRequest1 = new XMLHttpRequest();
  httpRequest1.open('GET', 'http://localhost:8080/tickets');
  httpRequest1.send(null);
  httpRequest1.onreadystatechange = function() {
    if (httpRequest1.readyState === 4 && httpRequest1.status === 200) {
      let response = JSON.parse(httpRequest1.response);
      response.tickets.forEach(element => {
        createTable(element.id, element.reporter, element.manufacturer, element.serial_number, element.description, element.reported_at, '<button class="button">Delete</button>');
        let buttons = document.querySelectorAll('.button');
        console.log(buttons);
        [...buttons].forEach((element, index) => {element.addEventListener('click', () => {deleteTicket(index + 1)})});
      });
    };
  };
}

createTable('ID', 'Reporter', 'Manufacturer', 'Serial number', 'Description', 'Date', 'Actions');
getTable();

function deleteTicket(ticketId) {
  let httpRequest2 = new XMLHttpRequest();
  httpRequest2.open('DELETE', `http://localhost:8080/tickets/${ticketId}`);
  httpRequest2.setRequestHeader('content-type', 'application/json');
  httpRequest2.send(null);
  httpRequest2.onreadystatechange = function() {
    if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
      let response = JSON.parse(httpRequest1.response);
      console.log(reponse.status);
    };
  };
};