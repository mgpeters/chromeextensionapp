// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


chrome.storage.sync.get('color', (data) => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = (element) => {
  const color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // let allFeed = document.body.getElementsByTagName('div');
    // console.log(allFeed);
    chrome.tabs.executeScript({
      code: `
        const filterObj = {
        the: true,
        i: true,
        };

      let allFeed = document.querySelectorAll(".userContentWrapper");

      const searchWords = (allFeeds) => {
        allFeeds.forEach((element) => {
          const textArray = element.textContent.toLowerCase().split(' ');
          console.log(textArray);
          textArray.forEach((word) => {
            if (filterObj[word]) {
              element.style.display = 'none';
            }
          });
        })
      }

      searchWords(allFeed);`}
    );
  });
};

// document.getElementById('contentArea').addEventListener('click', () => {
//     console.log("Popup DOM fully loaded and parsed");

//     function modifyDOM() {
//         //You can play with your DOM here or check URL against your regex
//         console.log('Tab script:');
//         console.log(document.body);
//         return document.body.innerHTML;
//     }

//     //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
//     chrome.tabs.executeScript({
//         code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
//       }, (results) => {
//         //Here we have just the innerHTML and not DOM structure
//         console.log('Popup script:')
//         console.log(results[0]);
//     });
// });