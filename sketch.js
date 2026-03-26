let bg;
let v1, v2, v3, v4, v5, v6;
let mouseList = [];
let maquinas = [];
let isStarted = false;
let btnX, btnY, btnWidth, btnHeight;
let hoveredMaquina = null;

const BASE_WEB = 'assets/';
const BASE_PAGES = 'https://gureak365.sharepoint.com/sites/espacioaprendizajeindustrial/SitePages/';

function preload() {
  // Cargamos las imágenes de fondo
  bg = loadImage(BASE_WEB + 'LINEA_Render_FULL.png');
  nll = loadImage(BASE_WEB + 'LINEA_Render_NULL.png');
  // Cargamos el video
  v1 = createVideo([BASE_WEB + 'LINEA_001.mp4']).pause().hide(); v1.elt.muted = true;
  v2 = createVideo([BASE_WEB + 'LINEA_002.mp4']).pause().hide(); v2.elt.muted = true;
  v3 = createVideo([BASE_WEB + 'LINEA_003.mp4']).pause().hide(); v3.elt.muted = true;
  v4 = createVideo([BASE_WEB + 'LINEA_004.mp4']).pause().hide(); v4.elt.muted = true;
  v5 = createVideo([BASE_WEB + 'LINEA_005.mp4']).pause().hide(); v5.elt.muted = true;
  v6 = createVideo([BASE_WEB + 'LINEA_006.mp4']).pause().hide(); v6.elt.muted = true;
  v7 = createVideo([BASE_WEB + 'LINEA_007.mp4']).pause().hide(); v7.elt.muted = true;
  v8 = createVideo([BASE_WEB + 'LINEA_008.mp4']).pause().hide(); v8.elt.muted = true;
  v9 = createVideo([BASE_WEB + 'LINEA_009.mp4']).pause().hide(); v9.elt.muted = true;
  v10 = createVideo([BASE_WEB + 'LINEA_010.mp4']).pause().hide(); v10.elt.muted = true;
  v11 = createVideo([BASE_WEB + 'LINEA_011.mp4']).pause().hide(); v11.elt.muted = true;
  v12 = createVideo([BASE_WEB + 'LINEA_012.mp4']).pause().hide(); v12.elt.muted = true;
  v13 = createVideo([BASE_WEB + 'LINEA_013.mp4']).pause().hide(); v13.elt.muted = true;
  v14 = createVideo([BASE_WEB + 'LINEA_014.mp4']).pause().hide(); v14.elt.muted = true;
}

function setup() {
  //let c = createCanvas(1040, 550);
  let c = createCanvas(1850, 550);
  c.parent('canvas-wrapper');
  
  textSize(14);
  
  // Configurar botón START
  btnWidth = 500;
  btnHeight = 120;
  btnX = width / 2 - btnWidth / 2;
  btnY = height / 2 - btnHeight / 2;
  
  // Definimos las máquinas
  maquinas = [
    {
      id: "Descargador de racks", color: 'red', video: v1, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_DESCARGADOR.aspx",
      puntos: [{x: 30,  y: 515}, {x: 20,  y: 400}, {x: 55,  y: 335}, {x: 87,  y: 320}, {x: 206, y: 320}, {x: 210, y: 400}, {x: 180, y: 515}]
    },
    {
      id: "Desapilador", color: 'blue', video: v2, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_DESAPILADOR.aspx",
      puntos: [{x: 185, y: 510}, {x: 185, y: 420}, {x: 190, y: 400}, {x: 210, y: 385}, {x: 250, y: 385}, {x: 250, y: 510}]
    },
    {
      id: "Inverter", color: 'green', video: v3, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_INVERTER.aspx",
      puntos: [{x: 253,  y: 510}, {x: 250, y:375 }, {x: 275, y: 355}, {x: 330,y: 355}, {x:330, y: 510}]
    },
    {
      id: "Serigrafía", color: 'yellow', video: v4, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_SERIGRAFIA.aspx",
      puntos: [{x: 320,  y: 510}, {x: 320, y: 360}, {x: 340, y: 345}, {x: 455,y: 345}, {x:455, y: 510}]
    },
    {
      id: "SPI", color: 'purple', video: v5, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_SPI.aspx",
      puntos: [{x: 450,  y: 510}, {x: 450, y: 345}, {x: 475, y: 325}, {x: 575,y: 325}, {x:575, y: 510}]
    },
    {
      id: "Conveyor", color: 'orange', video: v6, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_CONVEYOR.aspx",
      puntos: [{x: 560,  y: 505}, {x: 560, y: 420}, {x: 570, y: 400}, {x: 610,y: 400}, {x:610, y: 505}]
    },
    {
      id: "Pick&Place", color: 'cyan', video: v7, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_PICKPLACE.aspx",
      puntos: [{x: 605,  y: 525}, {x: 605, y: 375}, {x: 630, y: 340}, {x: 770,y: 340}, {x:770, y: 525}]
    },
    {
      id: "Pick&Place", color: 'pink', video: v8, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_PICKPLACE.aspx",
      puntos: [{x: 760,  y: 525}, {x: 760, y: 370}, {x: 780, y: 340}, {x: 920,y: 340}, {x:920, y: 525}]
    },
    {
      id: "Conveyor", color: 'brown', video: v9, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_CONVEYOR.aspx",
      puntos: [{x: 920,  y: 505}, {x: 920, y: 410}, {x: 930, y: 400}, {x: 970,y: 400}, {x:970, y: 505}]
    },
    {
      id: "Horno", color: 'yellow', video: v10, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_HORNO.html",
      puntos: [{x: 970,  y: 510}, {x: 970, y: 380}, {x: 1005, y: 380}, {x: 1005, y: 335}, {x: 1405,y: 335}, {x: 1475,y: 410}, {x:1470, y: 510}]
    },
    {
      id: "Conveyor", color: 'red', video: v11, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_CONVEYOR.aspx",
      puntos: [{x: 1455,  y: 505}, {x: 1455, y: 400}, {x: 1495, y: 400}, {x: 1515, y: 410}, {x:1510, y: 505}]
    },
    {
      id: "Buffer", color: 'green', video: v12, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_BUFFER.aspx",
      puntos: [{x: 1510,  y: 505}, {x: 1512, y: 410}, {x: 1495, y: 400}, {x: 1495, y: 310}, {x:1560, y: 310}, {x:1590, y:330}, {x:1580, y: 510}, {x:1520, y: 510}]
    },
    {
      id: "AOI", color: 'blue', video: v13, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_AOI.aspx",
      puntos: [{x: 1575,  y: 510}, {x: 1580, y: 325}, {x: 1660, y: 325}, {x: 1695,y: 345}, {x:1690, y: 510}]
    },
    {
      id: "Segregador", color: 'purple', video: v14, active: false, 
      enlace: BASE_PAGES + "ELEKTRONIKA_NEW_LINEA_SEGREGADOR.aspx",
      puntos: [{x: 1690,  y: 510}, {x: 1695, y: 320}, {x: 1760, y: 320}, {x:1825, y: 350}, {x:1820, y: 510}]
    }
  ];
}

function draw() {
  image(bg, 0, 0, width, height);

  hoveredMaquina = null;

  //if (isStarted) {
    for (let maquina of maquinas) {
      procesarMaquina(maquina);
      if (maquina.active) hoveredMaquina = maquina;
    }
    actualizarCursor();
    dibujarTituloMaquina();
  //}

  //if (!isStarted) {
  //    dibujarOverlay();
  //    dibujarBoton();
  //}

  //dibujarInterfaz();
}

function procesarMaquina(maquina) {
  let wasActive = maquina.active;
  maquina.active = collidePointPoly(mouseX, mouseY, maquina.puntos);

  if (maquina.active && !wasActive) {
    maquina.video.loop();
    maquina.video.play();
  } else if (!maquina.active && wasActive) {
    maquina.video.pause();
    maquina.video.time(0);
  }

  if (maquina.active) {
    image(maquina.video, 0, 0, 1850, 550);
    fill(0, 255, 0, 50);
    stroke(0, 255, 0);
  } else {
    noFill();
    stroke(maquina.color);
  }

  /* strokeWeight(2);
  beginShape();
  for (let p of maquina.puntos) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE); */
}

function actualizarCursor() {
  // Cursor de "enlace" cuando hay una máquina con enlace bajo el puntero
  const tieneEnlace = hoveredMaquina && hoveredMaquina.enlace && hoveredMaquina.enlace.trim() !== "";
  cursor(tieneEnlace ? 'pointer' : 'default');
}

function dibujarTituloMaquina() {
  if (!hoveredMaquina) return;

  const texto = hoveredMaquina.id;

  // Estilos de texto
  textSize(150);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  const paddingX = 30;
  const paddingY = 10;
  const altoTexto = 28;
  const anchoTexto = textWidth(texto);

  const tituloWidth = anchoTexto + paddingX * 2;
  const tituloHeight = altoTexto + paddingY * 2;

  // Posición centrada arriba del canvas
  const x = width / 2 - tituloWidth / 2;
  const y = 10;

  // Fondo semitransparente
  /* fill(0, 0, 0, 180);
  noStroke();
  rect(x, y, tituloWidth, tituloHeight, 8); */

  // Texto
  fill(255);
  noStroke();
  //text(texto, width / 2, y + tituloHeight / 2);
  text(texto, width / 2, 200);

  // Reset estilos
  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
}

function dibujarOverlay() {
  // Capa oscura que cubre todo el canvas
  fill(0, 0, 0, 150); // rgba(0, 0, 0, 0.7) aproximadamente
  noStroke();
  rect(0, 0, width, height);
}

function dibujarBoton() {
  // Verificar si el mouse está sobre el botón
  let mouseOver = mouseX >= btnX && mouseX <= btnX + btnWidth &&
                  mouseY >= btnY && mouseY <= btnY + btnHeight;
  
  // Color del botón (más claro si el mouse está encima)
  if (mouseOver) {
    fill(160, 160, 160);
  } else {
    fill(100, 100, 100); // #333333
  }
  
  noStroke();
  rect(btnX, btnY, btnWidth, btnHeight, 10); // 5px de border-radius
  
  // Texto del botón
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(80);
  textStyle(BOLD);
  text('EMPEZAR', btnX + btnWidth / 2, btnY + btnHeight / 2 + 8);
  
  // Resetear estilos de texto
  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
}

function mouseSobreBoton() {
  return mouseX >= btnX && mouseX <= btnX + btnWidth &&
         mouseY >= btnY && mouseY <= btnY + btnHeight;
}

function dibujarInterfaz() {
  // Solo mostrar interfaz de debug si no se ha iniciado
  if (isStarted) {
    // Dibujar coordenadas y lista de puntos
    fill(255);
    noStroke();
    textSize(14);
    text(`x: ${mouseX.toFixed(2)} y: ${mouseY.toFixed(2)}`, 50, 50);

    for (let p of mouseList) {
      fill(255, 255, 0);
      stroke(0);
      ellipse(p.x, p.y, 10, 10);
      noStroke();
      fill(255);
      text(`(${p.x}, ${p.y})`, p.x + 10, p.y);
    }
  }
}

// Función matemática de colisión
function collidePointPoly(px, py, vertices) {
  let collision = false;
  let next = 0;
  for (let current = 0; current < vertices.length; current++) {
    next = current + 1;
    if (next === vertices.length) next = 0;
    let vc = vertices[current];
    let vn = vertices[next];
    if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
         (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
      collision = !collision;
    }
  }
  return collision;
}

function mousePressed() {
  //if (!isStarted && mouseSobreBoton()) {
  //  isStarted = true;
  //} else if (isStarted) {
    // Si estamos encima de una máquina con enlace, abrirlo
    if (hoveredMaquina && hoveredMaquina.enlace && hoveredMaquina.enlace.trim() !== "") {
      window.open(hoveredMaquina.enlace, '_blank', 'noopener,noreferrer');
      return;
    }
  //  mouseList.push({ x: mouseX.toFixed(2), y: mouseY.toFixed(2) });
  //}
}
