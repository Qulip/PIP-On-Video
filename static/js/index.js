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
  },
  {
    content: "영상 속 여자의 휴대폰이 궁금하면?",
    start: 9,
    end: 12,
  },
];

player.overlay({
  overlays: overlaysData,
});

player.on("timeupdate", () => {
  const currentTime = player.currentTime(); // 현재 진행 시간
  // const duration = player.duration(); // 총 길이

  document.getElementById("time").innerText = "현재 시간 : " + currentTime.toFixed(0);

  if (currentTime.toFixed(0) == 4) {
    document.getElementById("ad").style.display = "block";
  }

  if (currentTime.toFixed(0) == 8) {
    document.getElementById("ad").style.display = "none";
  }
});
