gst-launch-1.0 -v ksvideosrc ! video/x-raw,width=640,height=480,framerate=30/1 ! videoconvert ! jpegenc ! rtpjpegpay ! udpsink host=127.0.0.1 port=5200 sync=false
