function calculateTotalValue (length) {
  let minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds
  return time;
}
function calculateCurrentValue (currentTime) {
  let current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
  return current_time;
}

function initProgressBar (){
  let player = document.getElementById('player');
  let length = player.duration
  let current_time = player.currentTime;
  let totalLength = calculateTotalValue(length)
  jQuery(".end-time").html(totalLength);
  let currentTime = calculateCurrentValue(current_time);
  jQuery(".start-time").html(currentTime);

  let progressbar = document.getElementById('seekObj');
  progressbar.value = (player.currentTime / player.duration);
  progressbar.addEventListener("click", seek);

  if (player.currentTime == player.duration) {
    $('#play-btn').removeClass('pause');
  }

  function seek(evt) {
    let percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  }
};

function initPlayers(num){
  for (let i = 0; i < num; i++) {
    (function() {
      let playerContainer = document.getElementById('player-container'),
        player = document.getElementById('player'),
        isPlaying = false,
        playBtn = document.getElementById('play-btn');
      if (playBtn != null) {
        playBtn.addEventListener('click', function() {
          togglePlay()
        });
      }
      function togglePlay(){
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
            $("#play-btn").fadeIn("slow", function() {
    $(this).removeClass("pause");
});



        } else {
          player.play();
          $("#play-btn").fadeIn("slow", function() {
    $(this).addClass("pause");
});
          isPlaying = true;
        }
      }
    }());
  }
}
 $(".audio-player")
    .toArray()
    .forEach(function(player)
      {

        let audio = $(player).find("audio")[0];
              let volumeControl = $(player).find(".volumeControl .wrapper");
              volumeControl.find(".outer").on("click", function(e) {
        let volumePosition = e.pageX - $(this).offset().left;
        let audioVolume = volumePosition / $(this).width();
        if (audioVolume >= 0 && audioVolume <= 1) {
          audio.volume = audioVolume;
          $(this)
            .find(".inner")
            .css("width", audioVolume * 100 + "%");
        }
      });


      });
initPlayers(jQuery('#player-container').length);
