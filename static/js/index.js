const player = videojs("myVideo", {
  // sources: [{ src: "./static/video/video.mp4", type: "video/mp4" }],
  sources: [{ type: "video/youtube", src: "https://www.youtube.com/watch?v=qShkh1n70t8" }],
  // youtube: { iv_load_policy: 1 },
  poster: "./static/img/thumbnail.jpg",
  controls: true,
  playsinline: true,
  autoplay: "muted",
  preload: "metadata",
});

let idx = 0;
let show = 0;
let overlaysData = [
  {
    content: "전현무가 착용하고 있는 헤드셋이 궁금하다면?",
    start: 15,
    end: 25,
    text: "<div class='adListName'>에어팟 맥스</div>",
    url: "<a class='adListLink href='https://www.apple.com/kr/airpods-max/'>바로가기</a>",
  },
  {
    content: "전현무가 간 바다가 궁금하다면??",
    start: 37,
    end: 51,
    text: "<div class='adListName'>탄도항</div>",
    url: "<a class='adListLink href='#'>바로가기</a>",
  },
];

player.overlay({
  overlays: [
    {
      content: "<div id='overlayText'>&nbsp;!&nbsp;</div>",
      start: "play",
      end: "pause",
    },
  ],
});

document
  .getElementsByClassName("vjs-overlay")
  .item(0)
  .addEventListener("click", () => {
    toggleAd();
  });

$(() => {
  let adText = "<div id='adListHeader'>전체 광고 모음</div>";
  overlaysData.forEach((data) => {
    adText = adText + data.text + data.url;
  });
  $("#adList").html(adText);
  console.log(adText);
});

player.on("timeupdate", () => {
  const currentTime = player.currentTime();

  if (idx != overlaysData.length) {
    console.log(currentTime.toFixed(3) + " " + idx);
    if (show == 0 && Math.floor(currentTime) == overlaysData[idx].start) {
      show = 1;
      $("#overlayText").html(overlaysData[idx].content);
      $("#nowAd").html(overlaysData[idx].text + overlaysData[idx].url);
    }
    if (show == 1 && Math.floor(currentTime) == overlaysData[idx].end) {
      show = 0;
      $("#overlayText").html("&nbsp;!&nbsp;");
      $("#nowAd").html("");
      idx++;
    }
  }
});

function toggleAd() {
  var adDiv = document.getElementById("ad");
  var videoDiv = document.getElementById("videoContainer");

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
