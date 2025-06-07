# Exploring the file system

Now that we have a persistent shell and we aren't kicked out immediately by SELinux hardening the system after recovery mode. We can start to explore the system more and extract some important files like the boot partitions, kernel boot args, device trees, etc.

The first step is to just run some commands to see what we're working with 

<Log src="/reverse-engineering-poly-tc8-part-3/exploring-the-file-system.txt"></Log>

## Block Devices
I first ran `ls` just to see what files were in our starting directory to see if anything immediately stood out

I then ran 
`mount`
`lsblk`
`cat /proc/mounts` 

to see what block devices were mounted on our device. This gives us some idea of where files might be located and whether or not we can modify them to perform some more advanced exploits like potential persistent changes to the eMMC.

`lsblk` unfortunately wasn't included in this linux system but that's fine because we got a ton of valuable information from the other two commands.

## Kernel and DTB extraction 

Now this is big, this will allow us to reverse engineer how the device works and find the hardware addresses of all the peripherals on the board (ram, eMMC, I2C interfaces, UART ports, etc)

![Extracting the linux images](/assets/reverse-engineering-poly-tc8-part-3/device-image-extractions.png)
As you can see we successfully extracted a `boot_a,img`, `dtbo_a.img`, `system_a.img`, `vbmeta_a.img`, `vendor_a.img`. Some of these won't be useful but the boot, dtbo, and system image will be incredibly useful. (possibly the vendor too? I haven't actually looked into it yet :p)


## Mounting the file system on our machine

Next I'm just going to quickly confirm that we can mount our extracted image to a directory on my laptop. Once we see this working we will know we have a valid firmware extraction!!

![Can anyone even read these anyways?](/assets/reverse-engineering-poly-tc8-part-3/valid-firmware-extraction.png)

WOO! This is where project gets exciting! We have the device files on our machine in our control. From here we can search through it and extract what we need to finally start working on our own linux image for this device :--)

You might notice some red links above, those are broken symlinks because in the actual device they link to other locations on the device filesystem. This is fine though because we extracted all the data, it's just not linking to the correct spot because it's in a different spot on my computer compared to the device.

## Extracting the DTB and converting it to a DTS

When a linux image is compiled, it starts with source code which is then compiled down to machine readable code like a .img or .dtb. This gets rid of unnecesary information and only contains info the system needs. 

Because of this, the .img only contains a DTB which is a Device Tree Blob. What we need is a DTS or Device Tree Source. 


Now we will extract the DTB from our image. This can easily be done with tools like [extract-dtb](https://pypi.org/project/extract-dtb/)

![dtb extraction](/assets/reverse-engineering-poly-tc8-part-3/dtb-extraction.png)


We now have DTB that we extracted from our image which we extracted from our board! The next step is to convert this to a DTS file we can use to build a new linux image


![dts from da dtb from da board that will be turned back to a dtb and go back on da board](/assets/reverse-engineering-poly-tc8-part-3/dts-from-dtb.png)

We now have a DTS! This is in the correct format that we can use with Yocto.


### The Extracted DTS
Here is what our DTS file looks like for those who are curious. It's essentially just a file that maps physical addresses on a board to the processor so we know what routes to take when interacting with them.

It's essentially like a roadmap that tells us how to get to each peripheral
<Log src="/reverse-engineering-poly-tc8-part-3/poly-tc8.dts"></Log>
