import React,{useState,useEffect,useRef,useLayoutEffect} from "react";
import { Button } from "react-bootstrap";

export default function ScanProduct(){

    const [snapshotTaken,setSnapshotTaken] = useState(false);
    const [detected,setDetected] = useState(null)
    const canvas = useRef(null);
    const video = useRef(null)

    useEffect(()=>{
      startStream();
    },[])

    useLayoutEffect(() => {
        return () => {
          video.current.style.display = "inline-block"
          const stream = video.current.srcObject;
          const tracks = stream.getTracks();
          tracks.forEach((track)=>track.stop())
      };
    }, [video])

    useEffect(()=>{
      if(snapshotTaken) takeSnapshot()
      if(!snapshotTaken) startStream();
    },[snapshotTaken])

    const startStream = () => {
      setDetected(null);
      if(video && canvas){
        var options = { 
          video:{
            width: {ideal:window.clientWidth},
            height:{ideal: window.clientHeight},
            facingMode: { exact: "environment" } 
          }, 
          audio:false 
        };  
        navigator.webkitGetUserMedia(options,(stream) => { 
          video.current.srcObject = stream;
        }, 
        function(e) { 
          console.log("error happened"); 
        } 
        );
      }
    }

    const barcodeDetector = new BarcodeDetector({
      formats:["aztec","code_128","code_39","code_93","codabar","data_matrix","ean_13","ean_8","itf","pdf417","qr_code","upc_a","upc_e"]
    });

    const takeSnapshot = async () => {
      const width = parseInt(window.getComputedStyle(canvas.current).width);
      const height = parseInt(window.getComputedStyle(canvas.current).height);
      if(snapshotTaken){
        let img = canvas.current.getContext("2d");
        img.drawImage(video.current, 0,0,width - 75,height / 2.7);
        console.log(img);
        canvas.current.src = canvas.current.toDataURL();
        barcodeDetector.detect(canvas.current).then((barcodes)=>{
          console.log(barcodes);
          setDetected(barcodes);
          })
        }
    }

    return(
        <div>
            <canvas ref={canvas} style={{display:`${!snapshotTaken ? "none" : "inline-flex"}`,width:"100vw",height:"50vh"}}></canvas>
            <video ref={video} autoPlay style={{display:`${snapshotTaken ? "none" : "inline-flex"}`,width:"375px",height:"50vh"}}></video>
              { detected ?
                detected.map((barcode,i)=>{
                  return <p key={`barcode-${i}`} style={{color:"white"}}>{barcode.rawValue}</p>
                })
                :
                null
              }
            <Button variant="primary" onClick={(e)=>setSnapshotTaken(!snapshotTaken)}>
              {
              snapshotTaken ?
              'Переснять'
              :
              'Сделать снимок'
              }
            </Button>
        </div>
    )
}