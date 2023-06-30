// Xử lý header khi cuộn trang
const header = document.querySelector(".header");
const headerLogos = Array.from(header.querySelectorAll(".header-logo"));

window.addEventListener("scroll", () => {
   const isFirstLogoHidden = headerLogos[0].classList.contains("d-none");

   if (window.pageYOffset > 0) {
      if (!header.classList.contains("header--fixed")) {
         header.classList.add("header--fixed");
      }
      header.style.boxShadow = "0 8px 16px rgba(9 , 30 , 66, 0.12)";

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

// Xử lý click, hover, vào header trên từng thiết bị
const navItems = document.querySelectorAll(".nav__item");

// Xử lý hover trên máy tính
if (!isMobileDevice() && !isSafariOnIpad()) {
   for (let navItem of navItems) {
      navItem.addEventListener("mouseenter", () => {
         if (!navItem.classList.contains("hovered")) {
            navItem.classList.add("hovered");
         }
      });

      navItem.addEventListener("mouseleave", () => {
         if (navItem.classList.contains("hovered")) {
            navItem.classList.remove("hovered");
         }
      });
   }
}

// Xử lý click trên điện thoại & Chrome trên iPad & Safari trên iPad
if (isMobileDevice() || isSafariOnIpad()) {
   for (let navItem of navItems) {
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
      });

      // Loại bỏ sự kiện nổi bọt
      // khi click vào navDropdown thì navItem sẽ không toggle nữa
      const navDropdown = navItem.querySelector(".nav__dropdown");
      navDropdown.onclick = function (e) {
         e.stopPropagation();
      };
   }

   // Xử lý sự kiện click trên document để remove class hovered
   document.addEventListener("click", (event) => {
      const isNavItem = !!event.target.closest(".nav__item");
      const isNavDropdown = !!event.target.closest(".nav__dropdown");
      for (let navItem of navItems) {
         if (isNavItem || isNavDropdown) return;
         if (navItem.classList.contains("hovered")) {
            navItem.classList.remove("hovered");
         }
      }
   });
}

// Kiểm tra thiết bị di động
function isMobileDevice() {
   return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      navigator.userAgent
   );
}

// Kiểm tra có phải là Safari trên iPad không
function isSafariOnIpad() {
   var isIpad =
      /Macintosh/.test(navigator.userAgent) && "ontouchend" in document;
   var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
   return isIpad && isSafari;
}

// Xử lý header button (max-width: 767px)
const headerBtn = document.querySelector(".header__btn");
const headerNav = document.querySelector(".header__nav");
const navCloseBtn = document.querySelector(".nav__close-btn");

if (headerBtn && headerNav) {
   headerBtn.onclick = () => {
      if (headerNav.classList.contains("d-none")) {
         headerNav.classList.remove("d-none");
         document.body.style.overflow = "hidden";
      }
   };

   navCloseBtn.onclick = () => {
      headerNav.classList.add("slide-out");
      document.body.style.overflow = "visible";

      setTimeout(() => {
         headerNav.classList.add("d-none");
         headerNav.classList.remove("slide-out");
      }, 220);
   };
}

// Hàm lấy parentElement với selector cụ thể
function getParent(element, selector) {
   do {
      if (element.parentElement && element.parentElement.matches(selector)) {
         return element.parentElement;
      }
      element = element.parentElement;
   } while (element.parentElement !== null);

   return null; // Trả về null nếu không tìm thấy phần tử cha khớp với selector
}

// Xử lý thêm màu nền cho từng broker item
(function () {
   const brokerColors = {
      binance: "#F3BA2F",
      kucoin: "#25AF91",
      huobi: "#2CA6E0",
      exness: "#FFCF03",
      xm: "#DA0001",
      fbs: "#00BE40",
   };
   const brokerItems = Array.from(document.querySelectorAll(".brokers__item"));

   brokerItems.forEach((item) => {
      const windowWidth = window.innerWidth;
      const brokerName = item.className.split(" ").pop();
      const brokerColor = brokerColors[brokerName];

      if (brokerColor) {
         item.style.borderTop = `2px solid ${brokerColor}`;
      }
   });
})();
