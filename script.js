const cars = [
  {
    id: 'land-cruiser-v8',
    name: 'Toyota Land Cruiser V8',
    shortName: 'Land Cruiser V8',
    model: 'V8 · 4WD',
    category: 'suv',
    tag: 'Safari favourite',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85',
    alt: 'Premium off-road SUV prepared for a safari adventure',
    description: 'A spacious, confident 4×4 built for the long way around. The Land Cruiser V8 makes rough roads, long drives and big safari plans feel a little easier.'
  },
  {
    id: 'land-cruiser-prado',
    name: 'Toyota Land Cruiser Prado',
    shortName: 'Land Cruiser Prado',
    model: 'TX · 4WD',
    category: 'suv',
    tag: 'Made for exploring',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Diesel',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1100&q=85',
    alt: 'Rugged 4x4 SUV on a scenic road',
    description: 'Comfortable and capable in equal measure, the Prado is a favourite for family adventures, safari drives and everything between.'
  },
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    shortName: 'RAV4',
    model: 'Adventure · AWD',
    category: 'suv',
    tag: 'City to country',
    passengers: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1100&q=85',
    alt: 'Modern SUV ready for a road trip',
    description: 'Easy to drive, easy to pack and at home on the city streets or on the way out of town. A versatile companion for a lighter getaway.'
  },
  {
    id: 'noah',
    name: 'Toyota Noah',
    shortName: 'Noah',
    model: 'Family · Spacious',
    category: 'family',
    tag: 'Family favourite',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 230000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1100&q=85',
    alt: 'Comfortable minivan ready for family travel',
    description: 'Room for the family, the bags and a few extra snacks. The Noah makes airport transfers and family road trips feel relaxed.'
  },
  {
    id: 'nissan-patrol',
    name: 'Nissan Patrol',
    shortName: 'Nissan Patrol',
    model: 'Platinum · 4WD',
    category: 'suv',
    tag: 'Big adventure',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 700000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1100&q=85&sat=-35',
    alt: 'Full-size premium 4x4 SUV',
    description: 'Generous space, a smooth ride and a little extra presence. The Patrol is ready for longer distances and itineraries with room to roam.'
  },
  {
    id: 'toyota-hiace',
    name: 'Toyota Hiace',
    shortName: 'Hiace',
    model: 'Tourer · Group travel',
    category: 'van',
    tag: 'Bring everyone',
    passengers: 12,
    transmission: 'Manual',
    fuel: 'Diesel',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?auto=format&fit=crop&w=1100&q=85',
    alt: 'Passenger van for group excursions',
    description: 'Make room for the whole crew. The Hiace is a practical pick for group trips, private tours, transfers and shared adventures.'
  },
  {
    id: 'suzuki-escudo',
    name: 'Suzuki Escudo',
    shortName: 'Escudo',
    model: 'Compact · 4WD',
    category: 'suv',
    tag: 'Easy explorer',
    passengers: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 240000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1100&q=85',
    alt: 'Compact 4x4 for an easygoing road trip',
    description: 'A nimble, capable 4×4 for couples, small groups and spontaneous detours. Just the right size for seeing a little more.'
  }
];

const colors = [
  { name: 'Pearl White', value: '#f1f0eb', light: '#ffffff', dark: '#acada9' },
  { name: 'Glossy Black', value: '#22272a', light: '#6f7778', dark: '#111416' },
  { name: 'Metallic Silver', value: '#9da4a5', light: '#e5e8e7', dark: '#60686b' },
  { name: 'Racing Red', value: '#a93231', light: '#ee6d61', dark: '#762220' },
  { name: 'Ocean Blue', value: '#315b79', light: '#85aac0', dark: '#18364e' },
  { name: 'Forest Green', value: '#46634c', light: '#95ab89', dark: '#263c30' },
  { name: 'Golden Yellow', value: '#d8a931', light: '#f5d774', dark: '#a37418' }
];

const currency = new Intl.NumberFormat('en-TZ', {
  style: 'currency',
  currency: 'TZS',
  currencyDisplay: 'code',
  maximumFractionDigits: 0
});
const carGrid = document.querySelector('#car-grid');
const modelSelect = document.querySelector('#custom-model');
const bookingCar = document.querySelector('#booking-car');
const bookingForm = document.querySelector('#booking-form');
const pickupDate = document.querySelector('#pickup-date');
const returnDate = document.querySelector('#return-date');
const customCar = document.querySelector('#custom-car');
const bookingFeedback = document.querySelector('#booking-feedback');
const contactFeedback = document.querySelector('#contact-feedback');
let selectedColor = colors[0];
let selectedCar = cars[0];

function renderCars(filter = 'all') {
  const visibleCars = filter === 'all' ? cars : cars.filter((car) => car.category === filter);
  carGrid.innerHTML = visibleCars.map((car) => {
    const index = String(cars.indexOf(car) + 1).padStart(2, '0');
    return `
      <article class="car-card">
        <div class="car-image-wrap">
          <img class="car-image" src="${car.image}" alt="${car.alt}" loading="lazy">
          <span class="car-tag">${car.tag}</span><span class="car-index">${index} / 07</span>
        </div>
        <div class="car-body">
          <div class="car-heading"><div><h3>${car.name}</h3><p class="car-subtitle">${car.model}</p></div><div class="car-price">${currency.format(car.price)}<small>PER DAY</small></div></div>
          <div class="car-specs"><span class="car-spec"><span class="spec-icon" aria-hidden="true">♙</span>${car.passengers} passengers</span><span class="car-spec"><span class="spec-icon" aria-hidden="true">⚙</span>${car.transmission}</span><span class="car-spec"><span class="spec-icon" aria-hidden="true">◉</span>${car.fuel}</span></div>
          <div class="car-actions"><button class="details-button" type="button" data-select-car="${car.id}">Customize this car ↗</button><button class="button button-gold select-car-button" type="button" data-select-car="${car.id}">Select this car <span aria-hidden="true">→</span></button></div>
        </div>
      </article>`;
  }).join('');
}

function renderCarOptions() {
  const options = cars.map((car) => `<option value="${car.id}">${car.name} — ${currency.format(car.price)}/day</option>`).join('');
  modelSelect.innerHTML = options;
  bookingCar.insertAdjacentHTML('beforeend', options);
  modelSelect.value = selectedCar.id;
  bookingCar.value = selectedCar.id;
  syncPassengerOptions();
}

function renderColorSwatches() {
  const group = document.querySelector('.color-swatches');
  group.innerHTML = colors.map((color) => `
    <button class="swatch-button${color.name === selectedColor.name ? ' is-selected' : ''}" type="button" style="--swatch:${color.value}" aria-label="${color.name}" aria-pressed="${color.name === selectedColor.name}" title="${color.name}" data-color="${color.name}"></button>
  `).join('');
}

function setCarPaint(color) {
  // Recolor the vector body itself instead of tinting the scenery behind the car.
  customCar.style.setProperty('--car-paint', color.value);
  customCar.style.setProperty('--car-paint-light', color.light);
  customCar.style.setProperty('--car-paint-dark', color.dark);
  document.querySelector('#paint-light-stop').setAttribute('stop-color', color.light);
  document.querySelector('#paint-mid-stop').setAttribute('stop-color', color.value);
  document.querySelector('#paint-dark-stop').setAttribute('stop-color', color.dark);
  document.querySelector('#selected-color-name').textContent = color.name;
  document.querySelector('#selected-color-copy').textContent = color.name;
  document.querySelector('#selected-color-dot').style.setProperty('--swatch-color', color.value);
  document.querySelector('#booking-color-dot').style.setProperty('--swatch-color', color.value);
  document.querySelector('#booking-color-label').textContent = color.name;
  document.querySelector('#booking-color-value').value = color.name;
  document.querySelectorAll('.swatch-button').forEach((button) => {
    const active = button.dataset.color === color.name;
    button.classList.toggle('is-selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('#summary-car-color').textContent = `— ${color.name}`;
}

function syncPassengerOptions() {
  const passengerSelect = document.querySelector('#booking-passengers');
  const previous = Number(passengerSelect.value);
  passengerSelect.innerHTML = '<option value="" disabled selected>Choose passengers</option>';
  for (let count = 1; count <= selectedCar.passengers; count += 1) {
    passengerSelect.insertAdjacentHTML('beforeend', `<option value="${count}">${count} ${count === 1 ? 'passenger' : 'passengers'}</option>`);
  }
  if (previous > 0 && previous <= selectedCar.passengers) passengerSelect.value = String(previous);
  else passengerSelect.value = '';
}

function updateSelectedCar(carId, { syncBooking = true } = {}) {
  const car = cars.find((item) => item.id === carId);
  if (!car) return;
  selectedCar = car;
  modelSelect.value = car.id;
  if (syncBooking) bookingCar.value = car.id;
  document.querySelector('#custom-car-name').textContent = car.name;
  document.querySelector('#custom-car-price').innerHTML = `${currency.format(car.price)} <small>/ DAY</small>`;
  document.querySelector('#preview-model').textContent = car.model.toUpperCase();
  document.querySelector('#model-count').textContent = `${String(cars.indexOf(car) + 1).padStart(2, '0')} / 07`;
  document.querySelector('#selected-car-label').textContent = car.shortName;
  document.querySelector('#car-preview-title').textContent = `${car.name} in ${selectedColor.name}`;
  document.querySelector('#car-preview-description').textContent = `Illustrated live preview of the ${car.name} with a ${selectedColor.name} body finish.`;
  customCar.classList.toggle('is-van', car.category === 'van');
  syncPassengerOptions();
  setCarPaint(selectedColor);
  updateBookingSummary();
}

function getRentalDays() {
  if (!pickupDate.value || !returnDate.value) return 0;
  // Parse date-only values at local midnight to avoid UTC timezone drift.
  const start = new Date(`${pickupDate.value}T00:00:00`);
  const end = new Date(`${returnDate.value}T00:00:00`);
  const days = Math.round((end - start) / 86400000);
  return Number.isFinite(days) && days > 0 ? days : 0;
}

function updateBookingSummary() {
  const days = getRentalDays();
  const passengerCount = document.querySelector('#booking-passengers').value;
  document.querySelector('#summary-car-name').textContent = selectedCar.name;
  document.querySelector('#summary-car-color').textContent = `— ${selectedColor.name}`;
  document.querySelector('#summary-price').textContent = `${currency.format(selectedCar.price)} / day`;
  document.querySelector('#summary-days').textContent = days ? `${days} ${days === 1 ? 'DAY' : 'DAYS'} · ${passengerCount || '—'} ${Number(passengerCount) === 1 ? 'PASSENGER' : 'PASSENGERS'}` : 'ADD YOUR DATES';
  document.querySelector('#summary-total').textContent = days ? currency.format(selectedCar.price * days) : 'TZS —';
  document.querySelector('#summary-period').textContent = days ? `${pickupDate.value} — ${returnDate.value}` : 'Pick your dates to see total';
}

function setDateLimits() {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  pickupDate.min = localToday;
  returnDate.min = pickupDate.value || localToday;
}

function showFeedback(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle('is-error', isError);
  element.classList.add('is-visible');
}

function selectCarForJourney(carId) {
  updateSelectedCar(carId);
  document.querySelector('#customize').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.querySelector('.fleet-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('is-active', chip === button));
  renderCars(button.dataset.filter);
});

document.addEventListener('click', (event) => {
  const selectButton = event.target.closest('[data-select-car]');
  const swatch = event.target.closest('[data-color]');
  const viewButton = event.target.closest('[data-angle]');

  if (selectButton) {
    selectCarForJourney(selectButton.dataset.selectCar);
    return;
  }
  if (swatch) {
    selectedColor = colors.find((color) => color.name === swatch.dataset.color) || selectedColor;
    customCar.classList.add('is-changing');
    setCarPaint(selectedColor);
    window.setTimeout(() => customCar.classList.remove('is-changing'), 230);
    document.querySelector('#car-preview-title').textContent = `${selectedCar.name} in ${selectedColor.name}`;
    return;
  }
  if (viewButton) {
    const view = viewButton.dataset.angle;
    customCar.classList.remove('view-side', 'view-rear');
    if (view !== 'front') customCar.classList.add(`view-${view}`);
    document.querySelectorAll('.view-button').forEach((button) => {
      const active = button === viewButton;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
});

modelSelect.addEventListener('change', () => updateSelectedCar(modelSelect.value));
bookingCar.addEventListener('change', () => updateSelectedCar(bookingCar.value, { syncBooking: false }));
document.querySelector('#booking-passengers').addEventListener('change', updateBookingSummary);
pickupDate.addEventListener('change', () => {
  returnDate.min = pickupDate.value || returnDate.min;
  if (returnDate.value && returnDate.value <= pickupDate.value) returnDate.value = '';
  updateBookingSummary();
});
returnDate.addEventListener('change', updateBookingSummary);

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingFeedback.classList.remove('is-visible', 'is-error');
  if (!bookingForm.reportValidity()) return;
  const days = getRentalDays();
  if (!days) {
    showFeedback(bookingFeedback, 'Choose a return date after your pick-up date to see your journey total.', true);
    return;
  }

  const formData = new FormData(bookingForm);
  const booking = {
    id: `SDTZ-${Date.now()}`,
    name: String(formData.get('name')).trim(),
    email: String(formData.get('email')).trim(),
    phone: String(formData.get('phone')).trim(),
    carId: selectedCar.id,
    carName: selectedCar.name,
    color: selectedColor.name,
    pickupLocation: String(formData.get('pickupLocation')).trim(),
    destination: String(formData.get('destination')).trim(),
    pickupDate: formData.get('pickupDate'),
    returnDate: formData.get('returnDate'),
    passengers: Number(formData.get('passengers')),
    days,
    dailyRate: selectedCar.price,
    total: selectedCar.price * days,
    message: String(formData.get('message')).trim(),
    createdAt: new Date().toISOString()
  };

  try {
    const saved = JSON.parse(localStorage.getItem('safaridrive-tanzania-bookings') || '[]');
    if (!Array.isArray(saved)) throw new Error('Stored bookings are not in the expected format.');
    saved.push(booking);
    localStorage.setItem('safaridrive-tanzania-bookings', JSON.stringify(saved));
  } catch (error) {
    console.error('Unable to save SafariDrive Tanzania booking:', error);
    showFeedback(bookingFeedback, 'We could not save this request in your browser. Check your storage settings and try again.', true);
    return;
  }

  showFeedback(bookingFeedback, `Thanks, ${booking.name}. Your ${booking.color} ${booking.carName} is requested for ${days} ${days === 1 ? 'day' : 'days'} (${currency.format(booking.total)}). This demo saves locally only; contact our team to confirm availability.`);
  bookingForm.reset();
  bookingCar.value = selectedCar.id;
  setCarPaint(selectedColor);
  setDateLimits();
  updateBookingSummary();
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  contactFeedback.classList.remove('is-visible', 'is-error');
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const message = {
    name: String(formData.get('name')).trim(),
    email: String(formData.get('email')).trim(),
    message: String(formData.get('message')).trim(),
    createdAt: new Date().toISOString()
  };

  try {
    const saved = JSON.parse(localStorage.getItem('safaridrive-tanzania-messages') || '[]');
    if (!Array.isArray(saved)) throw new Error('Stored messages are not in the expected format.');
    saved.push(message);
    localStorage.setItem('safaridrive-tanzania-messages', JSON.stringify(saved));
  } catch (error) {
    console.error('Unable to save SafariDrive Tanzania contact message:', error);
    showFeedback(contactFeedback, 'We could not save your note in this browser. You can email jambo@safaridrive.co.tz instead.', true);
    return;
  }

  showFeedback(contactFeedback, 'Thanks for your note. It is saved in this browser demo; nothing is sent to our team. Please email or call us for a reply.');
  form.reset();
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function closeMenu() {
  navMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navMenu.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});
navMenu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  document.querySelector('.site-header').classList.toggle('is-scrolled', window.scrollY > 24);
  backToTop.classList.toggle('is-visible', window.scrollY > 520);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const heroVideo = document.querySelector('.hero-video');
heroVideo.addEventListener('error', () => heroVideo.classList.add('is-unavailable'));
heroVideo.addEventListener('playing', () => heroVideo.classList.remove('is-unavailable'));

function playHeroVideo() {
  if (document.visibilityState !== 'visible') return;
  heroVideo.play().catch(() => heroVideo.classList.add('is-unavailable'));
}

document.addEventListener('visibilitychange', playHeroVideo);
playHeroVideo();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-revealed'));
}

renderCars();
renderCarOptions();
renderColorSwatches();
updateSelectedCar(selectedCar.id);
setDateLimits();
document.querySelector('#current-year').textContent = new Date().getFullYear();
