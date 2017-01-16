set GST_DEBUG=1
gst-launch-1.0 -v --gst-debug=*:3 --gst-debug-no-color tcpclientsrc host=127.0.0.1 port=5200 ! jpegdec ! autovideosink
