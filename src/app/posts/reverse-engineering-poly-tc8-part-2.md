# What next?

In the the [last part](/projects/reverse-engineering-poly-tc8-part-1) I mentioned that SELinux was kicking us out shortly after logging in. However I never mentioned how I found that out, the first thing I will go over is how we will quickly collect logs on sytem startup so we can see what's kicking us out and come up with a plan to stop it.


## Retreiving dmesg logs

We will want to extract some logs from the device from the moment it starts up to as soon as it kicks us out. These are logs are accessed with the [dmesg](https://en.wikipedia.org/wiki/Dmesg) (diagnostic messages) command in linux 

We can run `watch -n 1 "adb devices"` and as soon as we see our device come online we will want to run `adb shell dmesg -w | tee dmesg-log.txt`

This will run the command `dmesg -w` on our target device we are connected to but it will pipe the output of this command to a file on our computer called `dmesg-log.txt`.

![dmesg command in terminal](/assets/reverse-engineering-poly-tc8-part-2/dmesg-command-running.png)

As this command runs we see our device connected on the left and our log output on the right. Once we get kicked out of this device we can start to look through the logs.


Here we can see the logs successfully saved to our computer!
![dmesg command output](/assets/reverse-engineering-poly-tc8-part-2/dmesg-command-output.png)
