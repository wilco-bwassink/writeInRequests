const contactForm = document.querySelector('.requestForm');
let department = document.getElementById('department')
let address = document.getElementById('address')
let description = document.getElementById('description')
let contact = document.getElementById('contactPref')
let name = document.getElementById('name')
let phone = document.getElementById('phone')
let email = document.getElementById('email')

contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  
  let formData = {
    department: department.value,
    address: address.value,
    description: description.value,
    contact: contact.value,
    name: name.value,
    phone: phone.value,
    email: email.value
  }

  let xhr = new XMLHttpRequest();
  xhr.open('POST', '/');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onload = function(){
    console.log(xhr.responseText);
    if(xhr.responseText == 'success'){
      alert('Email sent');
      department.value = '';
      address.value = '';
      description.value = '';
      contact.value = '';
      name.value = '';
      phone.value = '';
      email.value = '';
    }else{
      alert('Something Went Wrong!')
    }
  }

  xhr.send(JSON.stringify(formData));

})