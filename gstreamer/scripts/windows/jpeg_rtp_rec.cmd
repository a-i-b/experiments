gst-launch-1.0 -v udpsrc port=8085 caps="application/x-rtp,encoding-name=(string)JPEG,framerate=30/1" ! rtpjpegdepay ! jpegdec ! autovideosink sync=false
rem ! rtpjitterbuffer latency=100 drop-on-latency=true  
