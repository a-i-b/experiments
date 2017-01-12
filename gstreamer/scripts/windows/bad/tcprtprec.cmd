set GST_DEBUG=1
gst-launch-1.0 -v tcpclientsrc host=127.0.0.1 port=8085 ! application/x-rtp,payload=96,encoding-name=(string)JPEG ! rtpjitterbuffer ! rtpjpegdepay ! jpegdec ! autovideosink sync=true
