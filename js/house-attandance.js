
var statistics = {
    nRep: 0,
    nDem: 0,
    nInd: 0,
    avRep: 0,
    avDem: 0,
    avInd: 0,
};

let members;
fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
        console.log(data);
        members = data.results[0].members;
        statisticAll();
        tableMostEngaged();
        tableLeastEngaged();
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
    tableSenateAtGlance()

}

function tableSenateAtGlance() {
    var tbody = document.getElementById("houseglance");
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


function compareLovestperVotes(a, b) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
        return -1;
    }
    if (a.missed_votes_pct > b.missed_votes_pct) {
        return 1;
    }
    return 0;
}

function senateTenPerMostEngage() {



    var tenPercent = Math.round(members.length * 0.1)

    console.log(tenPercent)
    return tenPercent
}

function tableMostEngaged() {
    var sortedMembers = members.sort(compareLovestperVotes);
    var tenperMostengage = []
    for (var i = 0; i < senateTenPerMostEngage(); i++) {
        tenperMostengage.push(sortedMembers[i])
    }

    console.log(tenperMostengage)
    let table = document.getElementById("mostEngaged");

    for (let i = 0; i < tenperMostengage.length; i++) {
        let row = document.createElement("tr");
        let full_name = document.createElement("td");
        let missed_votes = document.createElement("td");
        let missed_votes_pct = document.createElement("td");

        full_name.innerHTML = tenperMostengage[i].first_name + " " + (tenperMostengage[i].middle_name || " ") + " " + tenperMostengage[i].last_name;
        missed_votes.innerHTML = tenperMostengage[i].missed_votes;
        missed_votes_pct.innerHTML = tenperMostengage[i].missed_votes_pct;

        table.append(row);
        row.append(full_name, missed_votes, missed_votes_pct);
    }

}

function tableLeastEngaged() {
    var sortRev = members.reverse()
    var tenperMostengage = []
    for (var i = 0; i < senateTenPerMostEngage(); i++) {
        tenperMostengage.push(sortRev[i])
    }

    console.log(tenperMostengage)
    let table1 = document.getElementById("leastEngaged");

    for (let i = 0; i < tenperMostengage.length; i++) {
        let row = document.createElement("tr");
        let full_name = document.createElement("td");
        let missed_votes = document.createElement("td");
        let missed_votes_pct = document.createElement("td");

        full_name.innerHTML = tenperMostengage[i].first_name + " " + (tenperMostengage[i].middle_name || " ") + " " + tenperMostengage[i].last_name;
        missed_votes.innerHTML = tenperMostengage[i].missed_votes;
        missed_votes_pct.innerHTML = tenperMostengage[i].missed_votes_pct;

        table1.append(row);
        row.append(full_name, missed_votes, missed_votes_pct);
    }

}

