async function fetchData() {
  let response = await fetch(
    "https://large-necessary-quesadilla.glitch.me/courses"
  );
  let data = await response.json();
  displayData(data);
}

// Function to display the data
function displayData(data) {
  let container = document.getElementById("cont");
  data.forEach((data) => {
    let item = document.createElement("div");
    item.innerHTML = `
      <h1>${data.title}</h1>
      <img src=${data.pic}>
      <h3>${data.category}</h3>
      <p>Price : ${data.price}</p>
      <p>${data.description}<p>
      <p>Duration : ${data.duration}</p>


      <div class="button-container" style="box-shadow: none">
        <button id='deleteBtn-${data.id}'>Delete</button>
        <button id='editBtn-${data.id}'>Edit</button>
      </div>
      `;
    container.appendChild(item);
    let deleteBtn = document.getElementById(`deleteBtn-${data.id}`);
    let editBtn = document.getElementById(`editBtn-${data.id}`);
    deleteBtn.onclick = () => {
      deleteData(data.id);
    };
    editBtn.onclick = () => {
      editData(data.id);
    };
  });
}

// Function to delete the data
async function deleteData(id) {
  let response = await fetch(
    `https://large-necessary-quesadilla.glitch.me/courses/${id}`,
    { method: "DELETE" }
  );
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert("Deleted successfully");
    fetchData();
  } catch (error) {
    alert("something went wrong");
    console.log(error);
  }
}

//Function to edit the data
async function editData(id) {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top

  let idd = document.getElementById("id");
  let title = document.getElementById("name");
  let image = document.getElementById("img");
  let category = document.getElementById("cat");
  let price = document.getElementById("price");
  let description = document.getElementById("desc");
  let duration = document.getElementById("dur");
  let response = await fetch(
    `https://large-necessary-quesadilla.glitch.me/courses/${id}`
  );
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    let data = await response.json();
    // console.log(data);
    idd.value = data.id;
    title.value = data.title;
    image.value = data.pic;
    category.value = data.category;
    price.value = data.price;
    description.value = data.description;
    duration.value = data.duration;
  } catch (error) {
    alert("something went wrong");
    console.log(error);
  }
}

async function saveData() {
  console.log("called");
  let idd = document.getElementById("id").value;
  let title = document.getElementById("name").value;
  let image = document.getElementById("img").value;
  let category = document.getElementById("cat").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("desc").value;
  let duration = document.getElementById("dur").value;

  let obj = {
    id: idd,
    title: title,
    pic: image,
    category: category,
    price: price,
    description: description,
    duration: duration,
  };

  let courseMethod = idd ? "PUT" : "POST";
  let URL = idd
    ? `https://large-necessary-quesadilla.glitch.me/courses/${idd}`
    : `https://large-necessary-quesadilla.glitch.me/courses`;

  let response = await fetch(URL, {
    method: courseMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    alert("Data Updated successfully");
    clearInputFields(); // Clear input fields after successful update
    fetchData();
  } catch (error) {
    console.error(error);
  }
}

// Function to clear input fields
function clearInputFields() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("img").value = "";
  document.getElementById("cat").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("dur").value = "";
}

document.addEventListener("DOMContentLoaded", fetchData);
