gst-launch-1.0 -v ksvideosrc ! video/x-raw,width=640,height=480,framerate=30/1 ! jpegenc ! rtspsink service=8085
