const currentCityBlock = document.getElementById("currentCity");
const cityArrow = document.getElementById("cityArrow");
const cityDropdown = document.getElementById("cityDropdown");
const selectedCitySpan = document.getElementById("selectedCity");

function toggleDropdown() {
  cityDropdown.classList.toggle("show");

  cityArrow.style.transform = cityDropdown.classList.contains("show")
    ? "rotate(180deg)"
    : "rotate(0deg)";
}

currentCityBlock.addEventListener("click", toggleDropdown);

cityDropdown.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const newCity = event.target.textContent;

    selectedCitySpan.textContent = newCity;

    cityDropdown.classList.remove("show");
    cityArrow.style.transform = "rotate(0deg)";
  }
});

document.addEventListener("click", function (event) {
  if (!currentCityBlock.contains(event.target)) {
    cityDropdown.classList.remove("show");
    cityArrow.style.transform = "rotate(0deg)";
  }
});

// Модальное окно с калькулятором тарифов

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("configModal");
  const closeBtn = document.getElementById("closeModal");
  const overlay = document.getElementById("modalOverlay");

  const cpu = document.getElementById("cpu");
  const ram = document.getElementById("ram");
  const disk = document.getElementById("disk");
  const backup = document.getElementById("backup");
  const ddos = document.getElementById("ddos");
  const support = document.getElementById("support");
  const totalSpan = document.getElementById("totalPrice");

  let basePrice = 250;

  function openModal() {
    modal.classList.add("show");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  function calculatePrice() {
    const cpuPrice = +cpu.value;
    const ramPrice = +ram.value;
    const diskPrice = +disk.value;

    const backupPrice = backup.checked ? +backup.value : 0;
    const ddosPrice = ddos.checked ? +ddos.value : 0;
    const supportPrice = support.checked ? +support.value : 0;

    let total =
      basePrice +
      cpuPrice +
      ramPrice +
      diskPrice +
      backupPrice +
      ddosPrice +
      supportPrice;

    totalSpan.textContent = total + " ₽";
  }

  function setupCalculatorForTariff(tariff) {
    const modalTitle = document.querySelector(".modal__title");

    if (!modalTitle) return;

    switch (tariff) {
      case "virtual":
        modalTitle.textContent = "Настройка виртуального сервера";
        basePrice = 250;
        break;
      case "dedicated":
        modalTitle.textContent = "Настройка выделенного сервера";
        basePrice = 2150;
        break;
      case "colocation":
        modalTitle.textContent = "Настройка размещенного сервера";
        basePrice = 750;
        break;
      default:
        modalTitle.textContent = "Настройка сервера";
        basePrice = 250;
    }

    calculatePrice();
  }

  const detailsBtn = document.querySelectorAll(
    ".server__types-card__more-details",
  );

  detailsBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      const tariffType = this.dataset.tariff;
      setupCalculatorForTariff(tariffType);
      openModal();
    });
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  const calculatorElements = [cpu, ram, disk];

  if (backup) calculatorElements.push(backup);
  if (ddos) calculatorElements.push(ddos);
  if (support) calculatorElements.push(support);

  calculatorElements.forEach((element) => {
    element.addEventListener("change", calculatePrice);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  calculatePrice();
});

// CЛАЙДЕР

document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(
    ".main-hero__slider-container",
  );
  const slides = document.querySelectorAll(".main-hero__slide");
  const dots = document.querySelectorAll(
    ".main-hero__circle-list .circle__list-item",
  );
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlides(index) {
    slides.forEach((slide) => slide.classList.remove("active"));

    dots.forEach((dot) => {
      dot.classList.remove("active");
      dot.classList.remove("circle__list-item-full");
      dot.classList.remove("circle__list-item-empty");
    });

    slides[index].classList.add("active");

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
        dot.classList.add("circle__list-item-full");
      } else {
        dot.classList.add("circle__list-item-empty");
      }
    });

    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";

    prevBtn.style.display = index === 0 ? "none" : "flex";
    nextBtn.style.display = index === totalSlides - 1 ? "none" : "flex";

    sliderContainer.style.transform = `translateX(-${index * 100}%)`;

    currentIndex = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      goToSlides(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      goToSlides(currentIndex + 1);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      goToSlides(index);
    });
  });

  goToSlides(currentIndex);
});
