attribute float size;
attribute float index;
attribute vec3 color;

uniform vec4 iMouse;
uniform float iTime;

varying vec3 vColor;

void main(){
  vec3 pos=position;
  
  pos.y+=sin(pos.x+iTime);
  gl_Position=vec4(pos,1.);
  
  vec2 toMouse=iMouse.xy-pos.xy;
  float distanceToMouse=length(toMouse);
  gl_PointSize=size*distanceToMouse;

  vColor=color;
}
