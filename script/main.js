var ctx = document.getElementById("game").getContext("2d", { alpha: false, });
var ball = {
    frames: [],
    frames_current: 0,
    frames_min: 0,
    frames_max: 11,
    speed: 0.35
};

var debug = true;

var delta = {
    interval: 1000 / 60,
    last: (new Date()).getTime(),
    current: (new Date()).getTime(),
    time: 0
};

for (var i = 0; i < ball.frames_max; i++) {
    ball.frames[i] = new Image();
    ball.frames[i].src = "res/ball_" + i + ".png";
}

function image_smoothing(boolean) {
    ctx.mozImageSmoothingEnabled = boolean;
    ctx.oImageSmoothingEnabled = boolean;
    ctx.webkitImageSmoothingEnabled = boolean;
    ctx.msImageSmoothingEnabled = boolean;
    ctx.imageSmoothingEnabled = boolean;
}

function loop() {
    window.requestAnimationFrame(loop, ctx);
    delta.current = (new Date()).getTime();
    delta.time = (delta.current - delta.last) / delta.interval;
    ctx.canvas.width = window.innerWidth * window.devicePixelRatio;
    ctx.canvas.height = window.innerHeight * window.devicePixelRatio;
    image_smoothing(false);
    var ball_frame = ball.frames[Math.floor(ball.frames_current) + ball.frames_min];
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Arial";
    if (debug) {
        ctx.fillText("Ball frame: " + (Math.floor(ball.frames_current) + ball.frames_min), 0, 32);
        ctx.fillText("Ball speed: " + (ball.speed), 0, 32 * 2);
    }
    var scale = Math.min(ctx.canvas.width / 180, ctx.canvas.height / 180);
    ctx.drawImage(ball_frame,
        (ctx.canvas.width - (scale * ball_frame.width)) / 2,
        (ctx.canvas.height - (scale * ball_frame.height)) / 2,
        scale * ball_frame.width,
        scale * ball_frame.height);
    ball.frames_current = (ball.frames_current + (delta.time * ball.speed)) % (ball.frames_max - ball.frames_min);
    ball.speed += delta.time * 0.00055555;
    delta.last = delta.current;
}
loop();