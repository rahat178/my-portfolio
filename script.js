/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
      "number": {
          "value": 70,
          "density": {
              "enable": true,
              "value_area": 700
          }
      },
      "color": {
          "value": "#DA0037"
      },
      "shape": {
          "type": "circle",
          "stroke": {
              "width": 0,
              "color": "#000000"
          },
          "polygon": {
              "nb_sides": 5
          },
          "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
          }
      },
      "opacity": {
          "value": 0.7,
          "random": false,
          "anim": {
              "enable": false,
              "speed": 0.5,
              "opacity_min": 0.1,
              "sync": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
          }
      },
      "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
      },
      "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
          }
      }
  },
  "interactivity": {
      "detect_on": "canvas",
      "events": {
          "onhover": {
              "enable": true,
              "mode": "grab"
          },
          "onclick": {
              "enable": true,
              "mode": "push"
          },
          "resize": true
      },
      "modes": {
          "grab": {
              "distance": 140,
              "line_linked": {
                  "opacity": 1
              }
          },
          "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
          },
          "repulse": {
              "distance": 200,
              "duration": 0.4
          },
          "push": {
              "particles_nb": 4
          },
          "remove": {
              "particles_nb": 2
          }
      }
  },
  "retina_detect": true
});

//BUBBLE

function createBubble() {
  const bubbles = document.querySelector('.bubbles');
  const createElement = document.createElement('span');
  let size = Math.random() * 50;


  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";
  createElement.style.left = Math.random() * innerWidth + "px";
  bubbles.appendChild(createElement);

  setTimeout(() => {
      createElement.remove()
  }, 4000)
}
setInterval(createBubble, 50);

//LOGO

let logo = document.querySelector("#logo");
let logoArray = ["IMG64.JPG",
  "IMG65.JPG",
  "IMG66.JPG",
  "IMG67.JPG",
  "IMG68.JPG",
  "IMG69.JPG",
  "IMG70.JPG"
];
let b = 0;
logo.addEventListener("mouseenter", () => {
  b++;
  if (b > logoArray.length - 1) {
      b = 0
  }
  document.querySelector('#logo').src = logoArray[b];
});
logo.addEventListener("click", () => {
  b++;
  if (b > logoArray.length - 1) {
      b = 0
  }
  document.querySelector('#logo').src = logoArray[b];
});

//TEXT-ROTATE
let txtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

txtRotate.prototype.tick = function() {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrapp">' + this.txt + '</span>';

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
      delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
  }

  setTimeout(function() {
      that.tick();
  }, delta);
};

window.onload = function() {
  let elements = document.querySelectorAll(".txt-rotate");
  for (let i = 0; i < elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-rotate');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
          new txtRotate(elements[i], JSON.parse(toRotate), period);
      }
  }

  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrapp { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


//HUMBURGER

let menuBtn = document.querySelector('#hamburger__button');
let menu = document.querySelector('#hidden');
let item = document.querySelectorAll('.item');

menuBtn.addEventListener('click', function() {
  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
})

item.forEach(function(el) {
  el.addEventListener('click', function() {
      menu.classList.remove('active');
      menuBtn.classList.remove('active');
  });
});


// SCROLL ANIMATIONS
function onScrollInit(items, elemTrigger) {
  var offset = $(window).height() / 1.6;
  items.each(function() {
      var elem = $(this),
          animationClass = elem.attr('data-animation'),
          animationDelay = elem.attr('data-delay');

      elem.css({
          '-webkit-animation-delay': animationDelay,
          '-moz-animation-delay': animationDelay,
          'animation-delay': animationDelay
      });

      var trigger = elemTrigger ? trigger : elem;

      trigger.waypoint(
          function() {
              elem.addClass('animated').addClass(animationClass);
              if (elem.get(0).id === 'gallery') mixClear(); //OPTIONAL
          }, {
              triggerOnce: true,
              offset: offset
          }
      );
  });
}

setTimeout(function() {
  onScrollInit($('.waypoint'));
}, 10);


$('.effect-julia').waypoint(function() {
  $(this).addClass('animated fadeInUp');
}, {
  offset: '75%'
});

AOS.init({
  duration: 1000,
  once: true
});

//STICK
window.onscroll = function() {
myFunctionSticky()
};
let navbar = document.querySelector("header");
let sticky = navbar.offsetTop;
function myFunctionSticky() {
if (window.pageYOffset >= sticky) {
navbar.classList.add("sticky")
} else {
navbar.classList.remove("sticky");
}
}