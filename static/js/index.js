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
