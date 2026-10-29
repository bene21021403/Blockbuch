// ---------- Neue Bauten: Stadthaus, Leuchtturm, Brücke, Gewächshaus, Herrenhaus ----------
// Nutzt die Bau-Helfer aus bauten.js
BUILDS.push(
{ id:"stadthaus", name:"Fachwerk-Stadthaus", cat:"Häuser", diff:"Mittel",
  desc:"Schmales Stadthaus mit drei Etagen: unten ein Laden aus Bruchstein mit großen Schaufenstern, darüber zwei Fachwerk-Etagen aus Schwarzeichenstämmen und weißem Beton, die jeweils einen Block über die Straße auskragen. Getragen werden sie von Konsolen aus umgedrehten Treppen. Steiles Schieferdach mit Giebel zur Straße, Blumenkästen, Fensterläden und ein Ziegelkamin.",
  tips:["Die auskragenden Etagen sind typisch für alte Stadthäuser. Bau zuerst den Balken unter der Etage, dann die Konsolen darunter.","Fachwerk: erst alle Stämme setzen (Ecken, Mitte, Unterkante), dann die Felder mit weißem Beton füllen.","Mehrere dieser Häuser nebeneinander mit leicht anderen Farben ergeben eine ganze Altstadtgasse.","Statt Tiefenschiefer passen auch Schwarzeichen- oder Fichtentreppen fürs Dach."],
  note:"Reiner Deko-Build. Tiefenschiefer findest du unter Y 0, Fliesen machst du in der Steinsäge oder an der Werkbank.",
  q:"minecraft bedrock medieval townhouse tutorial",
  make(){const b=B(),W="concrete_w",D="darklog";
    b.box(-3,0,-3,9,0,15,"lawn"); b.box(-3,0,9,9,0,15,"stone"); weather(b,"stone",[["andesite",.3],["gravel",.12]],71);
    b.box(0,0,0,6,0,8,"spruce");
    // Erdgeschoss Laden
    b.walls(0,1,0,6,4,8,"stone"); [[0,0],[6,0],[0,8],[6,8]].forEach(([x,z])=>b.box(x,1,z,x,4,z,"brick"));
    door(b,3,1,8,"oakdoor"); b.set(3,3,8,"pane");
    [1,2,4,5].forEach(x=>{for(let y=1;y<=3;y++)b.set(x,y,8,"pane");b.set(x,4,8,"dark")});
    // Fachwerk-Etagen
    const timber=(y1,y2,z2)=>{b.walls(0,y1,0,6,y2,z2,W);
      b.each((x,y,z,t)=>{if(y<y1||y>y2||t!==W)return;const edgeX=x===0||x===6,edgeZ=z===0||z===z2;
        if((edgeX&&edgeZ)||(!edgeX&&edgeZ&&x===3)||(edgeX&&!edgeZ&&z%3===0))b.set(x,y,z,D);else if(y===y1)b.set(x,y,z,"dark")});};
    timber(5,8,9); b.box(1,4,1,5,4,8,"spruce"); for(let x=0;x<=6;x++)b.set(x,4,9,"dark"); [0,3,6].forEach(x=>b.set(x,3,9,"darkstairs",6));
    timber(9,12,10); b.box(1,8,1,5,8,9,"spruce"); for(let x=0;x<=6;x++)b.set(x,8,10,"dark"); [0,3,6].forEach(x=>b.set(x,7,10,"darkstairs",6));
    [1,5].forEach(x=>b.set(x,3,9,"lanternh"));
    gable(b,{x1:0,x2:6,z1:0,z2:10,y:13,ax:"z",t:"deepstairs",edge:"sprucestairs",top:"deepslab",fill:W,eave:"sprucestairs"});
    b.box(3,13,10,3,15,10,D); b.box(3,13,0,3,15,0,D);
    win(b,1,6,9,"x",1,2,2,{box:"sprucetrap"}); win(b,4,6,9,"x",1,2,2,{box:"sprucetrap"});
    win(b,1,10,10,"x",1,2,2,{sh:"sprucetrap"}); win(b,4,10,10,"x",1,2,2,{sh:"sprucetrap"});
    win(b,2,14,10,"x",1,1,1); win(b,4,14,10,"x",1,1,1);
    [[6,1],[10,1]].forEach(([y,s])=>{win(b,0,y,4,"z",-1,2,2,{sh:"sprucetrap"});win(b,6,y,4,"z",1,2,2,{sh:"sprucetrap"});win(b,2,y,0,"x",-1,3,2)});
    win(b,0,2,3,"z",-1,2,2,{sill:"cobstairs"});
    b.box(5,9,2,5,19,2,"redbrick"); b.set(5,20,2,"cobwall");
    // Straße & Laden-Deko
    b.set(1,1,9,"barrel").set(5,1,9,"barrel",4).set(5,2,9,"pot").set(0,1,10,"hay");
    b.box(-1,1,12,-1,2,12,"darkfence"); b.set(-1,3,12,"lantern"); b.box(7,1,12,7,2,12,"darkfence"); b.set(7,3,12,"lantern");
    // Innen
    b.set(1,1,1,"barrel").set(2,1,1,"chest").set(4,1,1,"chest").set(5,1,1,"crafting"); for(let x=1;x<=5;x++)b.set(x,1,5,"oakslabtop");
    for(let y=1;y<=8;y++)b.set(5,y,7,"ladder",0);
    b.set(1,5,1,"bedhead").set(1,5,2,"bedfoot").set(5,5,1,"bookshelf").set(4,5,1,"bookshelf").set(3,7,4,"lanternh");
    b.set(1,9,1,"chest").set(5,9,1,"barrel").set(3,11,5,"lanternh");
    weather(b,"stone",[["mossy",.15],["andesite",.08]],72,[0,1,0,6,4,8]);
    return b.list();}},

{ id:"leuchtturm", name:"Leuchtturm", cat:"Häuser", diff:"Mittel",
  desc:"Rot-weiß gestreifter Leuchtturm auf einer Felsklippe am Meer. Unten ein Sockel aus Steinziegeln mit Tür, oben eine Galerie auf Konsolen mit Geländer, darüber die Laternenkammer aus Glas mit Seelaternen und ein Schieferdach. Daneben steht das kleine Haus des Leuchtturmwärters.",
  tips:["Runde Türme baust du am einfachsten Schicht für Schicht mit der Schichtansicht. Der Grundriss ist in jeder Höhe gleich.","Die Streifen sind je 4 Blöcke hoch: abwechselnd roter und weißer Beton.","Seelaternen leuchten heller als Fackeln und sehen unter Glas besonders gut aus. Glowstone geht auch.","Bau ihn auf eine Klippe oder eine kleine Insel, dann sieht man ihn von weit her."],
  note:"Reiner Deko-Build. Das Meer drumherum ist nur angedeutet und zählt nicht zum Material.",
  q:"minecraft bedrock lighthouse tutorial",
  make(){const b=B();
    roundFloor(b,0,0,-1,11,"sea");
    disc(8).forEach(([x,z])=>{const h=hsh(x,0,z,9);b.set(x,0,z,h<.35?"cliffmoss":"cliff");if(Math.hypot(x,z)<6.5&&h>.2)b.set(x,1,z,Math.hypot(x,z)<5?"lawn":"cliff")});
    roundFloor(b,0,0,1,4,"brick"); roundWall(b,0,0,2,3,4,"brick");
    for(let y=4;y<=24;y++)rim(3).forEach(([x,z])=>b.set(x,y,z,Math.floor((y-4)/4)%2?"concrete_w":"concrete_r"));
    door(b,0,2,4,"sprucedoor"); b.set(-1,3,5,"lantern").set(1,3,5,"lantern").set(0,1,5,"brickstairs",0);
    [[0,3,0],[3,0,1],[-3,0,1],[0,-3,0]].forEach(([x,z,r],i)=>[9,15,21].forEach(y=>b.set(x,y+(i%2)*2,z,"pane",r)));
    roundFloor(b,0,0,8,2.6,"spruce"); roundFloor(b,0,0,16,2.6,"spruce");
    rim(4).forEach(([x,z])=>b.set(x,24,z,"brickstairs",6+facing(x,z)));
    roundFloor(b,0,0,25,4.6,"smooth"); rim(4.6).forEach(([x,z])=>b.set(x,26,z,"darkfence"));
    rim(2).forEach(([x,z])=>{for(let y=26;y<=28;y++)b.set(x,y,z,Math.abs(x)===Math.abs(z)?"darklog":"glass")});
    for(let y=26;y<=28;y++)b.set(0,y,0,"sealantern");
    cone(b,0,0,29,2.8,"deepstairs","deeptile","deeptile"); b.set(0,32,0,"darkfence").set(0,33,0,"lantern");
    // Wärterhaus
    b.box(5,1,-3,11,1,3,"stone"); b.walls(5,2,-3,11,5,3,"concrete_w"); [[5,-3],[11,-3],[5,3],[11,3]].forEach(([x,z])=>b.box(x,2,z,x,5,z,"sprucelog"));
    b.box(6,1,-2,10,1,2,"spruce");
    gable(b,{x1:5,x2:11,z1:-3,z2:3,y:6,ax:"x",t:"deepstairs",edge:"sprucestairs",top:"deepslab",fill:"concrete_w",eave:"sprucestairs"});
    door(b,8,2,3,"sprucedoor"); b.set(8,1,4,"cobstairs",0); win(b,6,3,3,"x",1,1,2,{sh:"sprucetrap"}); win(b,10,3,3,"x",1,1,2,{sh:"sprucetrap"});
    win(b,11,3,-1,"z",1,2,2,{sh:"sprucetrap"}); b.box(10,6,0,10,10,0,"redbrick"); b.set(10,11,0,"cobwall");
    b.set(9,2,-2,"bedhead",2).set(9,2,-1,"bedfoot",2); b.set(6,2,-2,"barrel").set(7,2,-2,"furnace"); b.set(8,5,0,"lanternh");
    [[-5,2,3],[-4,2,-4],[3,2,-6]].forEach(p=>b.set(...p,"barrel"));
    b.set(-5,2,4,"hay"); for(let z=5;z<=7;z++)b.set(0,1,z,"path");
    weather(b,"brick",STONEWEATHER,81);
    return b.list();}},

{ id:"bruecke", name:"Brücke mit Torbogen", cat:"Deko", diff:"Mittel",
  desc:"Steinbrücke mit zwei runden Bögen über einen Fluss. Auf dem breiten Mittelpfeiler steht ein Torhaus mit Rundbogen-Durchgang, Konsolen, Zinnen und Pyramidendach. Die Pfeiler haben spitze Wellenbrecher, oben läuft eine Brüstung aus Steinziegelmauern mit Laternen. Der Gehweg ist aus glattem Stein und poliertem Andesit gepflastert.",
  tips:["Die Bögen baust du am besten von beiden Seiten gleichzeitig nach innen, dann treffen sie sich sauber in der Mitte.","Unter den Bogenkanten sitzen umgedrehte Treppen, das macht die Rundung weicher.","Die Wellenbrecher an den Pfeilern zeigen gegen die Strömung.","Passt gut als Eingang zu einer Burg oder als Verbindung zwischen zwei Dörfern."],
  note:"Reiner Deko-Build. Der Fluss ist nur angedeutet und zählt nicht zum Material.",
  q:"minecraft bedrock stone bridge tutorial",
  make(){const b=B(),Y=8;
    for(let x=-3;x<=29;x++)for(let z=-6;z<=12;z++)b.set(x,0,z,"sea");
    [[-3,2],[24,29]].forEach(([a,c])=>{b.box(a,0,-6,c,Y-1,12,"cliff");b.box(a,Y,-6,c,Y,12,"lawn")});
    weather(b,"cliff",[["cliffmoss",.3]],91);
    b.box(0,0,0,2,Y,6,"brick"); b.box(24,0,0,26,Y,6,"brick"); b.box(10,0,0,16,Y,6,"brick");
    const arch=(a,c)=>{const w=c-a+1;const u=x=>Math.round(2+4.2*Math.sin(Math.PI*(x-a+.5)/w));
      for(let x=a;x<=c;x++)for(let z=0;z<=6;z++){for(let y=u(x);y<=Y;y++)b.set(x,y,z,"brick");
        if(x>a&&u(x-1)<u(x))b.set(x,u(x),z,"brickstairs",9);else if(x<c&&u(x+1)<u(x))b.set(x,u(x),z,"brickstairs",7);}};
    arch(3,9); arch(17,23);
    [[13,-1],[13,7]].forEach(([x,z])=>{const d=z<0?-1:1;for(let y=0;y<=5;y++){for(let i=-2;i<=2;i++)b.set(x+i,y,z,"brick");b.set(x,y,z+d,"brick")}
      for(let i=-2;i<=2;i++)b.set(x+i,6,z,"brickstairs",d<0?2:0);b.set(x,6,z+d,"brickstairs",d<0?2:0)});
    for(let x=0;x<=26;x++){b.set(x,Y,0,"brick");b.set(x,Y,6,"brick");for(let z=1;z<=5;z++)b.set(x,Y,z,(x+z)%2?"smooth":"andesite");
      [0,6].forEach(z=>{if(x<10||x>16){b.set(x,Y+1,z,x%4===0?"brick":"brickwall");if(x%8===0)b.set(x,Y+2,z,"lantern")}});
      [-1,7].forEach(z=>b.set(x,Y,z,"brickstairs",z<0?8:6));}
    // Torhaus auf dem Mittelpfeiler
    b.box(10,Y+1,-1,16,Y+10,7,"brick"); b.box(10,Y+1,1,16,Y+5,5,"air");
    for(let x=10;x<=16;x++){b.set(x,Y+5,1,"brickstairs",6);b.set(x,Y+5,5,"brickstairs",8);for(let z=1;z<=5;z++)b.set(x,Y,z,(x+z)%2?"smooth":"andesite")}
    b.set(13,Y+5,3,"lanternh");
    for(let i=9;i<=17;i++){b.set(i,Y+10,-2,"brickstairs",8);b.set(i,Y+10,8,"brickstairs",6)} for(let z=-1;z<=7;z++){b.set(9,Y+10,z,"brickstairs",9);b.set(17,Y+10,z,"brickstairs",7)}
    b.box(9,Y+11,-2,17,Y+11,8,"brick");
    for(let i=9;i<=17;i++)[-2,8].forEach(z=>{b.set(i,Y+12,z,"brick");if((i+z)%2===0)b.set(i,Y+13,z,"brick")});
    for(let z=-1;z<=7;z++)[9,17].forEach(x=>{b.set(x,Y+12,z,"brick");if((x+z)%2===0)b.set(x,Y+13,z,"brick")});
    const t=hip(b,{x1:10,x2:16,z1:-1,z2:7,y:Y+12,t:"deepstairs",cap:"deeptile",fill:"dark",ov:0}); b.box(13,t,3,13,t+1,3,"darkfence");
    [-1,7].forEach(z=>{win(b,12,Y+6,z,"x",z<0?-1:1,3,2,{sill:"brickstairs"})});
    [10,16].forEach(x=>{b.set(x,Y+7,3,"pane",1).set(x,Y+8,3,"pane",1)});
    [[9,-1],[17,-1],[9,7],[17,7]].forEach(([x,z])=>{b.box(x,Y+1,z,x,Y+2,z,"brickwall");b.set(x,Y+3,z,"lantern")});
    for(let x=-3;x<=29;x+=1)if(x<0||x>26)for(let z=2;z<=4;z++)b.set(x,Y,z,"path");
    weather(b,"brick",STONEWEATHER,92);
    b.each((x,y,z,t)=>{if(t==="air")b.del(x,y,z)});
    return b.list();}},

{ id:"gewaechshaus", name:"Gewächshaus", cat:"Häuser", diff:"Mittel",
  desc:"Gewächshaus mit Schwarzeichen-Rahmen, Wänden aus Glasscheiben auf einem Steinsockel und einem Satteldach aus Glas mit Dachsparren. Innen zwei Hochbeete mit Karotten und Blumen, Wasserstellen für den Ackerboden, ein Kiesweg in der Mitte, Laub-Büsche in den Ecken und ein Arbeitsplatz mit Komposter. Von der Decke hängt eine Laterne an einer Kette.",
  tips:["Ackerboden bleibt nur feucht, wenn Wasser höchstens 4 Blöcke entfernt ist. Deshalb stehen in den Beeten kleine Wasserstellen.","Unter Glas wachsen Pflanzen genauso gut wie draußen, das Licht kommt durch.","Statt Karotten passen hier Weizen, Kartoffeln oder Rote Bete. Mit Knochenmehl geht es schneller.","Laub, das du selbst setzt, verschwindet nicht, auch ohne Stamm in der Nähe."],
  note:"Reiner Deko-Build, die Beete funktionieren aber wirklich: Karotten wachsen hier ganz normal.",
  q:"minecraft bedrock greenhouse tutorial",
  make(){const b=B();
    b.box(-3,0,-3,15,0,12,"lawn"); b.box(0,0,0,12,0,8,"stone"); b.box(1,0,1,11,0,7,"dirt");
    b.walls(0,1,0,12,1,8,"brick");
    for(let y=2;y<=5;y++){for(let x=1;x<=11;x++){b.set(x,y,0,"pane");b.set(x,y,8,"pane")}for(let z=1;z<=7;z++){b.set(0,y,z,"pane",1);b.set(12,y,z,"pane",1)}}
    [0,3,6,9,12].forEach(x=>[0,8].forEach(z=>b.box(x,1,z,x,5,z,"darklog"))); [0,12].forEach(x=>b.box(x,1,4,x,5,4,"darklog"));
    for(let x=0;x<=12;x++){b.set(x,6,0,"dark");b.set(x,6,8,"dark")}
    for(let k=0;k<=3;k++)for(let x=0;x<=12;x++){const post=x%3===0;
      [[k+1,2],[7-k,0]].forEach(([z,r])=>{b.set(x,7+k,z,post?"darkstairs":"glass",r);if(k<3&&!post)b.set(x,7+k,z+(r===2?1:-1),"glass")});}
    for(let x=0;x<=12;x++)b.set(x,11,4,"darkslab");
    for(let k=0;k<=3;k++)for(let z=k+1;z<=7-k;z++)[0,12].forEach(x=>{if(!b.get(x,7+k,z)||b.get(x,7+k,z)==="glass")b.set(x,7+k,z,z===4?"darklog":"glass")});
    [0,12].forEach(x=>b.set(x,6,4,"darklog"));
    for(let x=1;x<=11;x++){b.set(x,0,4,x%2?"gravel":"path");b.set(x,1,4,"air");b.set(x,1,3,"spruceslab");b.set(x,1,5,"spruceslab")}
    for(let x=1;x<=11;x++)[1,2,6,7].forEach(z=>{const wat=(x===4||x===8)&&(z===2||z===6);b.set(x,1,z,wat?"water":"farmland");
      if(!wat)b.set(x,2,z,x<=6?"carrot":["poppy","tulip","dandelion","cornflower"][(x+z)%4])});
    [[1,1],[11,1],[1,7],[11,7]].forEach(([x,z])=>{b.set(x,1,z,"dirt");b.set(x,2,z,"leaves");b.set(x,3,z,"leaves")});
    b.del(6,1,8).del(6,2,8); door(b,6,1,8,"oakdoor"); b.set(6,3,8,"dark");
    b.set(11,1,4,"composter").set(10,2,3,"pot").set(1,1,4,"barrel"); b.set(6,1,3,"crafting");
    b.set(6,10,4,"chain").set(6,9,4,"chain").set(6,8,4,"lanternh");
    for(let z=9;z<=12;z++)b.set(6,0,z,"path"); b.set(5,1,9,"pot").set(7,1,9,"pot");
    tree(b,-1,1,10,4,2.2); tree(b,14,1,-1,5,2.4);
    b.each((x,y,z,t)=>{if(t==="air")b.del(x,y,z)});
    return b.list();}},

{ id:"herrenhaus", name:"Herrenhaus", cat:"Häuser", diff:"Schwer",
  desc:"Symmetrisches Herrenhaus aus Ziegelsteinen: ein dreistöckiger Mittelbau mit Walmdach aus Tiefenschiefer, zwei zweistöckige Seitenflügel mit Satteldach, Eckquader und Gesimsbänder aus glattem Stein. Vor dem Eingang ein Säulenportikus mit Dreiecksgiebel und Treppe. Davor ein Garten mit Kiesauffahrt, Hecken, Blumenbeeten, Laternen, Bäumen und einem Springbrunnen.",
  tips:["Bau symmetrisch von der Mitte aus. Die Schichtansicht zeigt dir jede Reihe, so bleibt links und rechts gleich.","Eckquader: an jeder Hauskante wechseln glatter Stein und Ziegel ab. Das wirkt sofort edler.","Die Gesimsbänder aus glattem Stein zwischen den Etagen teilen die große Fassade optisch.","Ziegelsteine brennst du aus Ton im Ofen. Plan dafür viel Ton aus Flüssen und Sümpfen ein."],
  note:"Reiner Deko-Build und ein echtes Großprojekt. Innen sind die Etagen nur angedeutet, die Einrichtung ist dir überlassen.",
  q:"minecraft bedrock mansion tutorial",
  make(){const b=B(),RB="redbrick";
    b.box(-20,0,-4,20,0,28,"lawn");
    const block=(x1,x2,z1,z2,top)=>{b.box(x1,0,z1,x2,0,z2,"andesite");b.walls(x1,1,z1,x2,top,z2,RB);
      for(let y=1;y<=top;y++)[[x1,z1],[x2,z1],[x1,z2],[x2,z2]].forEach(([x,z])=>b.set(x,y,z,y%2?"smooth":RB));
      b.each((x,y,z,t)=>{if(t===RB&&(y===1||y===5||y===9)&&x>=x1&&x<=x2&&z>=z1&&z<=z2)b.set(x,y,z,"smooth")});};
    block(-7,7,0,10,12); [-1,1].forEach(s=>block(s<0?-15:8,s<0?-8:15,1,9,8));
    b.box(-6,5,1,6,5,9,"spruce"); b.box(-6,9,1,6,9,9,"spruce"); b.box(-14,5,2,-9,5,8,"spruce"); b.box(9,5,2,14,5,8,"spruce");
    b.box(-6,0,1,6,0,9,"dark"); b.box(-14,0,2,-9,0,8,"dark"); b.box(9,0,2,14,0,8,"dark");
    const r1=hip(b,{x1:-7,x2:7,z1:0,z2:10,y:13,t:"deepstairs",cap:"deeptile",fill:"dark"});
    for(let x=-8;x<=8;x++){b.set(x,12,-1,"brickstairs",8);b.set(x,12,11,"brickstairs",6)} for(let z=-1;z<=11;z++){b.set(-8,12,z,"brickstairs",9);b.set(8,12,z,"brickstairs",7)}
    [-1,1].forEach(s=>{gable(b,{x1:s<0?-16:8,x2:s<0?-7:16,z1:1,z2:9,y:9,ax:"x",t:"deepstairs",top:"deepslab",fill:RB,eave:"brickstairs",ov:0});
      [-5,5].forEach(x=>{b.box(x,13,4,x,19,4,RB);b.set(x,20,4,"cobwall")}); b.box(s*15,9,5,s*15,15,5,RB); b.set(s*15,16,5,"cobwall");});
    b.box(-6,13,1,6,13,9,"dark");
    // Fenster
    for(let x=-6;x<=6;x+=2){if(Math.abs(x)<=1)continue;[2,6,10].forEach(y=>{win(b,x,y,10,"x",1,1,2,{sill:"brickstairs"});win(b,x,y,0,"x",-1,1,2,{sill:"brickstairs"})})}
    [-1,1].forEach(s=>{for(let i=0;i<3;i++){const x=s*(9+2*i);[2,6].forEach(y=>{win(b,x,y,9,"x",1,1,2,{sill:"brickstairs"});win(b,x,y,1,"x",-1,1,2,{sill:"brickstairs"})})}
      [2,6].forEach(y=>{win(b,s*15,y,3,"z",s,1,2,{sill:"brickstairs"});win(b,s*15,y,7,"z",s,1,2,{sill:"brickstairs"})});
      [2,6,10].forEach(y=>win(b,s*7,y,5,"z",s,1,2,{sill:"brickstairs"}));});
    [6,10].forEach(y=>{win(b,-1,y,10,"x",1,3,2,{sill:"brickstairs"})});
    // Eingang mit Portikus
    door(b,0,1,10,"sprucedoor"); b.set(-1,1,10,"pane").set(1,1,10,"pane").set(-1,2,10,"pane").set(1,2,10,"pane").set(0,3,10,"pane");
    b.box(-4,0,11,4,0,14,"smooth"); for(let x=-4;x<=4;x++)b.set(x,0,15,"brickstairs",0);
    [-4,-2,2,4].forEach(x=>{b.box(x,1,14,x,7,14,"smooth");b.set(x,1,13,"air")});
    b.box(-4,8,11,4,8,14,"smooth"); for(let x=-5;x<=5;x++)b.set(x,8,15,"brickstairs",6); for(let z=11;z<=15;z++){b.set(-5,8,z,"brickstairs",9);b.set(5,8,z,"brickstairs",7)}
    gable(b,{x1:-4,x2:4,z1:11,z2:14,y:9,ax:"z",t:"deepstairs",top:"deepslab",fill:"smooth",ov:1});
    b.set(0,10,15,"concrete_w"); b.set(0,7,12,"chain").set(0,6,12,"lanternh");
    // Garten
    for(let z=16;z<=28;z++)for(let x=-2;x<=2;x++)b.set(x,0,z,"gravel");
    disc(4.5).forEach(([x,z])=>b.set(x,0,22+z,"gravel"));
    rim(3).forEach(([x,z])=>b.set(x,1,22+z,"smooth")); disc(2).forEach(([x,z])=>b.set(x,1,22+z,"water"));
    b.box(0,1,22,0,2,22,"smooth"); b.set(0,3,22,"water");
    [-1,1].forEach(s=>{for(let z=16;z<=28;z++){if(Math.hypot(s*3,z-22)<5.2)continue;b.set(s*3,1,z,"oakleaves")}
      for(let x=4;x<=7;x++){b.set(s*x,0,11,"dirt");b.set(s*x,1,11,["poppy","tulip","dandelion","cornflower"][x%4])}
      for(let x=9;x<=14;x++){b.set(s*x,0,10,"dirt");b.set(s*x,1,10,["cornflower","poppy","tulip","dandelion"][x%4])}
      [17,27].forEach(z=>{b.box(s*4,1,z,s*4,2,z,"darkfence");b.set(s*4,3,z,"lantern")});
      tree(b,s*12,1,19,5,2.6); tree(b,s*17,1,24,4,2.3);
      for(let z=18;z<=26;z+=2)b.set(s*6,1,z,["poppy","tulip"][(z/2)%2]); for(let z=17;z<=27;z++){b.set(s*6,0,z,"dirt");b.set(s*5,1,z,"oakleaves");b.set(s*7,1,z,"oakleaves")}});
    // Innen: Halle
    b.set(0,4,5,"chain").set(0,3,5,"lanternh"); for(let z=2;z<=9;z++)b.set(0,1,z,"carpet_r");
    [-6,6].forEach(x=>{b.set(x,1,2,"bookshelf").set(x,2,2,"bookshelf").set(x,1,8,"bookshelf").set(x,2,8,"bookshelf")});
    b.each((x,y,z,t)=>{if(t==="air")b.del(x,y,z)});
    return b.list();}}
);
