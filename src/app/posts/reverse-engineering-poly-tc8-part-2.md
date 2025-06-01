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



## We got the logs!

<Log src="/reverse-engineering-poly-tc8-part-2/dmesg-log.txt"></Log>


If you scroll all the way to the end you'll see some lines mentioning `hal`. This refers to the [Hardware Abstraction Layer](https://source.android.com/docs/core/architecture/hal) (Not HAL 9000) and we notice that it's killing some processes. This tells us that our device is transitioning from Fastboot mode to Userland mode which is more locked down to only have the features our users could need. 


# How to see what's running

Well we got the logs of what's happening, but now we want to see what's running. Once we have this we will be able to come up with some commands we can execute to stop SELinux from booting us out.

We will start with running `adb shell "ps -A -o USER,PID,PPID,NAME" > process-list.txt`. This will dump a list of all the processes running on our device that we can search through and see what we should try and stop.

I ran this command a few different times, this is because some processes might start later on or exit early so I just grabbed a few copies throughout the boot process to see what I get.


![Getting a list of running processes on our device](/assets/reverse-engineering-poly-tc8-part-2/process-list.png)

Here's the contents of `process-list3.txt` that we extracted from the device. 

<Log src="/reverse-engineering-poly-tc8-part-2/process-list3.txt"></Log>


# Stopping SELinux from kicking us out

The next part is mostly trial and error, but we search through this list of processes that are running and write a command to try and kill some of them. We are esentially trying to stop the system from locking us out as it boots up.

Because this is mostly trial and error and there's quite a few technical details that go along with identifying processes that are associated with SELinux or the startup process I will just skip to the shell command that ended up working for me.

I originally started with killing a bunch of different services and this worked! I now had a persistent shell and I wasn't kicked out of the device.

```bash
pkill -9 system_server
pkill -9 surfaceflinger
pkill -9 com.android.settings
pkill -9 android.hardware.graphics.composer@2.4-service
pkill -9 bootanimation
pkill -9 com.android.networkstack.process
pkill -9 logcat
pkill -9 mdnsd
pkill -9 logd
pkill -9 usb
pkill -9 servicemanager
pkill -9 zygote
sync
echo 3 > /proc/sys/vm/drop_caches
```

After I confirmed this was working I started removing some to get to a more minimally invasive script. That way we can try and maintain a system that is as close to the original as possible.


# The Persistent Root Shell

This is what I ended up with and killing these specific services prevented me from getting kicked out of my shell or loosing permissions! 
```bash
pkill -9 com.android.settings
pkill -9 logd
pkill -9 usb
pkill -9 servicemanager
pkill -9 zygote
sync
echo 3 > /proc/sys/vm/drop_caches
```


![dmesg command output](/assets/reverse-engineering-poly-tc8-part-2/freezing-the-device.png)




![dmesg command output](/assets/reverse-engineering-poly-tc8-part-2/dmesg-after-freeze.png)


