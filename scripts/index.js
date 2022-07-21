document.getElementById("five").style.display="none";
document.getElementById("six").style.display="none";
document.getElementById("seven").style.display="none";
document.getElementById("eight").style.display="none";
let viewmore=()=>{
    let viewMoreBtn=document.getElementById("viewMoreBtn");
    if(viewMoreBtn.innerText=="ViewMore>>")
    {
        document.getElementById("five").style.display="block";
        document.getElementById("six").style.display="block";
        document.getElementById("seven").style.display="block";
        document.getElementById("eight").style.display="block";
        viewMoreBtn.innerText="ViewLess<<";
    }
    else if(viewMoreBtn.innerText=="ViewLess<<")
    {
        document.getElementById("five").style.display="none";
document.getElementById("six").style.display="none";
document.getElementById("seven").style.display="none";
document.getElementById("eight").style.display="none";
viewMoreBtn.innerText="ViewMore>>";
    }
}
