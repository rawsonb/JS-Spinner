let app = new PIXI.Application({
    width: 640, 
    height: 360, backgroundColor: 0xaaaa00
});

document.body.appendChild(app.view);


const numSlices = 10;

let slices = [];


let sliceGx = new PIXI.Graphics();

for (let i = 0; i < numSlices; i++){
    let color = Math.random() * 0xFFFFFF;
    sliceGx.clear();
    sliceGx.lineStyle(0, color);
    sliceGx.arc(0, 0, Math.min(app.screen.width, app.screen.height)/2.5, 0, 2*Math.PI/numSlices);
    sliceGx.beginFill(color);
    sliceGx.lineTo(0, 0);
    sliceGx.arc(0, 0, Math.min(app.screen.width, app.screen.height)/2.5, 2*Math.PI/numSlices,0,true);
    sliceGx.lineTo(0, 0);

    let sliceTx = app.renderer.generateTexture(sliceGx);
    let sliceSprite = new PIXI.Sprite(sliceTx);
    if(numSlices == 2){
        sliceSprite.anchor.set(0.5, 0);
    } else if(numSlices == 3){
        sliceSprite.anchor.set(0.334,0.003);
    } else{
        sliceSprite.anchor.set(0.002,0.002);
    }
    sliceSprite.x = app.screen.width/2;
    sliceSprite.y = app.screen.height/2;
    sliceSprite.scale.set(1.005, 1.005);
    
    sliceSprite.rotation = 2*Math.PI/numSlices * i;
    app.stage.addChild(sliceSprite);
    slices.push(sliceSprite);
}

let elapsed = 0.0;
let accel = 0.0;
let acceldx = Math.random()*5+3;

app.ticker.add((delta) => {
    elapsed += delta;
    if (elapsed > 3 && accel >= 0){
        elapsed -= 3;
        for(s in slices){
            slices[s].rotation += accel/10;
            slices[s].filters = [new PIXI.filters.BlurFilter(accel/7)];
        }
        accel += acceldx/10;
        acceldx -= 0.1;
        acceldx *= 0.9;
        if (accel < 0){
            for(s in slices){
                null;
            }
        }
    }
});


