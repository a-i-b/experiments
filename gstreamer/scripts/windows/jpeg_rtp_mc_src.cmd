gst-launch-1.0 -v ksvideosrc ! videoscale ! video/x-raw,width=640,height=480,framerate=30/1 ! videoconvert ! jpegenc quality=95 ! rtpjpegpay ! udpsink host=224.1.1.1 port=5200 auto-multicast=true
