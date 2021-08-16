import * as twgl from '/twgl/twgl-full.module.js';

async function loadShadersAndRunDemo() {
  		const vertexShaderText = await fetch('demo.vert')
  		  .then(result => result.text());
  		const fragmentShaderText = await fetch('demo.frag')
  		  .then(result => result.text());
  		runDemo(vertexShaderText, fragmentShaderText);
}

function runDemo(vs,fs){
    	const gl = document.querySelector("#c").getContext("webgl");
    	const programInfo = twgl.createProgramInfo(gl, [vs, fs]);
      const size = 3;
    	const arrays = {
    	  position: [-0.5, -0.5, 0, -0.5, 0, 0, 0,0,0,0,-0.5, 0],
        color: [1,0,0,1,0,1,0,1,0,0,1,1,1,1,0,1],
        indices: [0,1,2, 0,2,3]
    	};
    	const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.useProgram(programInfo.program);

    	function render(time) {

      		const uniforms = {
            time: time * 0.001,
            resolution: [gl.canvas.width, gl.canvas.height],
          };
          twgl.setUniforms(programInfo, uniforms);
      		twgl.drawBufferInfo(gl, bufferInfo);
        	requestAnimationFrame(render);
    	}
    	requestAnimationFrame(render);
}

loadShadersAndRunDemo()