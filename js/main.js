// search
const search = document.querySelector('.search');
const input = document.querySelector('input[type=text]');
search.addEventListener('click', ()=>{
  input.focus();   
});

input.addEventListener('focus', ()=>{
  search.classList.add('focused')
  input.setAttribute('placeholder', '통합검색');
});

input.addEventListener('blur', ()=>{
  search.classList.remove('focused')
  input.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top')

// 기존에는 많은 함수들이 스크롤움직일때마다 실행됨
//=>_.throttle(함수, 시간)->스크롤할 때마다 0.3초마다 함수 실행  
window.addEventListener('scroll', _.throttle(()=>{
  console.log('scroll');
  if(window.scrollY>500){
    // badgeEl.style.display = 'none';
    //애니메이션 gsap.to(요소, 지속시간(s), 옵션);
    //배지 숨기기
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: 'none'
    });
    //버튼 보이기
    gsap.to('#to-top', 0.2, {
      x: 0
    })


  }else{
    //배지 보이기
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block'
    });

    //버튼 숨기기
    gsap.to(toTopEl, 0.2, {
      x: 100
    })

  }
}, 300)); 
  

toTopEl.addEventListener('click', ()=>{
  gsap.to(window, 0.7, {
    scrollTo:0  //gsap plug in 추가
  })
})

// 순차적으로 그림 생성
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach(function(fadeEl, index){
  gsap.to(fadeEl, 1, {
    delay: (index+1)*0.7,
    opacity: 1

  })
})

// 자동 슬라이드
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper', {
  //기본값  direction: 'horizontal',

  //한번에 보여줄 슬라이드 갯수
  slidesPerView: 3,

  //슬라이드 사이 여백
  spaceBetween: 10,

  //번슬라이드가 가운데 보이기
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000, //0.5초에 한번씩 자동재생
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택
    clickable: true  //사용자의 페이지 번호 요소 제어
  }, 
  navigation:{
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

//AWARDS
new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation:{
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
  
})






const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', ()=>{
  isHidePromotion = !isHidePromotion
  if(isHidePromotion){
    //숨김처리
    promotionEl.classList.add('hide');
  }else{
    //보임처리
    promotionEl.classList.remove('hide');

  }
});

// <floating></floating>

//범위 랜덤 함수
function random(min, max){
  //parseFloat()를 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random()*(max-min)*min).toFixed(2))
}

function floatingObject(selector, delay, size){
  gsap.to(selector, random(1.5,2.5), {
    y: size,
    repeat: -1, //무한반복
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  })
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);


// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8  //뷰포트에서 맨위가 0, 아래가 1, 
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
})

//FOOTER
const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()