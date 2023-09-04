const player = videojs("myVideo", {
  sources: [{ src: "./static/video/video.mp4", type: "video/mp4" }],
  poster: "./static/img/thumbnail.png",
  controls: true,
  playsinline: true,
  muted: true,
  preload: "metadata",
});

let idx = 0;
let show = 0;
let overlaysData = [
  {
    content: "영상 속 여자가 입은 자켓이 궁금하면?",
    start: 3,
    end: 6,
    id: "jacket",
    class: "jacket",
    text: "체크무늬 더블 버튼 자켓",
    url: "<a href='#'>바로가기</a>",
  },
  {
    content: "영상 속 여자의 휴대폰이 궁금하면?",
    start: 9,
    end: 12,
    id: "cellphone",
    class: "cellphone",
    text: "아이폰 SE 2세대 블랙",
    url: "<a href='#'>바로가기</a>",
  },
];

player.overlay({
  overlays: overlaysData,
});

overlaysData.forEach((data) => {
  let overlayElement = document.getElementsByClassName(data.class);

  overlayElement.item(0).addEventListener("click", () => {
    toggleAd();
  });
});

player.on("overlayhide", function (e) {
  var overlay = e.overlay; // 사라진 오버레이 객체

  // 오버레이가 숨겨질 때 실행할 동작을 여기에 추가
  console.log("오버레이가 숨겨집니다:", overlay);
  // 사용자 지정 동작 추가 가능
});

player.on("timeupdate", () => {
  const currentTime = player.currentTime();
  const adText = document.getElementById("adText");
  const adUrl = document.getElementById("adUrl");

  if (idx != overlaysData.length) {
    if (show == 0 && Math.floor(currentTime) == overlaysData[idx].start) {
      show = 1;
      adText.innerText = overlaysData[idx].text;
      adUrl.innerHTML = overlaysData[idx].url;
    }
    if (show == 1 && Math.floor(currentTime) == overlaysData[idx].end) {
      show = 0;
      adText.innerText = "현재 진행중인 광고가 없습니다.";
      adUrl.innerText = "";
      idx = idx + 1;
    }
  }
});

function toggleAd() {
  var adDiv = document.getElementById("ad");
  var videoDiv = document.getElementById("videoDiv");

  if (adDiv.classList.contains("hidden")) {
    adDiv.classList.remove("hidden");
    videoDiv.classList.add("col-md-10"); // 비디오 영역을 확장
    videoDiv.classList.remove("col-md-12");
  } else {
    adDiv.classList.add("hidden");
    videoDiv.classList.remove("col-md-10");
    videoDiv.classList.add("col-md-12"); // 비디오 영역을 전체로 확장
  }
}
