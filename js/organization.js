var searchField = document.getElementById("search");
searchField.addEventListener("input", search);
console.log(searchField);

var findStudent = document.getElementById("findStudent");
findStudent.addEventListener("click", test);

displayAll();

function test() {
  console.log("Hello There");
}

async function search() {
  console.log("Hello");
  fetch(
    "https://api.airtable.com/v0/appSVIoqEOiUjThFm/Students?api_key=keyUbkyh9tjdFBa9O"
  )
    .then((response) => response.json())
    .then((data) => {
      var data = data;
      console.log("DATA INITIALIZED", data);

      return filterRecords(data.records);
    })
    .then((results) => displayRecords(results));
}

function filterRecords(records) {
  var fieldsToCheck = ["name", "interests", "school", "year", "aspiration"];
  var searchInput = document.getElementById("search");
  var searchKey = searchInput.value;

  var result = [];
  console.log(records);

  records.forEach((record) => {
    for (var i = 0; i < fieldsToCheck.length; i++) {
      var recordVal = record.fields[fieldsToCheck[i]].toLowerCase();
      searchKey = searchKey.toLowerCase();

      if (recordVal.includes(searchKey)) {
        result.push(record);
        console.log("Record Val: ", recordVal);
        console.log("Search Key: ", searchKey);
        break;
      }
      console.log(record.fields[fieldsToCheck[i]].includes(searchKey));
    }
  });

  console.log(result);

  return result;
}

function displayAll() {
  fetch(
    "https://api.airtable.com/v0/appSVIoqEOiUjThFm/Students?api_key=keyUbkyh9tjdFBa9O"
  )
    .then((response) => response.json())
    .then((data) => {
      var data = data;
      console.log("DATA INITIALIZED", data);

      displayRecords(data.records);
    });
}

function displayRecords(records) {
  var studentList = document.getElementById("studentList");
  var wrapper = document.createElement("div");
  while (studentList.firstChild) {
    studentList.removeChild(studentList.firstChild);
  }
  wrapper.setAttribute("class", "row justify-content-center");

  records.forEach((record) => {
    var interestsHTML = "";

    record.fields["interests"].split(",").forEach((interest) => {
      interestsHTML += `
            <span class="badge bg-bluegreen">${interest}</span>
            `;
    });

    var email = record.fields["name"].split(" ");
    email = email[0] + email[1] + "@gmail.com";
    email = email.toLowerCase();

    wrapper.innerHTML += `
          <div class="row justify-content-center pt-4 px-4 highlight">
            <div
              class="
                col-1
                d-flex
                justify-content-end
                align-items-start
                border-btm
                pb-3
              "
            >
              <div class="student-pic rounded-circle">
                <div class="student-pic rounded-circle" style="
                background-image: url('${record.fields["image"]}');
                max-width: 100%;
                background-position: center; 
                background-size: 100% 100%;
                background-repeat: no-repeat;
               "></div>
              </div>
            </div>
            <div class="col-3 text-center border-btm pb-3">
              <div class="h4"><strong>${record.fields["name"]}</strong></div>
              <div class="h6 clr-bluegreen">${record.fields["school"]}</div>
              <div class="h6 clr-light-bluegreen">${record.fields["year"]}</div>
            </div>
            <div class="col-2 text-center border-btm pb-3">
              <div class="h4 clr-bluegreen"><strong>Interests:</strong></div>
              <div>${interestsHTML}</div>
            </div>
            <div class="col-2 text-center border-btm pb-3">
              <div class="h4 clr-bluegreen"><strong>Aspiration:</strong></div>
              <div class="h5 clr-dark-peach">${record.fields["aspiration"]}</div>
            </div>
            <div class="col-1 border-btm pb-3">
              <a href="mailto:${email}">
                <div class="h5 btn-pill text-light p-4">Email</div>
              </a>
            </div>
          </div>
          `;
    studentList.appendChild(wrapper);
  });
}
