let update=()=>{
    let adult = document.getElementById("adult");
    let name=document.getElementById("name");
    let price = document.getElementById("price");
    let toDateElement = document.getElementById("toDate");
    let fromDateElement = document.getElementById("fromDate");

    let toDateValue = new Date(toDateElement.value);
    let fromDateValue = new Date(fromDateElement.value);

    toDateElement.min = fromDateElement.value;

    let days = (toDateValue - fromDateValue)/(24*60*60*1000);
    
    if(adult.value && toDateElement.value && fromDateElement.value)
        price.value = "Rs. " + parseInt(adult.value)*1000*days;
    else
        price.value = "Rs.0";   
        sessionStorage.setItem("adult",adult.value);
        sessionStorage.setItem("name",name.value);
        sessionStorage.setItem("toDat",toDateElement.value);
        sessionStorage.setItem("fromDate",fromDateElement.value);
        sessionStorage.setItem("price",price.value);  
        sessionStorage.setItem("days",days);


}
window.addEventListener('load',getHotelId);
function getHotelId(){
  enableLoader();
    var link=window.location.href;
    var data=link.split("=");
    var query=data[1];
    sessionStorage.setItem("hotelLocationId",query)
  
    let counter=0;
   let xhr=new XMLHttpRequest();
   xhr.open("GET", "https://travel-advisor.p.rapidapi.com/photos/list?location_id="+query);
xhr.setRequestHeader("X-RapidAPI-Key", "API_KEY");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");

xhr.send();
xhr.onreadystatechange=()=>{
    if(xhr.readyState==4 && xhr.status==200){
        let resStr=xhr.responseText;
    let resObj=JSON.parse(resStr);
    for(let i=0;i<resObj.data.length;i++)
    {
      let image=resObj.data[i].images.original.url;
      if(i==0)
      {
        let output=`
    <div class="carousel-item active">
                <img class="d-block w-100" src="${image}" height="400px" width="400px">
              </div>
   
       `
    document.getElementById("carousel-inner").innerHTML=output;
      }
    let output=`
    <div class="carousel-item">
                <img class="d-block w-100" src="${image}" height="400px" width="400px">
              </div>
   
       `
    document.getElementById("carousel-inner").innerHTML+=output;
    }
    
    }
}
getResult();
}
var counter=0;
var hotelName;
var hotelDescription;
function getResult(){
  var cityLocationId=sessionStorage.getItem("cityLocationId");
  var hotelLocationId=sessionStorage.getItem("hotelLocationId");
  let xhr=new XMLHttpRequest();
  xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+cityLocationId);
xhr.setRequestHeader("X-RapidAPI-Key", "API_KEY");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
xhr.send();
xhr.onreadystatechange=()=>{
  if(xhr.readyState==4 && xhr.status==200)
  {
    let resStr=xhr.responseText;
    let resObj=JSON.parse(resStr);
    for(let i=0;i<resObj.data.length;i++)
    {
     let user=resObj.data[i].location_id;
     if(user==hotelLocationId)
     {
       hotelsName=resObj.data[i].name;
       hotelDescription=resObj.data[i].description;
      let output=`
      <p>
        ${hotelDescription}
      </p>


      `
      let outputyes=`
      ${hotelsName}
      `
      document.getElementById("desc").innerHTML=output;
      document.getElementById("hotelNameInDetail").innerHTML=outputyes;
      disableLoader();
     }
    }
 
  }
}
}
var adult=document.getElementById("adult").value
sessionStorage.setItem("adult",adult);


