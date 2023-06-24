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

// Xử lý click và hover vào header cho từng thiết bị
const navItems = document.querySelectorAll(".nav__item");

// Xử lý hiệu ứng hover trên máy tính
if (!isMobileDevice()) {
   for (let navItem of navItems) {
      const navDropdown = navItem.querySelector(".nav__dropdown");

      navItem.addEventListener("mouseenter", () => {
         if (!navItem.classList.contains("hovered")) {
            navItem.classList.add("hovered");
         }

         if (navDropdown && !navDropdown.classList.contains("hovered")) {
            navDropdown.classList.add("hovered");
         }
      });

      navItem.addEventListener("mouseleave", () => {
         if (navItem.classList.contains("hovered")) {
            navItem.classList.remove("hovered");
         }

         if (navDropdown && navDropdown.classList.contains("hovered")) {
            navDropdown.classList.remove("hovered");
         }
      });
   }
}

// Xử lý hiệu ứng click trên điện thoại di động
if (isMobileDevice() || isIpadOS()) {
   for (let navItem of navItems) {
      const navDropdown = navItem.querySelector(".nav__dropdown");

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

         if (navDropdown) {
            navDropdown.classList.toggle("hovered");
         }
      });
   }
}

// Kiểm tra thiết bị di động
function isMobileDevice() {
   return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      navigator.userAgent.toLowerCase()
   );
}

// Kiểm tra iPad
function isIpadOS() {
   return (
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform)
   );
}
