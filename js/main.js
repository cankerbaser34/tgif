
var jason = "";
let table;
var members = [];
switch (opc) {

	case "house":
		jason = "https://api.propublica.org/congress/v1/113/house/members.json";
		table = document.getElementById("house-data");
		break;

	case "senate":
		jason = "https://api.propublica.org/congress/v1/113/senate/members.json";
		table = document.getElementById("senate-data");
		
	default:
		jason = "https://api.propublica.org/congress/v1/113/senate/members.json";

		break;

}



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
		document.getElementById("loader").style.display = "none"
		console.log(data);
		members = data.results[0].members;
		console.log("1st", members);
		createtable(members);
		getUniqueStates();
		filterByParty();
	})
	.catch(function (err) {
		console.log(err);
	});


function createtable(rowsource) {

	//tableFor Error message;
	if (rowsource.length == 0) {

		console.log("nomembers")

		let tr = document.createElement("tr");
		let td = document.createElement("td");
		td.setAttribute("colspan", 5);
		td.innerHTML = "No members match with the filters!!!"
		tr.append(td);
		table.append(tr);
	}

	for (let i = 0; i < rowsource.length; i++) {
		let row = document.createElement("tr");
		let full_name = document.createElement("td");
		let party = document.createElement("td");
		let state = document.createElement("td");
		let yearsInOffice = document.createElement("td");
		let total_votes = document.createElement("td");
		full_name.innerHTML =
			rowsource[i].first_name +
			" " +
			(rowsource[i].middle_name || " ") +
			" " +
			rowsource[i].last_name;
		party.innerHTML = rowsource[i].party;
		state.innerHTML = rowsource[i].state;
		yearsInOffice.innerHTML = rowsource[i].seniority;
		total_votes.innerHTML = rowsource[i].votes_with_party_pct + " %";

		table.append(row);
		row.append(full_name, party, state, yearsInOffice, total_votes);
	}

}
// filters By party

document.getElementById("democrat").addEventListener("click", function () {

	filterByParty()
});

document.getElementById("republican").addEventListener("click", function () {

	filterByParty()
});

document.getElementById("independent").addEventListener("click", function () {

	filterByParty()
});

function filterByParty() {


	console.log("function connected");

	let democratcheckbox = document.getElementById("democrat").checked;

	let republicancheckbox = document.getElementById("republican").checked;

	let independentcheckbox = document.getElementById("independent").checked;


	console.log("democrat", democratcheckbox);
	console.log("republican", republicancheckbox);
	console.log("independent", independentcheckbox);

	let filteredMembers = [];

	for (i = 0; i < members.length; i++) {

		if (democratcheckbox == true && members[i].party == "D") {
			filteredMembers.push(members[i])
		}
		if (republicancheckbox == true && members[i].party == "R") {
			filteredMembers.push(members[i])
		}
		if (independentcheckbox == true && members[i].party == "I") {
			filteredMembers.push(members[i])

		}


	}

	//table.innerHTML = "";

	//createtable(filteredMembers);

	filterBystate(filteredMembers);
}

function getUniqueStates() {

	var unqState = []
	for (i = 0; i < members.length; i++) {

		console.log(members[i].state);
		if (!unqState.includes(members[i].state)) {
			unqState.push(members[i].state)

		}
	}
	console.log(unqState.sort());

	let select = document.getElementById("state-filter");

	let singleOption;
	for (i = 0; i < unqState.length; i++) {
		singleOption = document.createElement("option");
		singleOption.innerHTML = unqState[i];
		select.append(singleOption);

	}



}
// filter by state

document.getElementById("state-filter").addEventListener("change", function () {


	filterByParty();


});
function filterBystate(filteredByParty) {

	let select = document.getElementById("state-filter");
	console.log("<ins", select.value);

	var filtredMembers = [];
	for (i = 0; i < filteredByParty.length; i++) {

		if (filteredByParty[i].state == select.value || select.value == "All") {
			console.log("in if");

			filtredMembers.push(filteredByParty[i]);

		}

	}
	console.log(filtredMembers);

	table.innerHTML = "";
	createtable(filtredMembers);

}
