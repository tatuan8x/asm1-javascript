"use strict";

const btnSubmit = document.getElementById("submit-btn");
const btnShowpet = document.getElementById("healthy-btn");
const btnCalcBMI = document.getElementById("calculate-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const petArr = [];
let healthyCheck = false;

//click vào nút Submit
btnSubmit.addEventListener("click", function () {
  //ngày tạo
  const date = new Date();
  function dateData() {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }

  //Lấy được dữ liệu từ các Input Form
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: dateData(),
  };

  function validateData(data) {
    //check trùng id
    for (let i = 0; i < petArr.length; i++) {
      if (data.id === petArr[i].id) {
        alert("ID must unique!");
        return false;
      }
    }
    //check id rỗng
    if (!data.id) {
      alert("Please input for ID");
      return false;
    }
    //check tên rỗng
    else if (!data.name) {
      alert("Please input for name");
      return false;
    }
    //check tuổi
    else if (data.age < 1 || data.age > 15 || !data.age) {
      alert("Age must be between 1 and 15!");
      return false;
    }
    //check loại
    else if (data.type === "Select Type") {
      alert("Please select Type");
      return false;
    }
    //check cân nặng
    else if (data.weight < 1 || data.weight > 15 || !data.weight) {
      alert("Weight must be between 1 and 15!");
      return false;
    }
    //check chiều dài
    else if (data.length < 1 || data.length > 100 || !data.length) {
      alert("Length must be between 1 and 100!");
      return false;
    }
    //check giống loài
    else if (data.breed === "Select Breed") {
      alert("Please select Breed");
      return false;
    } else {
      return true;
    }
  }

  //Thêm thú cưng vào danh sách
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
    clearInput();
  }
});

//Xóa các dữ liệu vừa nhập trên Form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

//Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  let tableBodyEl = document.getElementById("tbody");
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
  <td>${petArr[i].name}</td>
  <td>${petArr[i].age}</td>
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight} kg</td>
  <td>${petArr[i].length} cm</td>
  <td>${petArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td><i class="bi bi-${
    petArr[i].vaccinated ? "check" : "x"
  }-circle-fill"></i></td>
  <td><i class="bi bi-${
    petArr[i].dewormed ? "check" : "x"
  }-circle-fill"></i></td>
  <td><i class="bi bi-${
    petArr[i].sterilized ? "check" : "x"
  }-circle-fill"></i></td>
  <td id="BMI-${i}">?</td>
  <td>${petArr[i].date}</td>
  <td>
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td>
</tr>`;
    tableBodyEl.appendChild(row);
  }
}

//chức năng xóa pet
const deletePet = (petId) => {
  //xác nhận xóa pet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        //xác định vị trí của object trong array
        const deleteId = petArr.map((e) => e.id).indexOf(petId);
        //xóa phần tử
        petArr.splice(deleteId, 1);
      }
    }
    //reset table
    renderTableData(petArr);
    healthyCheck = false;
    btnShowpet.textContent = "Show Healthy Pet";
  }
};

//hiển thị pet đã tiêm phòng đầy đủ
btnShowpet.addEventListener("click", function () {
  healthyCheck = healthyCheck === false ? true : false;
  //đổi nút thành Show All Pet
  if (healthyCheck) {
    btnShowpet.textContent = "Show All Pet";
    //hàm điều kiện cả 3 đều là true
    function createHealthyPet(x) {
      if (x.vaccinated && x.dewormed && x.sterilized) {
        return true;
      }
    }
    //tạo array được filter dựa trên điều kiện
    const healthyPetArr = petArr.filter(createHealthyPet);
    renderTableData(healthyPetArr);
  }
  //ấn lại thì trở về ban đầu
  else {
    btnShowpet.textContent = "Show Healthy Pet";
    renderTableData(petArr);
  }
});

//hàm tính BMI
const calcBMI = (petArr) =>
  petArr.type === "Dog"
    ? Math.round(((petArr.weight * 703) / petArr.length ** 2) * 100) / 100 //làm tròn 2 chữ số thập phân
    : Math.round(((petArr.weight * 886) / petArr.length ** 2) * 100) / 100;

btnCalcBMI.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    const BMIValue = calcBMI(petArr[i]);
    document.getElementById(`BMI-${i}`).textContent = BMIValue;
  }
});
