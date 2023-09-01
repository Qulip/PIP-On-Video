const player = videojs("myVideo", {
  sources: [{ src: "/static/video/video.mp4", type: "video/mp4" }],
  poster: "/static/img/thumbnail.png",
  controls: true,
  playsinline: true,
  muted: true,
  preload: "metadata",
});

player.on("timeupdate", () => {
  const currentTime = player.currentTime(); // 현재 진행 시간
  // const duration = player.duration(); // 총 길이

  document.getElementById("t1").textContent = "현재 시간 : " + currentTime.toFixed(0);

  if (currentTime > 4) {
    document.getElementById("ad").style.display = "block";
  }

  if (currentTime < 8) {
    document.getElementById("ad").style.display = "none";
  }
});
