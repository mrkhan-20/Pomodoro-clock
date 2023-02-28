let start_plus=document.getElementById("start-plus");
let start_minus=document.getElementById("start-minus");
let break_plus=document.getElementById("break-plus");
let break_minus=document.getElementById("break-minus");
let session_time=document.getElementById("session-time");
let break_time=document.getElementById("break-time");
let start_but=document.getElementById("start-but");
let pause_but=document.getElementById("pause-but");
let start=document.getElementById("start");
let pause=document.getElementById("pause");
let time=document.getElementsByClassName("starttime")[0];
let reset=document.getElementById("reset");
let sessioncount=document.getElementsByClassName("sessioncount")[0];

pause.setAttribute("style", "display:none");
let s=59,min=0,b=59,ses=1;
let startcount=0,temps=0,tempb=0;

start_plus.addEventListener("click",()=>{
    s=59;
    startcount++;
    temps++;
    session_time.innerText=startcount+" min";
});
start_minus.addEventListener("click",()=>{
    if(startcount>0)
    {  
         startcount--;
         temps--;
         session_time.innerText=startcount+" min";
    }
    if(startcount==0){
        sflag=0;
        s=0;
        temps=0;
    }
});

let breakcount=0,x;
break_plus.addEventListener("click",()=>{
    b=59;
    breakcount++;
    tempb++;
    break_time.innerText=breakcount+" min";
});
break_minus.addEventListener("click",()=>{
    if(breakcount>0)
    {
         breakcount--;
         tempb--;
        break_time.innerText=breakcount+" min";
    }
    if(breakcount==0){
        b=0;
        tempb=0;
    }
});

let bflag=1,sflag=1;
start_but.addEventListener("click",()=>{
    
    let flag=1;
    if(tempb==0 && temps==0){
        alert("Please enter session time");
        time.innerText="0 : 0";
        b=0;
        s=0;
        flag=0;
    }
   else if(flag==1){
        start_plus.setAttribute("style","cursor:not-allowed");
        start_plus.setAttribute("disabled",true);
        start_minus.setAttribute("style","cursor:not-allowed");
        start_minus.setAttribute("disabled",true);
        break_plus.setAttribute("style","cursor:not-allowed");
        break_plus.setAttribute("disabled",true);
        break_minus.setAttribute("style","cursor:not-allowed");
        break_minus.setAttribute("disabled",true);

        start.setAttribute("style", "display:none");
        pause.setAttribute("style", "");
        x=setInterval(function(){
            if(startcount==0 && breakcount==0){
                startcount=temps;
                breakcount=tempb;
                ses++;
            }
            else if(startcount>0 && sflag==1)
            {
                console.log("inside start");
                sessioncount.innerHTML="Session "+ses;
                time.setAttribute("style","color:#00a0b0");
                min=parseInt(startcount-1);
                time.innerText=min+":"+s;
                if(s<=0){
                    startcount--;
                    s=60;
                }
                s--; 
            }
            else{
                console.log("inside pasue");
                sessioncount.innerText="Break "+ses;
                time.setAttribute("style","color:#cd603f");
                if(breakcount-1<0){
                    time.innerText="0 : 0";
                }
                else{
                    min=parseInt(breakcount-1);
                    time.innerText=min+":"+b;
                    if(b<=0){
                        breakcount--;
                        b=60;
                    }
                    b--;
                    
                }
                if(startcount>0)
                    sflag=1;
            }   
        },1000);
}

});

pause_but.addEventListener("click",()=>{
    
    hidepause();

    clearInterval(x);
});

reset.addEventListener("click",()=>{
   hidepause();
    time.innerText="0 : 0";
    startcount=0;
    breakcount=0;
    ses=1;
    temps=0;
    s=59,min=0,b=59,ses=1;
    tempb=0;
    sessioncount.innerText="Session 1";
    time.setAttribute("style","color:#00a0b0");
    break_time.innerText="0 min";
    session_time.innerText="0 min";
    clearInterval(x);
});

hidepause=function () {
    start_plus.setAttribute("style","cursor:pointer");
    start_plus.disabled=false;
    start_minus.setAttribute("style","cursor:pointer");
    start_minus.disabled=false;
    break_plus.setAttribute("style","cursor:pointer");
    break_plus.disabled=false;
    break_minus.setAttribute("style","cursor:pointer");
    break_minus.disabled=false;
    pause.setAttribute("style", "display:none");
    start.setAttribute("style", "");
}