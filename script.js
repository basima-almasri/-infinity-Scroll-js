// const imageContainner = document.querySelector(".image-container");

// let imagesLoaded = 0;
// let ready = false;
// let totalImages = 0;
// const loadImage = () => {
//   console.log("imagesLoaded", imagesLoaded, ready);
//   imagesLoaded++;
//   console.log({ imagesLoaded, totalImages });
//   if (imagesLoaded === totalImages) {
//     ready = true;

//     console.log("ready", ready);
//   }
// };
// const fetchData = async () => {
//   const response = await axios.get(URL_API, {
//     params: {
//       client_id: "y6AdS53_7A2n6a9-h0pGRkMspPEgQ1TPWXkPV8nOFJg",
//       count: 10,
//     },
//   });
//   if (response.data.error) return [];
//   return response.data;
// };
// const displayPhoto = (arrPhoto) => {
//   totalImages += arrPhoto.length;
//   console.log(totalImages);
//   arrPhoto.forEach((photo) => {
//     const option = document.createElement("a");
//     option.href = `${photo.links.html}`;
//     option.innerHTML = `
//     <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
//     </a>
//     `;
//     const img = option.querySelector("img");
//     img.addEventListener("load", loadImage);
//     imageContainner.appendChild(option);
//   });
// };
// const getPhoto = async () => {
//   const arrayPhoto = await fetchData();

//   displayPhoto(arrayPhoto);
// };

// window.addEventListener("scroll", () => {
//   if (
//     window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
//     ready
//   ) {
//     ready = false;

//     getPhoto();
//   }
// });

// getPhoto();
const API_URL = "https://api.unsplash.com";
const CLIENT_ID = "y6AdS53_7A2n6a9-h0pGRkMspPEgQ1TPWXkPV8nOFJg";
const IMAGE_CONTAINER = document.querySelector(".image-container");

let page = 1;
let isFetching = false;

const fetchData = async (page) => {
  try {
    const response = await fetch(
      `${API_URL}/photos?client_id=${CLIENT_ID}&page=${page}&per_page=10`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const displayPhotos = (photos) => {
  photos.forEach((photo) => {
    const link = document.createElement("a");
    link.href = photo.links.html;
    link.innerHTML = `
      <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
    `;
    IMAGE_CONTAINER.appendChild(link);
  });
};

const handleScroll = async () => {
  if (
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
    !isFetching
  ) {
    console.log("isFetching", isFetching);
    isFetching = true;
    const photos = await fetchData(++page);
    displayPhotos(photos);
    isFetching = false;
  }
};

window.addEventListener("scroll", handleScroll);

(async () => {
  const photos = await fetchData(page);
  displayPhotos(photos);
})();
