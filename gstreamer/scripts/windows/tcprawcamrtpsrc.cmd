gst-launch-1.0 -v ksvideosrc device-index=0 ! video/x-raw,width=640,height=480,framerate=30/1 ! videoconvert ! rtpvrawpay ! tcpserversink host=127.0.0.1 port=5200
