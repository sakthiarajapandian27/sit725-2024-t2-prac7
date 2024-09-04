const formSubmitted = () => {
    let formData = {};
    formData.firstName = $('#firstName').val();
    formData.lastName = $('#lastName').val();
    formData.emailId = $('#emailId').val();
    formData.phoneNumber = $('#phoneNumber').val();
    formData.query = $('#query').val();
    console.log(formData, 'formData');
    postQuery(formData);
}

function postQuery(queryData){
    $.ajax({
        url:'/api/query',
        type:'POST',
        data:queryData,
        success: (result)=>{
          console.log(result,"result")
            if (result.statusCode === 201) {
                alert('cat post successful');
            }
        }
    });
}
let addCards;
function getAllQuery(){
    $.get('/api/queries', (response)=>{
        addCards = response;
        if (response.statusCode === 200) {
            addCards= response;
        }

      var text = addCards.at(-1);
      firstNameText = `First name: ${text.firstName}`;
      document.getElementById('firstName').innerHTML = firstNameText;
      lastNameText = `Last name: ${text.lastName}`;
      document.getElementById('lastName').innerHTML = lastNameText;
      emailId = `Email Id: ${text.emailId}`;
      document.getElementById('email').innerHTML = emailId;
      phoneNumber = `Phone number: ${text.phoneNumber}`;
      document.getElementById('phone').innerHTML = phoneNumber;
      query = `Query: ${text.query}`;
      document.getElementById('query').innerHTML = query;
    });
}
$(document).ready(function(){
    
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    getAllQuery();
});

$(document).ready(function () {
    const socket = io(); 
    console.log('Socket.IO client initialized');
    socket.on('message', (message) => {
        console.log('Message from server:', message);
        $('#realTimeUpdates').append(`<p>${message}</p>`); 
    });

    socket.on('connect', () => {
        console.log('Connected to the server successfully'); 
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the server'); 
    });
});