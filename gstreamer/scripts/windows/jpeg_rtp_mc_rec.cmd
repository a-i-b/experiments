gst-launch-1.0 -v udpsrc buffer-size=10000000 auto-multicast=true multicast-group=224.1.1.1 port=5200 ! application/x-rtp,encoding-name=(string)JPEG,framerate=30/1 ! queue ! rtpjpegdepay ! jpegdec ! autovideosink
rem ! rtpjitterbuffer latency=100 drop-on-latency=true  
