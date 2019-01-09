ArrayList<LinesArc> linesArcList = new ArrayList<LinesArc>();

void setup() {
  size(640, 640);
  frameRate(24);
  
  background(255f);
  initializeLinesArcList();
}

void draw() {
  translate(width / 2f, height / 2f);
  background(255f);

  for (LinesArc currentArc : linesArcList) {
    currentArc.update();
  }
  for (LinesArc currentArc : linesArcList) {
    currentArc.display(0f, 0f);
  }
}

void initializeLinesArcList() {
  linesArcList.clear();
  
  int linesArcCount = 20;
  for (int i = 0; i < linesArcCount; i++) {
    float r1 = random(80f, 260f);    // inside radius
    float av = random(0.005f, 0.015f);    // angular speed of rotation
    if (random(1f) < 0.5f) {
      av = -av;
    }
    linesArcList.add(new LinesArc(
      r1, 
      r1 + random(30, 60f), // outside radius
      random(PI * 0.3f, PI * 0.7f), // center angle of the arc
      random(TWO_PI), // initial angle of rotation
      av
      ));
  }
}

void mouseClicked() {
  initializeLinesArcList();
}


class LinesArc {
  final PGraphics graphic;
  float rotationAngle;
  float rotationAngularVelocity;

  LinesArc(float r1, float r2, float centerAngle, float rotAngle, float rotAngVel) {
    graphic = createGraphics(width, height);
    graphic.beginDraw();
    graphic.translate(graphic.width / 2f, graphic.height / 2f);
    graphic.stroke(0f);
    graphic.strokeWeight(1f);
    for (float lineAngle = 0f; lineAngle < centerAngle; lineAngle += 0.04f) {
      graphic.line(r1 * cos(lineAngle), r1 * sin(lineAngle), r2 * cos(lineAngle), r2 * sin(lineAngle));
    }
    graphic.endDraw();

    rotationAngle = rotAngle;
    rotationAngularVelocity = rotAngVel;
  }

  LinesArc() {
    this(0f, 100f, TWO_PI, 0f, 0.01f);
  }

  void update() {
    rotationAngle += rotationAngularVelocity;
  }

  void display(float x, float y) {
    pushMatrix();
    translate(x, y);
    rotate(rotationAngle);
    imageMode(CENTER);
    image(graphic, 0f, 0f);
    popMatrix();
  }
}
