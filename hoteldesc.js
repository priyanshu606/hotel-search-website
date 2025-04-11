const hotelData = async (hotelId)=>{
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/data?hotel_id=${hotelId}&locale=en-gb`;
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
        const container = document.getElementById("hotelHeader");
       container.innerHTML = `
      <div class="location">
      <h2 class="hotel-name">${data.name}</h2>  
       <img class="location-img" src = "location.png"></img>
     ${data.address}, ${data.city}, ${data.country_trans} -
    <a href="#">Excellent location - show map</a>
  </div>
  <div class="stars">
    <h2 class = "hotel-rating"> Rating </h2>
    ${getStarRatingHTML(data.review_score)}
  </div>
`;
    
      } catch (error) {
        console.error("Error fetching hotel info", error);
      }
    };
    function getStarRatingHTML(review_score) {
        const rating = (review_score)/2;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
      
        let starsHTML = "★".repeat(fullStars);
        if (hasHalfStar) {
          starsHTML += "½";  // you can also use a custom icon
        }
      
        return starsHTML;
      }






const images = async (hotelId) => {
  const url = `https://booking-com.p.rapidapi.com/v1/hotels/photos?hotel_id=${hotelId}&locale=en-gb`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '58e3d52b82msh903227370fc4f8bp14af6ejsn7ad09c409acc',
      'x-rapidapi-host': 'booking-com.p.rapidapi.com'
    }
  };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        const gallery = document.getElementById("gallery");

        // Only show 5 images initially
        const imagesToShow = result.slice(0, 5);

   imagesToShow.forEach((imgData, index) => {
  const imgWrapper = document.createElement("div");
  imgWrapper.className = `img-box img-${index + 1}`;

  const img = document.createElement("img");
  img.src = imgData.url_max;
  img.alt = `Hotel Image ${index + 1}`;
  img.className = "gallery-img";

  // Last image: overlay with "+X photos"
  if (index === 4) {
    const overlay = document.createElement("div");
    overlay.className = "overlay-text";
    overlay.textContent = `+${result.length - 4} photos`;
    imgWrapper.appendChild(overlay);
  }

  imgWrapper.appendChild(img);
  gallery.appendChild(imgWrapper);
});

// Modal open logic
gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }
});

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("imageModal").style.display = "none";
});

    } catch (error) {
        console.error(error);
        document.getElementById("gallery").innerHTML = "<p>Failed to load images</p>";
    }
};



const hotelDesc = async (hotelId)=>{

  const url = `https://booking-com.p.rapidapi.com/v1/hotels/description?locale=en-gb&hotel_id=${hotelId}`;
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
  
      const aboutDiv = document.getElementById("hotelAboutSection");
  

      aboutDiv.innerHTML = `
        <h1 class="about-heading"> Hotel Description : -</h1>
         <h2 class="about-heading">Get the celebrity treatment with world-class service at ${data.name || 'this hotel'}</h2>
       <p class="about-para">${data.description || "No description available."}</p>
    `;
    } catch (err) {
      console.error("Error loading hotel description:", err);
    }
  }
  

  const hotelFacility = async (hotelId)=>{
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/facilities?locale=en-gb&hotel_id=${hotelId}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '58e3d52b82msh903227370fc4f8bp14af6ejsn7ad09c409acc',
		'x-rapidapi-host': 'booking-com.p.rapidapi.com'
	}
};
    try {
        const response = await fetch(url, options);
        const facilities = await response.json();
        console.log(facilities);
        const container = document.getElementById("facilityList");
    
        facilities.slice(0, 10).forEach(facility => {
          const item = document.createElement("div");
          item.className = "facility-item";
    
          // You can replace emoji based on facility type if you want
          const icon = document.createElement("div");
          icon.className = "facility-icon";
          icon.textContent = "🔹"; // default emoji, or map facility.facilitytype_name to emoji/icon
    
          const name = document.createElement("div");
          name.className = "facility-name";
          name.textContent = facility.facility_name;
    
          item.appendChild(icon);
          item.appendChild(name);
          container.appendChild(item);
        });
    
      } catch (error) {
        console.error("Failed to load facilities:", error);
      }
  }

  const hotelMap = async (hotelId)=>{
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/map-markers?locale=en-gb&hotel_id=${hotelId}`;
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
     
      // Access the static map URL
      const mapUrl = data.map_preview_url;
      document.getElementById("mapPreview").src = mapUrl;
  
    } catch (error) {
      console.error("Error fetching map preview:", error);
    }
  }
  


const init = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = parseInt(urlParams.get("id"));

  if (!hotelId) {
    console.error("Hotel ID is missing in the URL");
    return;
  }

  hotelData(hotelId);
  images(hotelId);
  hotelDesc(hotelId);
  hotelFacility(hotelId);
  hotelMap(hotelId);
};

init();








  

  
  

  
  