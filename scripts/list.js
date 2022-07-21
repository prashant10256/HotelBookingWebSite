var locationId="";
let cityName=""
window.addEventListener('load',getUrl);
function getUrl()
{
  enableLoader();
    var link = window.location.href
var data=link.split("=");
var query=data[1];
sessionStorage.setItem("cityName",query);
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
     locationId=resObj.data.Typeahead_autocomplete.results[0].detailsV2.locationId;
     sessionStorage.setItem("cityLocationId",locationId);
     cityName=resObj.data.Typeahead_autocomplete.results[0].detailsV2.names.name;
     getHotelImages();
  

  }    
  
  }

}
var hotelLocationId="";
function getHotelImages()
{
  let xhr=new XMLHttpRequest();
  xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+locationId);
xhr.setRequestHeader("X-RapidAPI-Key", "API_KEY");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
xhr.send();
xhr.onreadystatechange=()=>{
  if(xhr.readyState==4 && xhr.status==200)
  {
    let resStr=xhr.responseText;
    let resObj=JSON.parse(resStr);
   for(let i=1;i<30;i++)
   {
    let res=resObj.data[i].photo.images.original.url;
    let name=resObj.data[i].name;
    hotelLocationId=resObj.data[i].location_id;  
    if(res==undefined){
      continue;
    }
    else
    {
        let output=`
        <div class="contentBox1">
               <a href="detail.html?hotel=${hotelLocationId}"><div class="hotelImage">
                    <img src="${res}" alt="" height="250px" width="250px" class="imageH" ></a> 
                </div>
                <div class="hotelImageContent">
                    <p>${name}</p>
                    <div class="rating">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                    </div>
                    <p>${cityName}</p>
                </div>
            </div>
        
        `;
        document.getElementById("insideContentBox").innerHTML+=output;
        disableLoader();
    }
    
   }
  }
}
}