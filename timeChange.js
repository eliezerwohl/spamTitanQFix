//document.body.style.border = "5px solid red";
var firstLoad = false;
var timeOffset = -5

//correct the hours
function correctHours(date = new Date()) {
  var correctedDT = date.setTime(date.getTime() + timeOffset * 60 * 60 * 1000);
  return  new Date(correctedDT);
}
function sliceDate(date){
    var isString = date.toString();
    var correctedDT = isString.slice(0,isString.indexOf(" GMT"))
    return correctedDT
}

function timeSwitch(){
    const collectionResult = document.getElementsByClassName("yui-dt1-col-ts");
    for (let i = 1; i < collectionResult.length; i++) {
        var DT =  correctHours(new Date(collectionResult[i].textContent));
        var hours = DT.getHours() ; // gives the value in 24 hours format   
        var amOrPM = hours >= 12 ? 'pm' : 'am';
        hours = (hours % 12) || 12;
        var minutes = DT.getMinutes();
        collectionResult[i].textContent = sliceDate(DT) + " / " + hours + ":" + String(minutes).padStart(2, '0') + " " + amOrPM; 
    }
    var changedTableSpan = document.createElement('span')
    changedTableSpan.setAttribute("id", "changedTable");
    collectionResult[1].appendChild(changedTableSpan);
    firstLoad = true;
}

function pageLoad(){
    //see if page loaded for the first time
    const collectionResult = document.getElementsByClassName("yui-dt1-col-ts");
    if (collectionResult.length < 2){
        //page hasn't loaded
        setTimeout(pageLoad, 100)
    }
    else {
        //run the time switch for the first time
        setTimeout(timeSwitch, 100) 
    }
}


function pageCheck(){
    if (firstLoad){
        //checking to see if page changedTable has run but the page has refreshed
        if (!document.getElementById("changedTable")){
            timeSwitch();
        }
    }
}

pageLoad();
setInterval(pageCheck, 100);


