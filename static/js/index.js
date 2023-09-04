const player = videojs("myVideo", {
  sources: [{ src: "./static/video/video.mp4", type: "video/mp4" }],
  poster: "./static/img/thumbnail.png",
  controls: true,
  playsinline: true,
  muted: true,
  preload: "metadata",
});

let overlaysData = [
  {
    content: "영상 속 여자가 입은 자켓이 궁금하면?",
    start: 3,
    end: 6,
    id: "jacket",
    text: "체크무늬 더블 버튼 자켓",
    url: "#",
  },
  {
    content: "영상 속 여자의 휴대폰이 궁금하면?",
    start: 9,
    end: 12,
    id: "cellphone",
    text: "아이폰 SE 2세대 블랙",
    url: "#",
  },
];

player.overlay({
  overlays: overlaysData,
});

overlaysData.forEach((data) => {
  let overlayElement = document.getElementById(data.id);

  overlayElement.addEventListener("click", () => {
    document.getElementById("adText").innerText = data.text;
    document.getElementById("adUrl").innerText = data.url;
  });
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
