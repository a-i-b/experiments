#gst-launch-1.0 -v ksvideosrc ! videoscale ! video/x-raw,width=640,height=480,framerate=30/1 ! videoconvert ! jpegenc ! tcpserversink host=127.0.0.1 port=8085
gst-launch-1.0 -v ksvideosrc ! video/x-raw,width=640,height=480,framerate=30/1 ! jpegenc ! tcpserversink host=127.0.0.1 port=8085
