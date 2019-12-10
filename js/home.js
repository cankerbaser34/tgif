function buttonToToggle() {

    var button = document.getElementById('button');
    if (button.innerHTML == "Read More") {
        //        x.style.display = 'block';
        button.innerHTML = 'Read Less';
    } else {

        button.innerHTML = 'Read More';
    }
}
buttonToToggle()



var members = data.results[0].members;

var statistics = {

    nRep: 0,
    nDem: 0,
    nRep: 0,
    avRep: 0,
    avDem: 0,
    avInd: 0,

};

for (let i = 0; i < members.length; i++) {

    if (members[i].party == "R") {

        statistics.nRep++;
        statistics.avRep = statistics.avRep + members[i].votes_with_party_pct;
    }
    else if (members[i].party == "D") {
        statistics.nDem++;
        statistics.avDem = statistics.avDem + members[i].votes_with_party_pct;
    } else {
        statistics.nInd++;

        statistics.avInd += members[i].votes_with_party_pct;
    }
}

let tbody = document.getElementById("senateglance");

let trDem = document.createElement("tr");
let tdDemocrat = document.createElement("td");
tdDemocrat.innerHTML = "Democrats"

let tdDemRep = document.createElement("td");
tdDemocrat.innerHTML = statistics.nDem;
let tdDemAverage = document.createElement("td");
tdDemAverage.innerHTML = (statistics.avDem / statistics.nDem).toFixed(2) + " %";

tbody.append(trDem);
trDem.append(tdDemocrat, tdDemRep, tdDemAverage);


let trRep = document.createElement("tr");
let tdRepublican = document.createElement("td");
tdRepublican.innerHTML = "Republicans"

let tdRepubRep = document.createElement("td");
tdRepubRep.innerHTML = statistics.nRep;

let tdRepAverage = document.createElement("td");
tdRepAverage.innerHTML = (statistics.avRep / statistics.nRep).toFixed(2) + " %";

trRep.append(tdRepublican, tdRepubRep, tdRepAverage);
tbody.append(trRep);


let trInd = document.createElement("tr");
let tdIndependents = document.createElement("td");
tdIndependents.innerHTML = "Independents"

let tdIndepReps = document.createElement("td");
tdIndepReps.innerHTML = statistics.nInd;

let tdIndepAverage = document.createElement("td");
tdIndepAverage.innerHTML = (statistics.avInd / statistics.nInd).toFixed(2) + " %";

trInd.append(tdIndependents, tdIndepReps, tdIndepAverage);
tbody.append(trInd);


let trTotal = document.createElement("tr");
let tdTotalw = document.createElement("td");
tdTotalw.innerHTML = "Total"

let tdTotaldri = document.createElement("td");
tdTotaldri.innerHTML = ((statistics.avInd + statistics.avRep + statistics.avDem) / members.length).toFixed(2) + " %";

let tdTotalAverage = document.createElement("td");
tdTotalAverage.innerHTML = ((statistics.avInd + statistics.avRep + statistics.avDem) / members.length).toFixed(2) + " %";

trTotal.append(tdTotalw, tdTotaldri, tdDemAverage);
tbody.append(trTotal);
