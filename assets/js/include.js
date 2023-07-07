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

const baseHref = location.href.split("/").slice(0, -1).join("/");
const headerPath = `${baseHref}/html-component/header.html`;
const footerPath = `${baseHref}/html-component/footer.html`;

Promise.all([fetchContent(headerPath), fetchContent(footerPath)])
   .then(([headerContent, footerContent]) => {
      header.innerHTML = headerContent;
      footer.innerHTML = footerContent;

      // Nạp tệp header.js sau khi header.html đã được chèn vào
      const scriptElement = document.createElement("script");
      scriptElement.src = ".../assets/js/header.js";
      document.body.appendChild(scriptElement);
   })
   .catch((error) => {
      console.error("Error loading content:", error);
   });
