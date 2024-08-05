const restart = new MenuElement(canvas.width / 2, 45, 40, 40, () => { },
    function () {
        drawSquare("#bdbdbd", canvas.width / 2 - 20, 25, 40);
    }
    , () => { },
    function () {
        runner.restart();
    }, () => { }
)

const pause = new MenuElement(canvas.width * 0.75, 45, 40, 40, () => { },
    function () {
        if(!runner.engine.paused)drawSquare("#969696", canvas.width * 0.75 - 20, 25, 40);
    }
    , () => { },
    function () {
        runner.engine.paused = true;
    }
    , () => { }
)

const unpause = new MenuElement(canvas.width * 0.75+50, 45, 40, 40, () => { },
    function () {
        if(runner.engine.paused)drawSquare("#969696", canvas.width * 0.75 + 30, 25, 40);
    }
    , () => { },
    function () {
        runner.engine.paused = false;
    }
    , () => { }
)

const inGameMenu = new Menu([restart, pause, unpause]);