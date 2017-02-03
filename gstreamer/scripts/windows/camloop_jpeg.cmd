gst-launch-1.0 -v --gst-debug=*:3 ksvideosrc ! image/jpeg, width=1280, height=720, framerate=30/1 ! jpegdec ! autovideosink
