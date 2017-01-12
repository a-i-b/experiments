set GST_DEBUG=1
gst-launch-1.0 -v udpsrc address=127.0.0.1 port=8085 ! jpegdec ! autovideosink
