// ==UserScript==
// @name         知乎
// @namespace    http://tampermonkey.net/
// @version      2025-07-09
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhihu.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('ContentItem-more')) {
      const contentItem = e.target.closest('.ContentItem');
      if (contentItem) {
        const content = contentItem.querySelector('.RichContent-inner');
        if (content) {
          content.style.maxHeight = 'none'; // Remove the max-height restriction
          content.style.overflow = 'visible'; // Ensure overflow is visible
          e.target.style.display = 'none'; // Hide the "more" button
        }
      }
    }
  });
})();
