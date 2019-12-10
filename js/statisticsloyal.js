var statistics = {
    nRep: 0,
    nDem: 0,
    nInd: 0,
    avRep: 0,
    avDem: 0,
    avInd: 0,
};


console.log(document.title);
var jason = "";
var members = [];
let table;
let most, least;
switch (opc) {


    case "house":

        jason = "https://api.propublica.org/congress/v1/113/house/members.json";
        table = "houseglance1";
        most = "Mostloyal";
        least = "mleastLoyalTable"
        break;

    case "senate":
        jason = "https://api.propublica.org/congress/v1/113/senate/members.json";
        table = "senateglance1";
        most = "senMostloyal";
        least = "senleastLoyalTable"

    default:
        jason = "https://api.propublica.org/congress/v1/113/senate/members.json";
        table = "senateglance1";
        most = "senMostloyal";
        least = "senleastLoyalTable"
        break;

}


var members = [];

fetch(jason, {
    method: "GET",
    headers: {
        "X-API-Key": "lGw4SxSsV4rlbLt9jtmEByv6wYzVmZi9GqVaohUJ"
    }
})

    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        //  .style.display = "none"
        console.log(data);
        members = data.results[0].members;
        console.log("1st", members);
        statisticAll();
        tableMostLoyal(most);
        tableLeastLoyal(least);
    })
    .catch(function (err) {
        console.log(err);
    });

function statisticAll() {

    for (var i = 0; i < members.length; i++) {
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
    tableSenateAtGlance(table)

}

function tableSenateAtGlance(id) {
    var tbody = document.getElementById(id);
    var trDem = document.createElement("tr");
    var tdDemocrat = document.createElement("td")
    tdDemocrat.innerHTML = "Democrats"

    var tdDemRep = document.createElement("td")
    tdDemRep.textContent = statistics.nDem

    var tdDemAverage = document.createElement("td")
    tdDemAverage.textContent = (statistics.avDem / statistics.nDem).toFixed(2) + " %"

    tbody.append(trDem);
    trDem.append(tdDemocrat, tdDemRep, tdDemAverage);



    var trRep = document.createElement("tr");
    var tdRepluplican = document.createElement("td");
    tdRepluplican.textContent = "Replublicans"

    var tdReplucReps = document.createElement("td");
    tdReplucReps.textContent = statistics.nRep

    var tdRepAverage = document.createElement("td")
    tdRepAverage.textContent = (statistics.avRep / statistics.nRep).toFixed(2) + " %";

    trRep.append(tdRepluplican, tdReplucReps, tdRepAverage);
    tbody.append(trRep)


    var trInd = document.createElement("tr");

    var tdIndepent = document.createElement("td");
    tdIndepent.textContent = "Independents"

    var tdIndepReps = document.createElement("td");
    tdIndepReps.textContent = statistics.nInd

    var tdIndepAverage = document.createElement("td");
    tdIndepAverage.textContent = (statistics.avInd / statistics.nInd).toFixed(2) + " %";

    trInd.append(tdIndepent, tdIndepReps, tdIndepAverage);

    tbody.append(trInd);


    var trTotal = document.createElement("tr");

    var tdTotalw = document.createElement("td");
    tdTotalw.textContent = "Total";

    var tdTotaldri = document.createElement("td");
    tdTotaldri.textContent = (statistics.nDem + statistics.nInd + statistics.nRep);

    var tdTotalAverage = document.createElement("td");
    tdTotalAverage.textContent = ((statistics.avInd + statistics.avRep + statistics.avDem) / members.length).toFixed(2) + " %"

    trTotal.append(tdTotalw, tdTotaldri, tdTotalAverage);
    tbody.append(trTotal);

    console.log(tdIndepAverage, tdDemAverage, tdRepAverage);

}


function compareLoyaltytperVotes(a, b) {
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
        return -1;
    }
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
        return 1;
    }
    return 0;
}

function senateTenPerMostloyal() {



    var tenPercent = Math.round(members.length * 0.1)

    return tenPercent;
}


function tableMostLoyal(id) {

    var sortedMembers = members.sort(compareLoyaltytperVotes);
    var tenperMostengage = []
    for (var i = 0; i < senateTenPerMostloyal(); i++) {
        tenperMostengage.push(sortedMembers[i])
    }

    let table = document.getElementById(id);

    for (let i = 0; i < tenperMostengage.length; i++) {
        let row = document.createElement("tr");
        let full_name = document.createElement("td");
        let total_votes = document.createElement("td")
        let votes_with_party_pct = document.createElement("td");

        full_name.innerHTML = tenperMostengage[i].first_name + " " + (tenperMostengage[i].middle_name || " ") + " " + tenperMostengage[i].last_name;
        total_votes.innerHTML = tenperMostengage[i].total_votes;
        votes_with_party_pct.innerHTML = (tenperMostengage[i].votes_with_party_pct).toFixed(2) + " %";

        table.append(row);
        row.append(full_name, total_votes, votes_with_party_pct);
    }

}

function tableLeastLoyal(id) {

    var sortRev = members.reverse();
    var tenperMostengage = []
    for (var i = 0; i < senateTenPerMostloyal(); i++) {
        tenperMostengage.push(sortRev[i])
    }

    console.log(tenperMostengage)


    let table1 = document.getElementById(id);

    for (let i = 0; i < tenperMostengage.length; i++) {
        let row = document.createElement("tr");
        let full_name = document.createElement("td");
        let total_votes = document.createElement("td");
        let votes_with_party_pct = document.createElement("td");

        full_name.innerHTML = tenperMostengage[i].first_name + " " + (tenperMostengage[i].middle_name || " ") + " " + tenperMostengage[i].last_name;
        total_votes.innerHTML = tenperMostengage[i].total_votes;
        votes_with_party_pct.innerHTML = (tenperMostengage[i].votes_with_party_pct).toFixed(2) + " %";

        table1.append(row);
        row.append(full_name, total_votes, votes_with_party_pct);
    }

}