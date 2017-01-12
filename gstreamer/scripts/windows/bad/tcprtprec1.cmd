set GST_DEBUG=1
gst-launch-1.0 -v tcpclientsrc host=127.0.0.1 port=8085 ! application/x-rtp,media=video,media=(string)video,clock-rate=(int)90000,encoding-name=(string)JPEG,framerate=30/1,payload=(int)26,sampling=(string)YCbCr-4:2:2 ! rtpjpegdepay ! jpegdec ! autovideosink
