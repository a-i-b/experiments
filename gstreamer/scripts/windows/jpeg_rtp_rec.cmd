gst-launch-1.0 -v udpsrc port=5200 caps="application/x-rtp,encoding-name=(string)JPEG,framerate=30/1" ! queue ! rtpjpegdepay ! jpegdec ! autovideosink sync=false
rem ! rtpjitterbuffer latency=100 drop-on-latency=true  
