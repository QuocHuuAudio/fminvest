const header = document.getElementById("header");
const footer = document.getElementById("footer");

const fetchContent = (url) => {
   return fetch(url).then((response) => {
      if (!response.ok) {
         throw new Error(
            `Error loading ${url}: ${response.status} ${response.statusText}`
         );
      }
      return response.text();
   });
};

Promise.all([
   fetchContent(".../html-component/header.html"),
   fetchContent(".../html-component/footer.html"),
])
   .then(([headerContent, footerContent]) => {
      header.innerHTML = headerContent;
      footer.innerHTML = footerContent;

      // Nạp tệp header.js sau khi header.html đã được chèn vào
      const scriptElement = document.createElement("script");
      scriptElement.src = "/assets/js/header.js";
      document.body.appendChild(scriptElement);
   })
   .catch((error) => {
      console.error("Error loading content:", error);
   });
