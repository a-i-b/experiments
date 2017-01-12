gst-launch-1.0 -v udpsrc port=5000 ! gdpdepay ! rtph264depay ! h264parse ! h264dec ! videoconvert ! autovideosink sync=false
