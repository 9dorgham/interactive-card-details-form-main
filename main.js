  // selectors
const container = document.querySelector('.container'),
completeBox = document.querySelector('.done'),
Name = document.querySelector('#name'),
cn = document.querySelector('#cn'),
month = document.querySelector('#month'),
year = document.querySelector('#year'),
cvc = document.querySelector("#cvc"),
btn = document.querySelector('[type="submit"]'),
cardNumber = document.querySelector('.cardn'),
client = document.querySelector('.u'),
expire = document.querySelector(".expir"),
mes = "can't be blank",
currentYear = +String(new Date().getFullYear()).substring(2);



completeBox.remove();

window.onload = () => {
  Name.focus();
}



function validName() {
  let regex = /([A-Z][a-z]+){1,10}\s([A-Z][a-z]+){1,10}/g;
  try{
    if (Name.value == "") {
      client.innerHTML = "";
      throw mes;
    }else if (Name.value.match(regex)) {
      removeE(Name);
      return true;
    }else if (Name.value[0] === Name.value[0].toLowerCase()) {
      throw "Your First Name and Your Last Must start With Uppercase letter";
    }else {
      throw "Write First name and last name";
    }
  }catch (err) {
    erroMes(Name, err);
  }

  return false;
}


function validNumber() {
  let regex = /([0-9]{4}\s){3}[0-9]{4}/g;
  try {
    if (cn.value == "") {
      cardNumber.innerHTML = "";
      throw mes;
    }else if (cn.value.length == 19) {
      if (cn.value.match(regex)) {
        removeE(cn);
        return true;
      }else {
        throw "Wrong format, numbers only";
      }
    }else {
      throw "Invalid Number";
    }
  }catch (err) {
    erroMes(cn, err);
  }

  return false;
}


function validDate() {
  try {
    if(month.value == '' || year.value == '') {
      throw mes;
    }else if (month.value.length ==2 && year.value.length ==2) {
      if (+year.value < currentYear) {
        throw "Expired card";
      }else {
        removeE(year, [month, year]);
        return true;
      }
    }else {
      throw "Invalid Number";
    }
  }catch (err) {
    erroMes(year, err, [month, year]);
  }

  return false;
}


function validcvc() {
  try {
    if (cvc.value == "") throw mes;
    else if (cvc.value.length < 3 || cvc.value.length > 3) throw "Invalid number";
    else {
      removeE(cvc);
      return true;
    }
  }catch (err) {
    erroMes(cvc, err);
  }

  return false;
}





// Error Message
function erroMes(ele, txt, arr) {
  if ([...ele.parentElement.children].some(check)) {
    for (let i of ele.parentElement.children) {
      if (i.classList.contains('error')) {
        i.textContent = txt;
      }
    }
  }else {
    let mes = document.createElement('p');
    mes.className = "error";
    mes.textContent = txt;
    ele.after(mes);
  }


  function check(ele) {
    return ele.classList.contains('error');
  }

  // add style
  if (arr) {
    for (let i of arr) {
      i.classList.add('wrong');
    }
  }else {
    ele.classList.add('wrong');
  }
}

// remove Error Message
function removeE(ele, arr) {
  for (let x of ele.parentElement.children) {
    if (x.classList.contains("error")) {
      x.remove();
    }
  }
  // remove style
  if (arr) {
    for (let i of arr) {
      i.classList.remove('wrong');
    }
  }else {
    ele.classList.remove('wrong');
  }
}



// Update data in the Graphic card
function update() {
  cardNumber.innerHTML = cn.value === ""? cardNumber.innerHTML: cn.value;
  client.innerHTML = Name.value === "" ? client.innerHTML: Name.value;
  expire.innerHTML = month.value === "" ? expire.innerHTML: `${month.value} / ${year.value}`;
}


// Complete message
function done() {
  document.forms[0].remove();
  container.append(completeBox);
}


















// Events
btn.addEventListener('click', function (e) {
  e.preventDefault();
  validName();
  validNumber();
  validDate();
  validcvc();

  if (validName() && validNumber && validDate() && validcvc()) {
    done();
  }

});
Name.addEventListener('input', () => {update(); validName()});
cn.addEventListener('input', () => {update(); validNumber()});
month.addEventListener('input', () => {update(); validDate()});
year.addEventListener('input', () => {update(); validDate()});
cvc.addEventListener('input', () => {validcvc()});