precision highp float;
attribute vec4 position;
attribute vec4 color;
varying vec4 v_Color;
uniform float time;
void main() {
  gl_Position = vec4(position.x , position.y , position.z , position.w);
  v_Color = color;
}