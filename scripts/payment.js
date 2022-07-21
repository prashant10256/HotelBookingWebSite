let paynow=()=>
{
    alert("Your booking is successfull");
}
let adult=sessionStorage.getItem("adult");
let nameOfPerson=sessionStorage.getItem("name");
let fromDate=sessionStorage.getItem("fromDate");
let toDat=sessionStorage.getItem("toDat");
let price=sessionStorage.getItem("price");
let days=sessionStorage.getItem("days");
let output=`
<div class="customerInfo">
<p><b><span style="font-family:cursive"> Name:</b>${nameOfPerson}</p></span>
<p><b><span style="font-family:cursive">Number of adults:</b>${adult}</p></span>
<p><b><span style="font-family:cursive"> Check-in Date:</b>${fromDate}</p></span>
<p><b><span style="font-family:cursive">Check-out Date:</b>${toDat}</p></span>
</div>
<div class="tariffDetails">
<p><b><span style="font-family:cursive">Tariff BreakDown:</b>Rs 1000 x ${adult} Adults x ${days} Nights</p></span>
<p><b><span style="font-family:cursive">Total Amount:</b>Rs ${price}</p></span>
</div>
<div>
`
enableLoader();
document.getElementById("container2").innerHTML=output;
let query=sessionStorage.getItem("cityName");
let hotelLocationId=sessionStorage.getItem("hotelLocationId");
var paymentCityId="";
const xhr=new XMLHttpRequest();
      let url="https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query="+query;
  
      xhr.open("GET",url);
      xhr.setRequestHeader("X-RapidAPI-Key", "API_KEY");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
xhr.send();
xhr.onreadystatechange=()=>{
  if(xhr.readyState==4 && xhr.status==200)
  {
    let resStr=xhr.responseText;  
   let resObj=JSON.parse(resStr);
   paymentCityId=resObj.data.Typeahead_autocomplete.results[0].detailsV2.locationId;
populateImageOnPayment();
   
   }
  }    
  function populateImageOnPayment(){
    let xhr=new XMLHttpRequest()
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+paymentCityId);
xhr.setRequestHeader("X-RapidAPI-Key", "API_KEY");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
xhr.send();
xhr.onreadystatechange=()=>{
  if(xhr.readyState==4 && xhr.status==200)
  {
  
    let resStr=xhr.responseText;  
    let resObj=JSON.parse(resStr);
    let urlLocationId=sessionStorage.getItem("hotelLocationId");
    for(let i=0;i<resObj.data.length;i++)
    {
      let checkInfo=resObj.data[i].location_id;
      if(checkInfo==urlLocationId)
      {
        let imageUsedInThis=resObj.data[i].photo.images.original.url;
        let hotelNamePayment=resObj.data[i].name;
        let localAddress=resObj.data[i].address;
        let output=`
        <img src="${imageUsedInThis}" height="300px" width="350px" alt="">
        `
        let output2=`
       <span> ${hotelNamePayment}<span>
        `
        let output3=`
        <span>${localAddress}</span>
      `
        document.getElementById("insideContainer1").innerHTML=output;
        document.getElementById("hotelNamePayment").innerHTML=output2;
        document.getElementById("hotelAddressPayment").innerHTML=output3;
        disableLoader();
      }
    }
    
  }
}

  }
  
  