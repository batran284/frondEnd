easy.onclick = () => {
    start.style.visibility = "hidden";
    maxPoleGap = gapLv2;
    minPoleGap = gapLv2;
    game.state.start("Play");
    poleMaxHeight = heightLv1;
    poleMinHeight = heightLv2;
};

medium.onclick = () => {
    start.style.visibility = "hidden";
    maxPoleGap = gapLv2;
    minPoleGap = gapLv3;
    game.state.start("Play");
    poleMaxHeight = heightLv2;
    poleMinHeight = heightLv3;
};

difficult.onclick = () => {
    start.style.visibility = "hidden";
    maxPoleGap = gapLv5;
    minPoleGap = gapLv4;
    game.state.start("Play");
    poleMaxHeight = heightLv1;
    poleMinHeight = heightLv4;

};
repMedium.onclick = () => {
    gameover.style.visibility = "hidden";
    maxPoleGap = gapLv2;
    minPoleGap = gapLv3; 
    poleMaxHeight = heightLv2;
    poleMinHeight = heightLv3;
    game.state.start("Play");
};

repDifficult.onclick = () => {
    gameover.style.visibility = "hidden";
    maxPoleGap = gapLv5;
    minPoleGap = gapLv4; 
    poleMaxHeight = heightLv1;
    poleMinHeight = heightLv4;
    game.state.start("Play");
};