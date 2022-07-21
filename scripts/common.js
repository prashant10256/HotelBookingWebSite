function enableLoader(){
    document.getElementById("loader").style.visibility="visible";
    document.getElementsByTagName("body")[0].style.opacity="0.5";
  }
  function disableLoader(){
    document.getElementById("loader").style.visibility="hidden";
    document.getElementsByTagName("body")[0].style.opacity="1";
  }
  
  
  
  //code for header starts here
  let header=` <header>
  <div>
    <a href="index.html"><img src="assests/images/logo.png" alt="" height="50px" width="80px"></a>
  </div>
  <div>
    <button  type="button" id="login" class="btn btn-light btn-sm" data-toggle="modal" data-backdrop="false" data-target="#loginModal" onclick="mainLogin(event)">Login</button>
  </div>
  </header>`
  document.getElementById("head").innerHTML=header;
  //header ends here
  
  
  //footer starts here
  let footer=` <div>
  <button type="button" class="btn btn-primary btn-sm" style="margin-left:15px;margin-right:8px"
    data-bs-toggle="modal" data-bs-target="#contactModal">Contact Us</button>
  </div>
  <div>
  <p style="margin-top:8px; margin-right:5px;">&#169; 2022 Room Search Pvt. Ltd.</p>
  </div>
  <div>
  <span>
    <img class="socialMedia" src="assests/images/facebook.png" alt="" height="20px" width="20px">
    <img class="socialMedia" src="assests/images/instagram.png" alt="" height="20px" width="20px">
    <img class="socialMedia" src="assests/images/twitter.png" alt="" height="30px" width="30px" style="margin-right:5px;">
  </span>
  </div>`
  document.getElementById("foot").innerHTML=footer;
  //footer ends here
  document.getElementById("login").style.marginRight="20px";
  
  let mainLogin = e => {
      if (localStorage.getItem('isLogin') === 'true') {
         localStorage.setItem('isLogin', 'false');
         location.reload();
      }
    };
    let login = e => {
        // setting both username and password to admin
        localStorage.setItem('username', 'admin');
        localStorage.setItem('password', 'admin');
        // setting the user state as non logged on webpage load
        localStorage.setItem('isLogin', 'false');
      
        e.preventDefault();
        let userElement = document.getElementById('username');
        let passwordElement = document.getElementById('password');
      
        if (
           userElement.value === localStorage.getItem('username') &&
           passwordElement.value === localStorage.getItem('password')
        ) {
           localStorage.setItem('isLogin', 'true');
             alert('Successfully logged in!');
             let loginElement = document.getElementById('login')
             loginElement.dataset.target = '';
             loginElement.innerText = 'LOGOUT';
             location.reload();
        } else {
           alert('Incorrect credentials! Login failed!');
           // clearing values of username & password fields from login modal
           userElement.value = '';
           passwordElement.value = '';
        }
      };
      
      let isLogin = localStorage.getItem('isLogin');
      let loginElement = document.getElementById('login');
      
      
      let checkLogin = () => {
         if (!isLogin || isLogin === 'false') {
             localStorage.clear();
             loginElement.dataset.target = '#loginModal';
             loginElement.innerText = 'LOGIN';
    
             
         } else if (isLogin === 'true') {
             loginElement.dataset.target = '';
             loginElement.innerText = 'LOGOUT';
             document.getElementById("paynow").disabled=false;
             
         }
      }
      
      checkLogin();
    
    
    
    
    