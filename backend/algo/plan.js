import axios from 'axios';

var Graph = require("graphlib").Graph;

var apikey="AIzaSyCN01axjaDma-YXgUpcSbB_aaDLY4OAqdg"
var getPositionByAddr="https://maps.googleapis.com/maps/api/geocode/json?address";

function Place( address, staytime,next,id){
    // this.name = name;
    this.address = address;
    // this.longitude = longitude;
    // this.latitude = latitude;
    this.staytime = staytime;
    this.next=next;
    this.combinedTime=staytime;
    this.id=id;
  }


function getURl(A,B){
    return "http://maps.googleapis.com/maps/api/distancematrix/json?origins="+A.Longitude+","+A.Latitude+"&destinations="+B.Longitude+","+B.Latitude+"&key="+apikey;
}


function getTravelTime(A,B){
    if (A==null || B==null ) return 0;
    return 60;//place holder
    //ToDo: build a local data base for it
}

function getSize(head){
    if (head==null) return 0;
    var ret=1;
    var curr=head;
    while (curr.next!=null){
        curr=curr.next;
        ret=ret+1;
    }
    return ret;
}
// get the last element in a linked list
function getLast(head){
    var curr=head;
    while (curr.next!=null){
        curr=curr.next;
    }
    return curr;
}

// append to the end of the linked list
function appendEnd(head,toAppend){
    var last=getLast(head);
    last.next=toAppend;
    head.combinedTime=head.combinedTime+getTravelTime(last,toAppend)+toAppend.combinedTime;
}

//see if there are really close places, combine them into one
function combine(places){
    var length=places.length;
    var count = length;
    var index=0;
    for (var i=0;i<length;i++){
        var A = places[i];
        if (A==null) continue;
        for (var j=0;j<length;j++){
            var B = places[j];
            if (B==null) continue;
            if (A.combinedTime+B.staytime<7*60+30){
                var travelTime=getTravelTime(getLast(A),B);
                if (travelTime<20 && A.combinedTime+B.staytime+travelTime){
                    // A.combinedTime=A.combinedTime+B.staytime+travelTime;
                    appendEnd(A,B);
                    places[j]=null;
                    count--;
                }
            }
        }
    }
    var ret= new Array(count);
    for (i=0;i<length;i++){
        if (places[i]!=null){
            ret[index]=places[i];
            index++;
        }
    }
    return ret;
}

//truncate a linked list to make it possible to travel through the
// places in a day. if not possible, then return null; if possible, return the
// first element before truncate
//warning : it will change the data structure, so be caution.
function getTruncatePoint(start,timeleft,changeStructure){
    var count = 0;
    var curr = start;
    var prev = null;
    if (timeleft<start.staytime) return null;
    while (1){
        count=count+ getTravelTime(prev,curr)+curr.staytime;
        if (count>timeleft) {
            if (changeStructure){
                curr.combinedTime=curr.staytime+ start.combinedTime-count;
                start.combinedTime = count-curr.staytime-getTravelTime(prev,curr);
            }
            return prev;
        }
        prev=curr;
        curr=curr.next;
    }
}

//used to truncate an linked list into two/more days if they are too close to each other.
function truncate(start,timeleft){
    var tem = new Arrays(10);
    var curr=start;
    tem[0]=start;
    index=0;
    var truncatePoint= getTruncatePoint(curr,timeleft,true);
    curr=truncatePoint;
    index++;
    tem[index]=curr;
    var ret = new Array(index);
    for (i =0 ; i<index; i++){
        ret[i] = tem[i];
    }
    return ret;
}

//if must go cannot fill all the number of days, then assign the first place to go with the want to go or others.
function fillRestWithWantToOrOther(ret,wantGoCombined,otherCombined,startIndex,endIndex){
    var mustAndwantTotal = startIndex+wantGoCombined.length;

    for (var i=startIndex;i<endIndex && i<wantGoCombined.length+startIndex;i++){
        ret[i]=wantGoCombined[i-startIndex];
        wantGoCombined[i-startIndex]=null;
    }
    //edge case: other combined boundary overflow but very not likely
    if (mustAndwantTotal<endIndex){
        for (i = mustAndwantTotal;i<endIndex;i++){
                ret[i]=otherCombined[i-mustAndwantTotal];
            otherCombined[i-mustAndwantTotal]=null;
        }
    }
    return ret;
}

function fill_a_day(plan,i,placelist){
    var flag=true;
    // if checkflag is false, we already iterate through the list
    // and didn't find any match
        for (var j=0;j<placelist.length;j++){
            var head=placelist[j];
            if (head==null) continue;
            //if there is a perfect fit;
            if (getTravelTime(getLast(plan),head)+head.combinedTime<510){
                appendEnd(plan[i],head);
                placelist[j]=null;
                flag=false;
                break;
            }
        }
    if (flag){
        var head=placelist[j];
        // if (head==null) {
        //     continue;
        // }
        // now need to truncate some of the want to go
        var shortest = 1000;
        var firstchoice = null;

        var last= getLast(plan[i]);
        for (j=0;j<placelist.length;j++){
            if (placelist[i]==null) continue;
            var travelTime= getTravelTime(last,placelist[j]);
            if (travelTime<shortest){
                if (plan[i].combinedTime+travelTime+placelist[j].staytime<510){
                    shortest=travelTime;
                    firstchoice=j;
                }
            }
            else continue;
        }
        if (firstchoice==null) return plan;
        var toBeTrun= getTruncatePoint(placelist[firstchoice],510-plan[i].combinedTime-travelTime,true);
        if (toBeTrun==null ) {
            return plan;
        }
        placelist[j]=toBeTrun.next;// maybe refer to a null so need to do null check
        appendEnd(plan[i],toBeTrun);
    }
    return plan;
}
// fill the rest of the day with want to go and combined
//strategy: traverse through the plan array
// first to see if we can fit a whole wantGo combined into the day,
// if yes, than keep doing it. if not, the see if we can truncate part
// of the want to go into the day.if we can, then see if we can do it again.
// if we cannot ,then do the same thing to the otherCombined.
function fillRestOfDays(plan,wantGoCombined,otherCombined,days){
    for (var i=0;i<days;i++){
        if (plan[i].combinedTime>450) continue;
        for (j=0;j<3;j++){// do this three times, unlikely to have exceptions
            plan = fill_a_day(plan,i,wantGoCombined);
        }
        for (var j=0;j<3;j++){// do this three times, unlikely to have exceptions
            plan = fill_a_day(plan,i,otherCombined);
        }
    }
    return plan;
}

// strategy: first fill the first place of the day with must go, then see if there is space for
// want to go and others(return a list with linked list elements)
// use a linked list structure inside each day
function getPlBasedOnMustGoCombined(mustGoCombined,wantGoCombined,otherCombined,days){
    var mustLength=mustGoCombined.length;
    var ret = new Array(days);
    for (var i=0;i<days;i++){
        ret[i]=null;
    }
    // edge case: a single Element in MustGoCombined takes more time than a single day
    // ("damn it");
    // (ret);
    // ("wtf");
    for (var i=0;i<mustGoCombined.length;i++){
        //if (mustGoCombined[i].combinedTime>480){
           //impossible to happen so delete
        //}
        ret[i]=mustGoCombined[i];
    }
    if (mustGoCombined.length<days){
        ret = fillRestWithWantToOrOther(ret,wantGoCombined,otherCombined,mustGoCombined.length,days);
    }
    // ("other to go combined");
    // (otherCombined);
    // ("want to is ");
    // (wantGoCombined);
    // ("other is ");
    // (otherCombined);
    // ("ret is");
    // (ret);
    ret = fillRestOfDays(ret,wantGoCombined,otherCombined,days);

    return ret;
}

//strategy: each must go is a linked list with a single element,
// this was supposed to a independenent function, but found that
//it can use the same signature as the getPlBasedOnMustGoCombined;
function getPlBasedOnMustGo(mustGo,wantGoCombined,otherCombined,days){
    var ret = getPlBasedOnMustGoCombined(mustGo,wantGoCombined,otherCombined,days);
    return ret;
}


//the main function for plan generating.
function generatePlan(mustGo,wantGo,other,days){

    var mustGoCombined=combine(mustGo);
    var wantGoCombined=combine(wantGo);
    var otherCombined=combine(other);
    var evenBeforeCom=mustGo.length<=days;
    var evenAfterCom=mustGoCombined.length<=days;

    if (evenBeforeCom){
        if (evenAfterCom){//strategy: fill must gos first then fill the other
            // ("line 264");
            var ret = getPlBasedOnMustGoCombined(mustGoCombined,wantGoCombined,otherCombined,days);
            return ret;
        }
        else{
            // ("line 269");
            var ret = getPlBasedOnMustGo(mustGo,wantGoCombined,otherCombined);
            return ret;
        }
    }
    else{
        if (evenAfterCom){
            // ("line 276");
            var ret= getPlBasedOnMustGoCombined(mustGoCombined,wantGoCombined,otherCombined,days);
            return ret;

        }
        else{
            var ret = new Array(days);
            for (var i=0;i<days;i++){
                ret[i]=mustGoCombined[i];
                mustGoCombined[i]=null;
            }
            for (var i=0;i<days;i++){
                for (var j=0;j<3;j++){
                    ret = fill_a_day(ret,i,mustGoCombined);
                }
                for (j=0;j<3;j++){
                    ret = fill_a_day(ret,i,wantGoCombined);
                }
                for (j=0;j<3;j++){
                    ret = fill_a_day(ret,i,otherCombined);
                }
            }
        }
    }
    return ret;
}

function get_object_by_id(id){
    var url="/api/spots?where={\"_id\":\""+id+"\"}";
    var k=axios.create();
    return k.get(url);
}

function contains(idlist,id){
    var size= idlist.length;
    for (var i=0;i<size;i++){
        // ("ooo");
        // (idlist[i]);
        if ((idlist[i]._id.localeCompare(id))==0) return true;
    }
    return false;
}

function getOtherPlace(city,allspot,mustGoId,wantGoId,noGoId){
    var length = allspot.length;
    var retSize=length-mustGoId.length-wantGoId.length-noGoId.length;
    var ret = new Array(retSize);
    var index=0;
    for (var i=0;i<length;i++){
        if (!contains(mustGoId,allspot[i]._id) && !contains(wantGoId,allspot[i]._id) && !contains(noGoId,allspot    [i]._id)) {
                ret[index] = allspot[i];
                index++;
        }
    }

    return ret;
}

function fillObject(MustGoId,mustGo,i){
    // var axiosObj=get_object_by_id(MustGoId[i]);
    // axiosObj.then(function (response) {
            var result=MustGoId[i];
            var street=result.street;
            var country=result.country;
            var cityName = result.cityName;

            var duration = result.duration;
            var durationInNumber;
            var noMatch = new RegExp("No duration found");
            var moreThan= new RegExp("More");
            var first=new RegExp(': [0-9]');
            var second = new RegExp('-[0-9]');
            var lessthanahour= new RegExp('<');
            var less= duration.search(lessthanahour);
            if (less!=-1){
                durationInNumber=60;
            }
            else{

                var index= duration.search(noMatch);
                if (index!=-1){
                    durationInNumber=180;
                }
                else{
                    index=duration.search(moreThan);
                    if (index==-1){
                        var index1=duration.search(first);
                        var index2=duration.search(second);
                        if (index1==-1 || index2==-1){
                            // (duration);
                            // ("some problem on 313");
                        }
                        var x=duration.charAt(index1+1)-'0';
                        var y=duration.charAt(index2+1)-'0';
                        durationInNumber=(x+y)*60/2;
                    }
                    else{
                        var number=new RegExp("[0-9]");
                        var numberIndex=duration.search(number);
                        var x=duration.charAt(numberIndex);
                        durationInNumber=(x-'0')*60;
                    }
                }
            }
            var address=street+", "+ cityName+", "+country;
            mustGo[i]=new Place(address,durationInNumber,null,MustGoId[i]);
}

function getPlan(allSpot,MustGoId,WantToGoId,noGoId,city,days){
    // ("sss");
    // (days);
    // ("kkk");
    var mustGo=new Array(MustGoId.length);
    var wantGo = new Array(WantToGoId.length);
    var OtherId=getOtherPlace(city,allSpot,MustGoId,WantToGoId,noGoId);
    var other= new Array(OtherId.length);
    for (var i=0;i<mustGo.length;i++){
        //get all the information from id
        fillObject(MustGoId,mustGo,i);
    }
    for (var i=0;i<wantGo.length;i++){
        fillObject(WantToGoId,wantGo,i);
    }
    for (var i=0;i<OtherId.length;i++){
        fillObject(OtherId,other,i);
    }
    var plan = generatePlan(mustGo,wantGo,other,days);
    var ret =new Array(days);
    for (var i=0;i<days;i++){
        var size=getSize(plan[i]);
        if (size>4) size=4;
        ret[i]=new Array(size);
        ret[i][0]=plan[i];
        for (var j=1;j<size;j++){
            ret[i][j]=ret[i][j-1].next;
        }
    }
    // (ret);
    return ret;
}

export default getPlan;
