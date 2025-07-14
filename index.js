const error_message=document.getElementById("Error");
const p_temp=document.getElementById("temp");
const p_tempfeel=document.getElementById("temp_feel");
const p_wmain=document.getElementById("Wmain");
const p_we=document.getElementById("We");
let flag;

function kelvinToCelsius(k) {
  return k - 273.15;
}

async function fetchData(City){

    let temp,temp_feel,Wmain,we,imgp;

    flag=true;

    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=0422594b1ef7fa4daae013346f4cd4d2`)
        .then(function(response){
            if (response.ok){
                return response.json();
            }
            else {
                throw new Error("Invalid City Name");
            }
        })
        .then(function(val){
            temp=kelvinToCelsius(val.main.temp).toFixed(2);
            temp_feel=kelvinToCelsius(val.main.feels_like).toFixed(2);
            Wmain=val.weather[0].main.toUpperCase();
            we=val.weather[0].description.toUpperCase();
            imgp=val.weather[0].icon;
        })
        .catch(function(error){
            console.error(error);
            flag=false;
        })

    if (flag==true){    
        return [temp,temp_feel,Wmain,we,imgp];
    }
    else {
        return false;
    }

}

async function Submit(){
    document.getElementById("displayCard").style.display="none";
    p_temp.style.display="none";
    p_tempfeel.style.display="none";
    p_we.style.display="none";
    p_wmain.style.display="none";
    document.getElementById("pic").style.display="none";
    error_message.style.display="none";

    let cityname=document.getElementById("entry").value;
    let info_arr=await fetchData(cityname);


    document.getElementById("displayCard").style.display="block";

    if (!flag){
        error_message.style.display="block";
        return;
    }
    p_temp.style.display="block";
    p_tempfeel.style.display="block";
    p_we.style.display="block";
    p_wmain.style.display="block";
    document.getElementById("pic").style.display="block";


    p_temp.textContent=`Temp: ${info_arr[0]}`;
    p_tempfeel.textContent=`Temp Feels Like: ${info_arr[1]}`;
    p_wmain.textContent=`Weather: ${info_arr[2]}`;
    p_we.textContent=`Weather Condition: ${info_arr[3]}`;

    document.getElementById("pic").src=`https://openweathermap.org/img/wn/${info_arr[4]}@2x.png`;
}

document.getElementById("Submit").onclick=Submit;
