//global variables
const sectionCircles = document.querySelector("section.circles");
const sectionAboutMe = document.querySelector("section.about-me");
const sectionMyWork = document.querySelector("section.my-work");

const bubbles = () => {
  const colors = ["#B0EEE3", "#EEF0B1", "#F4B4B1", "#A4A4E4", "#EED1A9"];
  const maxNumberOfBubblesToDisplay = 8;
  const marksContainer = document.querySelector(".marks-container");

  let myTimeot;

  sectionCircles.addEventListener("mousemove", (e) => {
    if (document.documentElement.scrollTop <= sectionCircles.offsetHeight / 3) {
      clearTimeout(myTimeot);
      myTimeot = setTimeout(function () {
        createBubble(e);
        removeBubble();
      }, 300);
    }
  });

  function createBubble(e) {
    const size = Math.floor(Math.random() * (260 - 120) + 120);
    let bubble = `<div style="left:${e.layerX}px; top:${
      e.layerY
    }px" class="mark mark-${Math.floor(Math.random() * (7 - 1) + 1)}">
      <div class="mark-outer">
        <div class="mark-inner" style="background-color:${
          colors[Math.floor(Math.random() * colors.length)]
        }; width:${size}px; height:${size}px;"></div>
      </div>
    </div>`;

    marksContainer.insertAdjacentHTML("beforeend", bubble);
  }

  function removeBubble() {
    const bubbles = document.querySelectorAll(".marks-container .mark");
    if (bubbles.length && bubbles.length > maxNumberOfBubblesToDisplay) {
      const numberOfBubblesToRemove =
        bubbles.length - maxNumberOfBubblesToDisplay;

      for (let i = 0; i < numberOfBubblesToRemove; i++) {
        if (!bubbles[i].classList.contains("out")) {
          bubbles[i].classList.add("out");

          setTimeout(function () {
            bubbles[i].remove();
          }, 5000);
        }
      }
    }
  }
};

const changeBubblesOpcaityOnScroll = () => {
  document.addEventListener("scroll", function (e) {
    const bubbles = document.querySelectorAll(".marks-container .mark");

    if (document.documentElement.scrollTop > sectionCircles.offsetHeight / 3) {
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].style.opacity = 0;
      }
    } else {
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].style.opacity = 1;
      }
    }
  });
};

const startLandingPage = () => {
  const texts = ["Move mouse to begin"];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";
  let buttonHTML = `<span class="arrow-bg"><img src="assets/arrow-down-solid.svg" alt="arrow-icon"/></span>`;
  const placeForTypingText = document.querySelector(".typing");

  (function typing() {
    if (count === texts.length) {
      count = 0;
    }

    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    placeForTypingText.textContent = letter;

    const timeoutId = setTimeout(typing, 100);

    if (letter.length === currentText.length) {
      letter = texts[0];
      clearTimeout(timeoutId);
      placeForTypingText.insertAdjacentHTML("beforeend", buttonHTML);
      placeForTypingText.classList.remove("typing");
    }
  })();
};

const showLandingItems = () => {
  const bubbles = document.querySelectorAll(".marks-container .mark");
  const noneVisibleElements = document.querySelectorAll(
    ".landing-info .d-none"
  );

  if (noneVisibleElements) {
    for (let i = 0; i < noneVisibleElements.length; i++) {
      noneVisibleElements[i].classList.remove("d-none");
    }
    const sectionSwitcher = document.querySelector(".section-switcher.v-none");
    sectionSwitcher.classList.remove("v-none");
  }
};

const sectionSwitcher = () => {
  const sections = document.querySelectorAll("section");
  const sectionMarks = document.querySelectorAll(
    ".section-switcher .section-mark"
  );

  document.addEventListener("scroll", function (e) {
    for (let i = 0; i < sections.length; i++) {
      if (canSwitchSectionMark(sections[i])) {
        for (let j = 0; j < sectionMarks.length; j++) {
          sectionMarks[j].classList.remove("active");
        }

        if (!sectionMarks[i].classList.contains("active")) {
          sectionMarks[i].classList.add("active");
        }
      }
    }
  });
};

const canSwitchSectionMark = (elem) => {
  var distance = elem.getBoundingClientRect();
  return (
    distance.bottom - 200 <=
    (window.innerHeight || document.documentElement.clientHeight)
  );
};

const aboutMeSlider = () => {
  const sliderItems = sectionAboutMe.querySelectorAll(".slider-item");
  const paging = sectionAboutMe.querySelector(".paging");
  let sliderIntervalID;
  let currentIndex = 0;
  const sliderLength = sliderItems.length;

  //add paging items
  for (let i = 0; i < sliderLength; i++) {
    const pagingItem = document.createElement("div");
    pagingItem.dataset.index = i;

    if (i === 0) {
      //add active class to the first
      pagingItem.className = "paging-dot active";
    } else {
      pagingItem.className = "paging-dot";
    }

    pagingItem.addEventListener("click", function () {
      for (let i = 0; i < sliderLength; i++) {
        sliderItems[i].classList.remove("visible");
        paging.querySelectorAll(".paging-dot")[i].classList.remove("active");
      }
      currentIndex = parseInt(this.dataset.index);
      this.classList.add("active");
      sliderItems[currentIndex].classList.add("visible");
      clearInterval(sliderIntervalID);
      sliderInterval();
    });

    paging.appendChild(pagingItem);
  }

  const pagingDots = paging.querySelectorAll(".paging-dot");

  const sliderInterval = () => {
    sliderIntervalID = setInterval(() => {
      for (let i = 0; i < sliderLength; i++) {
        if (sliderItems[i].classList.contains("visible")) {
          sliderItems[i].classList.remove("visible");
          pagingDots[i].classList.remove("active");
        }
      }

      if (currentIndex === sliderLength - 1) {
        currentIndex = 0;
      } else {
        currentIndex += 1;
      }
      sliderItems[currentIndex].classList.add("visible");
      pagingDots[currentIndex].classList.add("active");
    }, 3000);
  };

  sliderInterval();
};

const myWorkPaging = () => {
  const paging = sectionMyWork.querySelector(".paging");
  const myWorkPages = sectionMyWork.querySelectorAll(".my-work-wrapper");
  //add paging items
  for (let i = 0; i < myWorkPages.length; i++) {
    const pagingItem = document.createElement("div");
    pagingItem.dataset.index = i;

    if (i === 0) {
      //add active class to the first
      pagingItem.className = "paging-dot active";
    } else {
      pagingItem.className = "paging-dot";
    }

    pagingItem.addEventListener("click", function () {
      for (let i = 0; i < myWorkPages.length; i++) {
        myWorkPages[i].classList.remove("visible");
        paging.querySelectorAll(".paging-dot")[i].classList.remove("active");
      }
      this.classList.add("active");
      myWorkPages[parseInt(this.dataset.index)].classList.add("visible");
    });

    paging.appendChild(pagingItem);
  }
};

// const controller = new ScrollMagic.Controller();
// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 3000,
//   triggerHook: 0,
// })
//   .setPin(".about-me")
//   .addTo(controller);

// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 600,
//   offset: 0,
//   triggerHook: 0,
// })
//   .setClassToggle("#p1", "active")
//   .addTo(controller);

// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 600,
//   offset: 600,
//   triggerHook: 0,
// })
//   .setClassToggle("#p2", "active")
//   .addTo(controller);

// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 600,
//   offset: 1200,
//   triggerHook: 0,
// })
//   .setClassToggle("#p3", "active")
//   .addTo(controller);

// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 600,
//   offset: 1800,
//   triggerHook: 0,
// })
//   .setClassToggle("#p4", "active")
//   .addTo(controller);

// new ScrollMagic.Scene({
//   triggerElement: ".about-me",
//   duration: 600,
//   offset: 2400,
//   triggerHook: 0,
// })
//   .setClassToggle("#p5", "active")
//   .addTo(controller);

startLandingPage();
showLandingItems();
bubbles();
changeBubblesOpcaityOnScroll();
sectionSwitcher();
aboutMeSlider();
myWorkPaging();
