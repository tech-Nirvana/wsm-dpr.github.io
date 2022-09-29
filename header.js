const headerTemplate = document.createElement("template");

headerTemplate.innerHTML = `
  <style>
  html {
    box-sizing: border-box;
    font-family: "Muli", Verdana, sans-serif;
    font-size: 1em;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }
    header{
      display:flex;
      flex-wrap: nowrap;
      align-items: stretch;
      justify-content: space-between;
      width: 100vw;
      padding: 0 30px;
      background-color: var(--bg);
      color: white;
    }

    #header-name{
      cursor: pointer;
    }

    header h1 {
      margin: 0;
    }

    header p {
      margin: 0;
    }

    .right-align{
      flex: 1;
      display: flex;
      justify-content: right;
    }

    #links {
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: right;
    }

    ul {
      padding: 0;
      margin: 0;
    }

    li{
      list-style: none;
      padding: 20px   10px;
      cursor: pointer;
    }
    
    #links>li {
      display: inline-block;  
    }

    .sub-content{
      position: relative;
    }

    .drop-icon::after{
      content: var(--dropIcon);
      font-family: 'FontAwesome';
      font-size: 0.9rem;
      margin-left: 0.3rem;
      font-weight: 900;
      vertical-align: middle;
      border: none;
    }

    ul li:hover {
      background-color: rgba(255,255,255,0.1);
    }

    #links>li ul {
      background: var(--bg);
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
    }

    #profile {
      display: flex;
      align-items: center;
      padding:10px;
    }

    #dummy {
      width: 40px;
      border-radius: 50%;
    }

    .svg-icon {
      width: 24px;
      height: 24px;
      align-self: center;
      cursor: pointer;
    }
    
    .svg-icon path,
    .svg-icon polygon,
    .svg-icon rect {
      fill: #fff;
    }
    
    .svg-icon circle {
      stroke: #4691f6;
      stroke-width: 1;
    }
    
  </style>
  <header>
    <div id="header-name">
        <h1>CWSN</h1>
        <p>Management System</p>
    </div>

    <div class="right-align">
      <svg class="svg-icon" id="current-location" viewBox="0 0 20 20">
        <path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
      </svg>
      <nav>
        <ul id="links">
          <li id="attendance-form">
            <span class="drop-content">Attendance&#160form</span>
          </li>
          <li class="sub-content">
            <span class="drop-content drop-icon">reports</span>
            <ul>
              <li id="cwsnReport"><span class="drop-content">Raw&#160report</span></li>
              <li id="visitSummary"><span class="drop-content">Summary&#160Report</span></li>
              <li><span class="drop-content">Monthly&#160absenty</span></li>
            </ul>
          </li>
          <li class="sub-content">
            <span class="drop-content drop-icon">Support</span>
            <ul>
              <li><span class="drop-content">User&#160Manual</span></li>
              <li><span class="drop-content">Video&#160tutorial</span></li>
              <li><span class="drop-content">Ask&#160for&#160help</span></li>
            </ul>
          </li>
          <li>
            <span class="drop-content">CWSN&#160entry</span>
          </li>
          <li class="sub-content">
            <span class="drop-content drop-icon">Links</span>
          </li>
        </ul>
      </nav>
    </div>
    
    <div id="profile">
        <img src="avtar.png" alt="avtar" id="dummy"/>
    </div>
  </header>
`;

class Header extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode:'open'});

    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));

    this.subContent = this.shadowRoot.querySelectorAll(".sub-content");

    this.attendanceForm = this.shadowRoot.querySelector("#attendance-form");

    this.heading = this.shadowRoot.querySelector("#header-name");

    this.currentLocation = this.shadowRoot.querySelector("#current-location");
  }

  connectedCallback() {

    for(var i=0; i<this.subContent.length; i++){
      this.subContent[i].addEventListener('mouseenter', (e) =>{
        console.log($(e.target).children("ul"));
        $(e.target).children("ul").css("display", "block");
      })

      this.subContent[i].addEventListener('mouseleave', (e) =>{
        $(e.target).children("ul").css("display", "none");
      })
    }

    this.attendanceForm.addEventListener('click', function(){
      $("#homepage").css("display", "none");
      $("#entrypage").css("display", "block");
    });

    $(this.heading).click(function(){
      $("#homepage").css("display", "block");
      $("#entrypage").css("display", "none");
    });

    $(this.currentLocation).click(function(){
      locationUpdate();
    })
  }

  disconnectedCallback() {
    this.subContent[i].removeEventListener();
  }
}

customElements.define('header-component', Header);


