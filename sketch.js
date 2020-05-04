
function removeFromArray(arr,element){
  for(var i=arr.length-1;i>=0;i--){
    if(arr[i]==element){
      arr.splice(i,1);
    }
  }
}

function heuristic(a,b){
  var d=dist(a.i,a.j,b.i,b.j);
  return d;
}



var cols=5;
var rows=5 ;
var grid=new Array(cols);

var openSet=[];
var closedSet=[];
var start;
var end;

var w, h; 
var path=[];

function Spot(i,j) {

  this.i=i;
  this.j=j;
  this.f=0;
  this.g=0;
  this.h=0;

  this.neighbours=[];
  this.previous=undefined; 

  this.show= function (col)  {
    fill(col);
    noStroke();
    rect(this.i*w,this.j*h,w-1,h-1);
    
  }

  this.addNeighbours=function (grid){
    var i=this.i;
    var j=this.j;

    if(i<cols-1){
      this.neighbours.push(grid[i+1][j]);
    }

    if(i>0){
      this.neighbours.push(grid[i-1][j]);
    }

    if(j<rows-1){
      this.neighbours.push(grid[i][j+1]);
    }

    if(j>0){
      this.neighbours.push(grid[i][j-1]);
    }
  }
}

function setup() {
  createCanvas(400,400);

  w=width/cols;
  h=height/rows;
  
  for(var i=0;i<cols;i++){
    grid[i]= new Array(rows);
  }
   console.log(grid);
  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j]= new Spot(i,j);
    }
  }

  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j].addNeighbours(grid);
    }
  }

  start =grid[0][0];
  end =grid[cols-1][rows-1];

  openSet.push(start);

}

function draw() {

  if  (openSet.length>0){
    // keep going
    var winner=0;
    for(var i=0;i<openSet.length;i++){
      console.log(openSet[winner].f);
       if(openSet[i].f < openSet[winner].f){
         winner=i;
       }
    }
    var current =openSet[winner];
    if(current==end){
     
      noLoop();
      console.log("Done");
    }
    removeFromArray(openSet,current)
    closedSet.push(current) 

    var neighbours=current.neighbours;

    for(var i=0 ;i<neighbours.length;i++){
      var neighbour=neighbours[i];

      if(!closedSet.includes(neighbour)){
        var tempG =current.g+1;
        if(openSet.includes(neighbour)){
          if(tempG<neighbour.G){
            neighbour.g=tempG;
          }
        }
        else{
          neighbour.g=tempG ;
          openSet.push(neighbour);
        }

        neighbour.h=heuristic(neighbour,end);
        neighbour.f=neighbour.g+neighbour.h;
         neighbour.previous =current;

        
      }
    }
  }



  else {
    //no solution
  }
  background(0);

  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j].show(color(255)) ;
    }
  }

  for(var i=0;i<closedSet.length;i++){
    closedSet[i].show(color(255,0,0));
  }

  for(var i=0;i<openSet.length;i++){
    openSet[i].show(color(0,255,0));
  }

  path=[];
  var temp=current;
  path.push(temp);
  while(temp.previous){
    path.push(temp.previous);
    temp=temp.previous;
  }

  for(var i=0;i<path.length;i++){
    path[i].show(color(0,0,255));
  }
}
