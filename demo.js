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
      console.log("pos", arrays.position.length);
      console.log("ind", arrays.indices.length);
      console.log("col", arrays.color.length);
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

function createIndicesGrid(width, height){
    let gridArray = [];

    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        let p1 = j + (i*height);
        let p2 = j + 1 + (i*height);
        let p3 = j + 1 + ((i+1)*height);
        let p4 = p1;
        let p5 = p2;
        let p6 = j + ((i+ 1)*height);       
        gridArray.push(p1, p2, p3, p4, p5, p6);//, x1, y2, z1, x2, y2, z1);
        //gridArray.push(x1, y1, z2, x2, y1, z2, x2, y2, z2);
      }
    }
    return(gridArray);
}

function createPointGrid(width, height, top, bottom, left, right){
    let gridArray = [];
    let unitWidth = (right-left)/width;
    let unitHeight = (top-bottom)/height;
    for (var i = 0; i <= width; i++) {
      for (var j = 0; j <= height; j++) {
        let x1 = left+(unitWidth*i);
        //let x2 = left+(unitWidth*(i+1));
        let y1 = bottom+(unitHeight*j);
        //let y2 = bottom+(unitHeight*(j+1));
        let z1 = Math.random()-0.5;
        //let z2 = Math.random()-0.5;
        gridArray.push(x1, y1, z1);//, x1, y2, z1, x2, y2, z1);
        //gridArray.push(x1, y1, z2, x2, y1, z2, x2, y2, z2);
      }
    }
    return(gridArray);
}

function createColorGrid(width, height){
    let gridArray = [];
    let rowEven = true;
    let columnEven = true
    for (var i = 0; i <= width; i++) {
      for (var j = 0; j <= height; j++) {
               //gridArray.push(1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1);
               //gridArray.push(1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1);
       if(rowEven){
           if(columnEven){
               gridArray.push(1, 0, 0, 1);//, 1, 1, 0, 1, 0, 1, 0, 1);
               //gridArray.push(1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1);
               console.log(i,j,"red");
           } else{
               gridArray.push(0, 1, 0, 1);//, 1, 0, 0, 1, 0, 0, 1, 1);
               //gridArray.push(1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1);
               console.log(i,j,"green");
           }
       } else{
           if(columnEven){
               gridArray.push(0, 1, 0, 1);//, 0, 1, 0, 1, 1, 1, 0, 1);
               //gridArray.push(0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1);
               console.log(i,j,"green");
           } else{
               gridArray.push(0, 0, 1, 1);//, 0, 0, 1, 1, 1, 0, 0, 1);
               //gridArray.push(0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1);  
               console.log(i,j,"blue");        
           }
       }
       columnEven = !columnEven;

       
      }
      
      rowEven = !rowEven;
      columnEven = true;
      
    }
    return(gridArray);
}

loadShadersAndRunDemo()