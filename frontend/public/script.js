const pageLoad = () => {

    console.log("The Client is running");

    let theForm = document.getElementById("uploadForm");
    let userName = document.getElementById("username");
    let userFile = document.getElementById("userfile");   

    async function noSubmit(event) {
        event.preventDefault();
        console.log("We blocked the file upload process!")


        let formData = new FormData();

        formData.append("username", userName.value);
        formData.append("userfile", userFile.files[0]);
        
        console.log(FormData)
        for (let value of formData.values()) {
        console.log(value);
        }

        const result = await fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
        console.log('Success:', result);
        })
        .catch(error => {
        console.error('Error:', error);
        });

        console.log(`result `, result)

    }
    theForm.addEventListener('submit', noSubmit); 











 /*     let submitInput = theForm.querySelector("input[type=submit]");
        submitInput.addEventListener("click", noSubmit);

        fetch('http://localhost:8000/upload', {
        method: 'PUT',
        body: formData
        })
        .then(response => response.json())
        .then(result => {
        console.log('Success:', result);
        })
        .catch(error => {
        console.error('Error:', error);
        }); */
  





}
window.addEventListener("load", pageLoad)