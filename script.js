document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("city").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;

  alert(`Searching for:
City: ${city}
Check-in: ${checkin}
Check-out: ${checkout}
Guests: ${guests}`);

  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(city)}&api_key=67f0cca071f2a100007751mjxe80bc7`;

  (async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const location = data[0];
        console.log(`City: ${city}`);
        console.log(`Latitude: ${location.lat}`);
        console.log(`Longitude: ${location.lon}`);
        const latitude = location.lat;
        const longitude = location.lon;
        getDatahotel(latitude, longitude)
      } else {
        console.log('No location found.');
      }
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  })();
});



const getDatahotel = async (latitude, longitude) => {
  document.getElementById("city").value = "";
  document.getElementById("checkin").value = "";
  document.getElementById("checkout").value = "";
  document.getElementById("guests").value = "";
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?children_ages=5%2C0&include_adjacency=true&adults_number=2&checkout_date=2025-09-26&filter_by_currency=INR&checkin_date=2025-09-25&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&units=metric&order_by=popularity&children_number=2&locale=en-gb&page_number=0&room_number=1&latitude=${latitude}&longitude=${longitude}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '58e3d52b82msh903227370fc4f8bp14af6ejsn7ad09c409acc',
      'x-rapidapi-host': 'booking-com.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    container.innerHTML = "";
    if (data.result && data.result.length > 0) {
      data.result.forEach((hotel) => {
        const name = hotel.hotel_name || "Unnamed Hotel";
        const image = hotel.max_photo_url || "https://via.placeholder.com/300x180?text=No+Image";
        const city = hotel.city || "Unknown City";
        const desc = hotel.address || "No description available";
        const price = hotel.price_breakdown.gross_price;
        const id = hotel.hotel_id;
        createCard(name, image, city, desc, price, id);
      });
    }
  } catch (error) {
    console.error(error);
  }
};






const container = document.getElementById("card-container");
const createCard = (name, image, city, desc, price, id) => {


  const card = document.createElement("div");
  card.className = "card";

  const cardImg = document.createElement("div");
  cardImg.className = "card-img";
  cardImg.innerHTML = `<img src="${image}" alt="${name}">`;

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";
  cardContent.innerHTML = `
    <div class="hotel-name">${name}</div>
    <div class="location">${desc}</div>
  `;

  const priceSection = document.createElement("div");
  priceSection.className = "price-section";
  priceSection.innerHTML = `
    <p>Price per night</p>
    <div class="price">${price}</div>
  `;

  const viewBtn = document.createElement("button");
  viewBtn.className = "view-btn";
  viewBtn.dataset.id = id;
  viewBtn.textContent = "View Details";

  priceSection.appendChild(viewBtn);
  card.appendChild(cardImg);
  card.appendChild(cardContent);
  card.appendChild(priceSection);
  container.appendChild(card);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-btn")) {
    const id = e.target.getAttribute("data-id");
    window.location.href = `hotelDetail.html?id=${id}`;
  }
});

