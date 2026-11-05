const cars = [
  {
    id: 'land-cruiser',
    name: 'Toyota Land Cruiser',
    model: 'Hardtop · 4x4',
    category: 'suv',
    tag: 'Safari favourite',
    passengers: 7,
    transmission: 'Manual',
    fuel: 'Diesel',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Toyota-style off-road 4x4 ready for a safari',
    description: 'Built for wide-open landscapes and the road less travelled. This capable 4x4 brings space, comfort and confidence to every safari.'
  },
  {
    id: 'rav4',
    name: 'Toyota RAV4',
    model: 'Adventure · AWD',
    category: 'suv',
    tag: 'City to country',
    passengers: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 14000,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=85',
    alt: 'Modern SUV parked on a scenic road',
    description: 'An easygoing, comfortable SUV for a city break, a weekend away or a little of both. Room for your crew and everything you need to bring.'
  },
  {
    id: 'noah',
    name: 'Toyota Noah',
    model: 'Family · Spacious',
    category: 'family',
    tag: 'Family ready',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85',
    alt: 'Spacious family vehicle on the road',
    description: 'A practical, roomy choice for families and small groups. Settle in, stretch out and enjoy an easy ride around town or out of it.'
  },
  {
    id: 'patrol',
    name: 'Nissan Patrol',
    model: 'Premium · 4x4',
    category: 'suv',
    tag: 'Go anywhere',
    passengers: 7,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85',
    alt: 'Premium 4x4 for an off-road adventure',
    description: 'A premium full-size 4x4 that pairs a commanding ride with generous space. A great companion for longer trips and bigger adventures.'
  },
  {
    id: 'hiace',
    name: 'Toyota Hiace',
    model: 'Group travel · Van',
    category: 'van',
    tag: 'Room for everyone',
    passengers: 12,
    transmission: 'Manual',
    fuel: 'Diesel',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?auto=format&fit=crop&w=1000&q=85',
    alt: 'Passenger van for group travel',
    description: 'Bring the whole group along. With room for passengers and luggage, the Hiace is a dependable pick for transfers, tours and group trips.'
  },
  {
    id: 'escudo',
    name: 'Suzuki Escudo',
    model: 'Compact · 4x4',
    category: 'suv',
    tag: 'Easy explorer',
    passengers: 5,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85',
    alt: 'Compact SUV ready for a road trip',
    description: 'Compact, capable and easy to drive, the Escudo is a great fit for everyday exploring and those scenic detours you did not plan.'
  }
];

const money = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', currencyDisplay: 'code', maximumFractionDigits: 0 });
const carGrid = document.querySelector('#car-grid');
const bookingCar = document.querySelector('#booking-car');
const bookingForm = document.querySelector('#booking-form');
const pickupDate = document.querySelector('#pickup-date');
const returnDate = document.querySelector('#return-date');
const estimateTotal = document.querySelector('#estimate-total');
const bookingFeedback = document.querySelector('#booking-feedback');
const contactFeedback = document.querySelector('#contact-feedback');
const carDialog = document.querySelector('#car-dialog');

function renderCars(filter = 'all') {
  const visibleCars = filter === 'all' ? cars : cars.filter((car) => car.category === filter);
  carGrid.innerHTML = visibleCars.map((car) => `
    <article class="car-card">
      <div class="car-image-wrap">
        <img class="car-image" src="${car.image}" alt="${car.alt}" loading="lazy">
        <span class="car-tag">${car.tag}</span>
      </div>
      <div class="car-body">
        <div class="car-heading">
          <div><h3>${car.name}</h3><p class="car-subtitle">${car.model}</p></div>
          <div class="car-price">${money.format(car.price)}<small>per day</small></div>
        </div>
        <div class="car-specs">
          <span class="car-spec"><span class="spec-icon" aria-hidden="true">♙</span>${car.passengers} passengers</span>
          <span class="car-spec"><span class="spec-icon" aria-hidden="true">⚙</span>${car.transmission}</span>
          <span class="car-spec"><span class="spec-icon" aria-hidden="true">◉</span>${car.fuel}</span>
        </div>
        <div class="car-actions">
          <button class="details-button" type="button" data-details="${car.id}">View details ↗</button>
          <a class="button button-primary book-car-button" href="#booking" data-book="${car.id}">Book this car <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
  `).join('');
}

function populateCarOptions() {
  bookingCar.insertAdjacentHTML('beforeend', cars.map((car) =>
    `<option value="${car.id}">${car.name} — ${money.format(car.price)}/day</option>`
  ).join(''));
}

function showFeedback(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle('is-error', isError);
  element.classList.add('is-visible');
}

function getRentalDays() {
  if (!pickupDate.value || !returnDate.value) return 0;
  const start = new Date(`${pickupDate.value}T00:00:00`);
  const end = new Date(`${returnDate.value}T00:00:00`);
  const difference = Math.round((end - start) / 86400000);
  return Number.isFinite(difference) && difference > 0 ? difference : 0;
}

function updateEstimate() {
  const car = cars.find((item) => item.id === bookingCar.value);
  const days = getRentalDays();
  estimateTotal.textContent = car && days ? `${money.format(car.price * days)} · ${days} ${days === 1 ? 'day' : 'days'}` : 'Choose a car and dates';
  return { car, days };
}

function setDateLimits() {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  pickupDate.min = localToday;
  returnDate.min = pickupDate.value || localToday;
}

function openCarDetails(carId) {
  const car = cars.find((item) => item.id === carId);
  if (!car) return;
  document.querySelector('#dialog-content').innerHTML = `
    <img class="dialog-image" src="${car.image}" alt="${car.alt}">
    <div class="dialog-body">
      <p class="eyebrow">${car.tag}</p>
      <h2 id="dialog-title">${car.name}</h2>
      <p>${car.description}</p>
      <div class="car-specs">
        <span class="car-spec">${car.passengers} passengers</span>
        <span class="car-spec">${car.transmission}</span>
        <span class="car-spec">${car.fuel}</span>
        <span class="car-spec">${money.format(car.price)} / day</span>
      </div>
      <a class="button button-primary dialog-book" href="#booking" data-book="${car.id}">Book this car <span aria-hidden="true">↗</span></a>
    </div>`;
  carDialog.showModal();
}

document.querySelector('.fleet-filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  document.querySelectorAll('.filter-chip').forEach((chip) => chip.classList.toggle('is-active', chip === button));
  renderCars(button.dataset.filter);
});

document.addEventListener('click', (event) => {
  const detailsButton = event.target.closest('[data-details]');
  const bookButton = event.target.closest('[data-book]');
  if (detailsButton) openCarDetails(detailsButton.dataset.details);
  if (bookButton) {
    const car = cars.find((item) => item.id === bookButton.dataset.book);
    if (car) {
      bookingCar.value = car.id;
      updateEstimate();
      carDialog.close();
    }
  }
});

document.querySelector('.dialog-close').addEventListener('click', () => carDialog.close());
carDialog.addEventListener('click', (event) => {
  if (event.target === carDialog) carDialog.close();
});

pickupDate.addEventListener('change', () => {
  returnDate.min = pickupDate.value || pickupDate.min;
  if (returnDate.value && returnDate.value <= pickupDate.value) returnDate.value = '';
  updateEstimate();
});
returnDate.addEventListener('change', updateEstimate);
bookingCar.addEventListener('change', updateEstimate);

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingFeedback.classList.remove('is-visible', 'is-error');
  if (!bookingForm.reportValidity()) return;
  const { car, days } = updateEstimate();
  if (!car || !days) {
    showFeedback(bookingFeedback, 'Please choose a vehicle and a return date after your pickup date.', true);
    return;
  }

  const formData = new FormData(bookingForm);
  const booking = {
    id: `SD-${Date.now()}`,
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    phone: formData.get('phone').trim(),
    carId: car.id,
    carName: car.name,
    pickupLocation: formData.get('pickupLocation').trim(),
    dropoffLocation: formData.get('dropoffLocation').trim(),
    pickupDate: formData.get('pickupDate'),
    returnDate: formData.get('returnDate'),
    days,
    total: car.price * days,
    message: formData.get('message').trim(),
    createdAt: new Date().toISOString()
  };

  try {
    const bookings = JSON.parse(localStorage.getItem('safaridrive-bookings') || '[]');
    if (!Array.isArray(bookings)) throw new Error('Stored bookings are not in the expected format.');
    bookings.push(booking);
    localStorage.setItem('safaridrive-bookings', JSON.stringify(bookings));
  } catch (error) {
    console.error('Unable to save SafariDrive booking:', error);
    showFeedback(bookingFeedback, 'We could not save your booking on this device. Please check your browser storage settings and try again.', true);
    return;
  }

  showFeedback(bookingFeedback, `Thanks, ${booking.name}! Your ${car.name} request for ${days} ${days === 1 ? 'day' : 'days'} (${money.format(booking.total)}) is saved on this device. This demo does not send bookings to SafariDrive; contact us to confirm availability.`);
  bookingForm.reset();
  setDateLimits();
  updateEstimate();
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  contactFeedback.classList.remove('is-visible', 'is-error');
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const message = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    message: formData.get('message').trim(),
    createdAt: new Date().toISOString()
  };

  try {
    const messages = JSON.parse(localStorage.getItem('safaridrive-messages') || '[]');
    if (!Array.isArray(messages)) throw new Error('Stored messages are not in the expected format.');
    messages.push(message);
    localStorage.setItem('safaridrive-messages', JSON.stringify(messages));
  } catch (error) {
    console.error('Unable to save SafariDrive contact message:', error);
    showFeedback(contactFeedback, 'We could not save your message on this device. Please email hello@safaridrive.co.ke instead.', true);
    return;
  }

  showFeedback(contactFeedback, 'Thanks for reaching out. Your message is saved on this device. This demo does not send messages to SafariDrive; please email us directly.');
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
  if (window.innerWidth > 900) closeMenu();
});

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 500);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-revealed'));
}

populateCarOptions();
renderCars();
setDateLimits();
document.querySelector('#current-year').textContent = new Date().getFullYear();
