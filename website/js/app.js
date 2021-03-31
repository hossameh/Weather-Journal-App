/* Global Variables */
const baseUrl='http://api.openweathermap.org/data/2.5/weather?zip=';
const appKey='&appid=a713fb484fccd4229d435f8cfb36e9cd&units=metric';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// 
const zipTxt = document.querySelector("#zip");
const feelingTxt = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");
if(generateButton)
{
    generateButton.addEventListener('click',callback);
}

function callback()
{
if(zipTxt && zipTxt.value)
{
    WeatherMap(baseUrl,appKey,zipTxt.value)
    .then(res=>{
        if(res && res.cod==200)
        {
            postWizard('/addWizard',{temperature:res.main.temp,date:newDate,userResponse:feelingTxt.value})
            .then(resPost=>{
                if(resPost)
                {
                    getWizard('/getWizard')
                    .then(resGet=>{
                        if(resGet)
                            {
                             updateUI(resGet);
                            }
                    })
                }
            })
        }else
        {
            updateUI(null);
            alert('City not found !');
        }
    });
}else
{
    updateUI(null);
    alert('Please Provide valid Zip Code !');
}
}

// OpenWeatherMap API.
const WeatherMap = async (url='',appKey='',zip='')=>
{
const res = await fetch(url+zip+appKey);

try {

    const data = await res.json();
    return data;
    console.log(data);
    
  }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
  }

}

const getWizard = async(apiURL)=>
{
    const res = await fetch(apiURL);
    try{
    const data = await res.json();
    return data;
    }
    catch(error){
        // appropriately handle the error
        console.log('Get Wizard Error:'+error);
    }
    
}

const postWizard = async (apiURL='',data={})=>
{
const res = await fetch(apiURL,{
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try{
     // const data = await res.json();
      return res;
  }
  catch(error)
  {console.log('Post Error:'+error);}
}

const updateUI = (data={})=>
{
    try{
    if(data){
    document.querySelector("#date").innerHTML ='Date: '+ data.date;
    document.querySelector("#temp").innerHTML ='Temperature: '+ data.temperature+' '+" <span>&#8451;</span>";
    document.querySelector("#content").innerHTML ='Feeling today: ' +data.userResponse;
    }else
    { 
        document.querySelector("#date").innerHTML='';
    document.querySelector("#temp").innerHTML ='';
    document.querySelector("#content").innerHTML ='';
    }
    }
    catch(error)
    {console.log('Update UI error:'+error);}
}