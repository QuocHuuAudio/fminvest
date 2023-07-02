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
      const brokerName = item.className.split(" ").pop();
      const brokerColor = brokerColors[brokerName];

      if (brokerColor) {
         item.style.borderTop = `2px solid ${brokerColor}`;
      }
   });
})();
