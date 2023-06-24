const header = document.querySelector(".header");
const headerLogos = Array.from(header.querySelectorAll(".header-logo"));

// Xử lý header khi cuộn trang
window.addEventListener("scroll", () => {
   const isFirstLogoHidden = headerLogos[0].classList.contains("d-none");

   if (window.pageYOffset > 0) {
      if (!header.classList.contains("header--fixed")) {
         header.classList.add("header--fixed");
      }
      header.style.boxShadow = "0 1px 12px rgba(0 , 0 , 0, 0.1)";

      // Xử lý logo
      if (!isFirstLogoHidden) {
         headerLogos.forEach((logo) => logo.classList.toggle("d-none"));
      }
   } else {
      if (header.classList.contains("header--fixed")) {
         header.classList.remove("header--fixed");
      }
      header.style.boxShadow = "none";

      // Xử lý logo
      if (isFirstLogoHidden) {
         headerLogos.forEach((logo) => logo.classList.toggle("d-none"));
      }
   }
});

// Xử lý click, hover, touch vào header trên từng thiết bị
const navItems = document.querySelectorAll(".nav__item");

// Xử lý hover trên máy tính
if (!isMobileDevice() && !isSafariOnIpad()) {
   setTimeout(() => {
      alert("Đây là máy tính");
   }, 2000);
   for (let navItem of navItems) {
      // const navDropdown = navItem.querySelector(".nav__dropdown");

      navItem.addEventListener("mouseenter", () => {
         if (!navItem.classList.contains("hovered")) {
            navItem.classList.add("hovered");
         }

         // if (navDropdown && !navDropdown.classList.contains("hovered")) {
         //    navDropdown.classList.add("hovered");
         // }
      });

      navItem.addEventListener("mouseleave", () => {
         if (navItem.classList.contains("hovered")) {
            navItem.classList.remove("hovered");
         }

         // if (navDropdown && navDropdown.classList.contains("hovered")) {
         //    navDropdown.classList.remove("hovered");
         // }
      });
   }
}

// Xử lý click trên điện thoại & Chrome trên iPad
if (isMobileDevice()) {
   setTimeout(() => {
      alert("Đây là điện thoại");
   }, 2000);

   for (let navItem of navItems) {
      // const navDropdown = navItem.querySelector(".nav__dropdown");

      navItem.addEventListener("click", () => {
         for (let otherNavItem of navItems) {
            if (
               otherNavItem !== navItem &&
               otherNavItem.classList.contains("hovered")
            ) {
               otherNavItem.classList.remove("hovered");
            }
         }

         navItem.classList.toggle("hovered");

         // if (navDropdown) {
         //    navDropdown.classList.toggle("hovered");
         // }
      });
   }
}

// Kiểm tra thiết bị di động
function isMobileDevice() {
   return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      navigator.userAgent
   );
}

// Xử lý touch trên iPad Safari
if (isSafariOnIpad()) {
   setTimeout(() => {
      alert("Đây là Safari trên iPad");
   }, 2000);

   for (let navItem of navItems) {
      // const navDropdown = navItem.querySelector(".nav__dropdown");

      navItem.addEventListener("touchend", () => {
         for (let otherNavItem of navItems) {
            if (
               otherNavItem !== navItem &&
               otherNavItem.classList.contains("hovered")
            ) {
               otherNavItem.classList.remove("hovered");
            }
         }

         navItem.classList.toggle("hovered");

         // if (navDropdown) {
         //    navDropdown.classList.toggle("hovered");
         // }
      });
   }
}

// Kiểm tra có phải là Safari trên iPad không
function isSafariOnIpad() {
   var isIpad =
      /Macintosh/.test(navigator.userAgent) && "ontouchend" in document;
   var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
   return isIpad && isSafari;
}
