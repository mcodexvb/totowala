'use strict';
/* models: state and start-up code */
const rbC={};
const glassM=new T.MeshLambertMaterial({color:'#a9cfe0',transparent:true,opacity:.6,flatShading:true});
const blobG=new T.CircleGeometry(1,14),blobM=new T.MeshBasicMaterial({color:'#000',transparent:true,opacity:.3,depthWrite:false});
const torG=new T.TorusGeometry(1,.09,6,18);
const paintMat=new T.MeshLambertMaterial({color:'#f6c915',flatShading:true}),chassisMat=new T.MeshLambertMaterial({color:'#1d7f4a',flatShading:true});
let stickerMesh;
const PCOL=['#d6452d','#2c7be5','#f2b01e','#8e44ad','#16a085','#e8e0c8'];
