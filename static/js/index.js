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
    content: "전현무가 목에서 못 빼는 저건?",
    start: 12,
    end: 25,
    title: "<div class='adListName'>▶에어팟 맥스</div>",
    text: "<div class='adListText'>감동적인 하이파이 오디오와 AirPods 특유의 매혹적인 사용성의 완벽한 조합.</div>",
    image:
      "<div class='adListImageDiv' title='자세히 알아보기' onclick='window.open(`https://www.apple.com/kr/airpods-max/`)'>" +
      "<image class='adListImage' src='./static/img/airpods_max.jpg'></image>" +
      "</div>",
  },
  {
    content: "서울 근교 일몰 맛집! 나도 가볼까?",
    start: 38,
    end: 51,
    title: "<div class='adListName'>▶탄도항</div>",
    text: "<div class='adListText'>하루 두 번의 썰물 때 탄도와 누에섬 사이에 갯벌이 드러나 바다가 갈라지는 신비한 현상을 볼 수 있다.</div>",
    image:
      "<div class='adListImageDiv' title='자세히 알아보기' onclick='window.open(`https://www.ggtour.or.kr/tourdb/goosuk.php?tmenu=&smenu=&stitle=&tsort=2&msort=15&board_code=71&board=71&s_category_name=&s_view_yn=&key=%ED%83%84%EB%8F%84%ED%95%AD&no=9571&mode=detail&page=1&s_tag=&s_admin_no=`)'>" +
      "<image class='adListImage' src='./static/img/tando.jpeg'></image>" +
      "</div>",
  },
  {
    content: "이장우의 생명수",
    start: 57,
    end: 67,
    title: "<div class='adListName'>▶삼다수</div>",
    text: "<div class='adListText'>화산송이가 키운 생명력이 물 속에서 몸 속까지</div>",
    image:
      "<div class='adListImageDiv' title='자세히 알아보기' onclick='window.open(`https://www.coupang.com/vp/products/5647481827?itemId=19365622542&vendorItemId=86478559175&pickType=COU_PICK&q=%EC%82%BC%EB%8B%A4%EC%88%98&itemsCount=36&searchId=487bf5a96f8c4885a73bdcf456655934&rank=1&isAddedCart=`)'>" +
      "<image class='adListImage' src='./static/img/samdasu.jpg'>" +
      "</image></div>",
  },
];

player.overlay({
  overlays: [
    {
      content: "<div id='overlayText'><image id='tagimg' src='./static/img/tagimg.png'></image></div>",
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
  let adText = "<div class='adListHeader'>전체 Tag 모음</div>";
  let adIdx = 0;
  overlaysData.forEach((data) => {
    adText = adText + "<div class='adListItem' id='adListItem" + adIdx + "'>" + data.title + data.image + data.text + "</div>";
    adIdx++;
  });
  $("#adList").html(adText);
  console.log(adText);
});

player.on("timeupdate", () => {
  const currentTime = player.currentTime();

  if (idx != overlaysData.length) {
    if (show == 0 && Math.floor(currentTime) == overlaysData[idx].start) {
      show = 1;
      $("#overlayText").html(overlaysData[idx].content);
      $("#adListItem" + idx).addClass("hidden");
      $("#nowAd").html("<div class='adListHeader'>지금 나오는 Tag</div>" + overlaysData[idx].title + overlaysData[idx].text + overlaysData[idx].image);
    }
    if (show == 1 && Math.floor(currentTime) == overlaysData[idx].end) {
      show = 0;
      $("#overlayText").html("<image id='tagimg' src='./static/img/tagimg.png'></image>");
      $("#adListItem" + idx).removeClass("hidden");
      $("#nowAd").html("");
      idx++;
    }
  }
});

function toggleAd() {
  let adDiv = document.getElementById("ad");
  let videoDiv = document.getElementById("videoContainer");

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
