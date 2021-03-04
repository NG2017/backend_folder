import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [effectOrNot, setEffectOrNot] = useState(false);

  useEffect(() => {
      if (effectOrNot) {
      console.log("ez lefut");
     
        const fetchFunc = async () => {

          let formData = new FormData();

          let theFrom = document.getElementById("theForm");
          let inputValues = Array.from(theFrom.querySelectorAll("input"));
          let userFile = document.getElementById("userfile");

          
          let userObj = {}
          
          inputValues.map( x => {

            if (x.type !== "file") {
            userObj[x.name] = x.value
            }

          })
            
          console.log(userObj);
            
          formData.append("userData", JSON.stringify(userObj))
          formData.append("userFile", userFile.files[0])

/*           inputValues.map( x => x.type === "file" ?
          formData.append(x.name, x.files[0]) : formData.append(x.name, x.value)); */



      
          console.log(FormData)
          for (let value of formData.values()) {
          console.log(value);
          }
  
          const response = await fetch('http://localhost:8000/upload', {
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


        }
        fetchFunc();


          console.log("vege a useeffectnek")
          setEffectOrNot(false);

        }

  }, [effectOrNot]);


  return (


    <div className="App">

      <div id="theForm" className="omg">
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value="józsi" required />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value="id_kovacs.peter.jozsi123@z.hu" required />
        </div>
        <div>
            <label htmlFor="zip">Zip</label>
            <input type="text" id="zip" name="zip"  value="123" required />
        </div>
        <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address"  value="Good street 187." required />
        </div>
        <div>
            <label htmlFor="userfile">Photo</label>
            <input type="file" id="userfile" name="userfile" />
        </div>
        <div>
          <br />
            <button className="submitBtn" onClick={() => {setEffectOrNot(true)}}> Send </button>        
        </div>
        
      </div>



    
    </div>
  );
}

export default App;
