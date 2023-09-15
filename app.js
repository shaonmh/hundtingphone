const loadPhone = async (search = "sa", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const searchBtn = document.getElementById("search-btn");

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllCont = document.getElementById("show-all-container");
  //display show all button if there are more than 9 phones

  if (phones.length > 9 && !isShowAll) {
    showAllCont.classList.remove("hidden");
  } else {
    showAllCont.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    const phoneBlock = document.createElement("div");
    phoneBlock.classList = "card p-3 bg-green-100 shadow-xl";
    phoneBlock.innerHTML = `<h2 class="text-xl py-5 text-gray-600 text-center">${phone.brand}</h2>
     <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body text-center text-teal-900">
      
      <p >${phone.phone_name}</p>
      <div class="card-actions justify-center">
        <button class="btn border-none bg-red-200 hover:bg-teal-200 text-blue-950" 
        onclick="handleDetails('${phone.slug}')">Show details</button>
         
      </div>
    </div>`;
    phoneContainer.appendChild(phoneBlock);
    spinner(false);
    console.log(phone);
  });
};

const spinner = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

const handleSearch = (isShowAll) => {
  spinner(true);
  let searchInput = document.getElementById("search-input").value;
  console.log(searchInput);
  loadPhone(searchInput, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const details = data.data;

  const detailsModal = document.createElement("div");

  detailsModal.innerHTML = `
  <div class="modal-box">
    <h3 class="font-bold text-lg">${details.name}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
         <button class="btn">Close</button>
      </form>
         </div>
  </div>
`;

  console.log(details);
  const modalContainer = document.getElementById("my_modal_5");
  modalContainer.innerHTML = ``;
  console.log(modalContainer);
  modalContainer.appendChild(detailsModal);
  my_modal_5.showModal();
};

loadPhone();
