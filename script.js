const $container = document.querySelector('.container');
const $list = document.querySelector('.list');
let $items = document.querySelectorAll('.item');
const $prevBtn = document.querySelector('.prev-btn');
const $nextBtn = document.querySelector('.next-btn');
const slideSpeed = 300;
const slideChangeTerm = 3000;
const viewWidth = $container.offsetWidth + 'px'; // 보여질 부분의 width

let listLen = $items.length;
let curIdx = 1;

// 첫 노드와 마지막 노드 복사
const $firstChild = $items[0];
const $lastChild = $items[listLen - 1];
const $cloneFirst = $firstChild.cloneNode(true);
const $cloneLast = $lastChild.cloneNode(true);

// 리스트 div에 요소 추가
$list.appendChild($cloneFirst);
$list.insertBefore($cloneLast, $list.firstElementChild);

// $items 다시 받기
$items = document.querySelectorAll('.item');

// 길이 + 2
listLen = listLen + 2;

// 2개만큼 늘어난 list width 계산
$list.style.width = `calc(${viewWidth} * ${listLen})`;

// 각 item 당 width 다시 계산
$items.forEach((item) => {
  item.style.width = `calc(${viewWidth})`;
});

// 2번째 박스(맨 앞 더미 박스 이후에 있는)로 위치
$list.style.transform = `translateX(calc(-${viewWidth}))`;

// 다음 박스로 넘어가는 함수
const slideNext = () => {
  const timeoutId = setInterval(() => {
    $list.style.transition = `${slideSpeed}ms`;
    $list.style.transform = `translateX(calc(-${viewWidth} * ${++curIdx}))`;
    // 복사한 노드에 도착하면
    if (curIdx === listLen - 1) {
      setTimeout(() => {
        $list.style.transition = `0ms`;
        $list.style.transform = `translateX(calc(-${viewWidth}))`;
        curIdx = 1;
      }, slideSpeed);
    }
  }, slideChangeTerm);

  return timeoutId;
};

// 페이지가 실행되면 첫 시작
let timeoutId = slideNext();

// Button EventListener
$nextBtn.addEventListener('click', () => {
  clearInterval(timeoutId);
  $list.style.transition = `${slideSpeed}ms`;
  $list.style.transform = `translateX(calc(-${viewWidth} * ${++curIdx}))`;
  // 복사한 노드에 도착하면
  if (curIdx === listLen - 1) {
    setTimeout(() => {
      $list.style.transition = `0ms`;
      $list.style.transform = `translateX(calc(-${viewWidth}))`;
      curIdx = 1;
    }, slideSpeed);
  }
  timeoutId = slideNext();
});

$prevBtn.addEventListener('click', () => {
  clearInterval(timeoutId);
  $list.style.transition = `${slideSpeed}ms`;
  $list.style.transform = `translateX(calc(-${viewWidth} * ${--curIdx}))`;
  // 복사한 노드에 도착하면
  if (curIdx === 0) {
    setTimeout(() => {
      $list.style.transition = `0ms`;
      $list.style.transform = `translateX(calc(-${viewWidth} * ${
        listLen - 2
      }))`;
    }, slideSpeed);
    curIdx = listLen - 2;
  }
  timeoutId = slideNext();
});
