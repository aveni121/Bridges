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
    "https://api.airtable.com/v0/appSVIoqEOiUjThFm/Organizations?api_key=keyUbkyh9tjdFBa9O"
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
  var fieldsToCheck = ["name", "quote"];
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
    "https://api.airtable.com/v0/appSVIoqEOiUjThFm/Organizations?api_key=keyUbkyh9tjdFBa9O"
  )
    .then((response) => response.json())
    .then((data) => {
      var data = data;
      console.log("DATA INITIALIZED", data);

      displayRecords(data.records);
    });
}

function displayRecords(records) {
  var studentList = document.getElementById("orgList");
  var wrapper = document.createElement("div");
  while (studentList.firstChild) {
    studentList.removeChild(studentList.firstChild);
  }
  wrapper.setAttribute("class", "row");

  records.forEach((record) => {
    var linkType = record.fields["type"];
    var linkPrompt;
    var linkBlock;
    if (linkType === "organization") {
      linkPrompt = "Go to Website";
      linkBlock = `
        <a href="${record.fields["link"]}">
            <div class="btn-pill mx-3 p-3 h4 text-light">${linkPrompt}</div>
        </a>
        `;
    } else {
      linkPrompt = "Email";
      linkBlock = `
        <a href="mailto: ${record.fields["link"]}">
            <div class="btn-pill mx-3 p-3 h4 text-light">${linkPrompt}</div>
        </a>
        `;
    }
    wrapper.innerHTML += `
        <div class="row border-btm p-4 mx-0 highlight">
          <div class="col-12">
            <div class="d-flex flex-column align-items-start mb-4">
              <div class="display-4">${record.fields["name"]}</div>
              <div class="h4 clr-dark-peach">
                <em>${record.fields["quote"]}</em>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <img src="${record.fields["image"]}" class="img-thumbnail img-ctrl" />
              <p class="text-muted mx-3">
                ${record.fields["desc"]}
              </p>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            ${linkBlock}
          </div>
        </div>
      </div>
          `;
    studentList.appendChild(wrapper);
  });
}
