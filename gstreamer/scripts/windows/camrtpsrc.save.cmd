gst-launch-1.0 -e ksvideosrc ! video/x-raw,width=640,height=480,framerate=30/1 ! tee name=tp ! queue leaky=1 ! jpegenc quality=95 ! rtpjpegpay ! udpsink host=127.0.0.1 port=5200 sync = false tp. ! queue ! videoconvert ! video/x-raw, format=I420 ! x264enc ! mp4mux ! filesink location="D:/Data/video.mp4"

