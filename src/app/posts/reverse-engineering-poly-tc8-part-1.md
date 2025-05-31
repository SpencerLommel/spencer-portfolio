# What is The Poly TC8?

The [Poly TC8](https://docs.poly.com/bundle/tc8-ug-current/page/poly-touch-controller-overview.html) is a meeting controller device created by HP. As far as I'm concerned though, it's an embedded linux device with a high-res 8" display with a speaker and it is powered via PoE. There's almost no technical documentation on this device and it seems like no one else has tried to reverse engineer it so far which made me even more interested!

![Poly TC8 Generic Product Image](/reverse-engineering-poly-tc8-part-1/Poly-TC8.webp)

# Where to Start With Hardware Reverse Engineering

## First step

I always start by powering it on and seeing what it does both physically and over the network. Sometimes you get lucky and you can reset a device and get to an admin page where you can learn a lot, and other times (like with this device) you just get a factory reset mode with little to no useful information.

Upon powering on this device there wasn't really anything useful so I won't spend too much time talking about the software that runs on these by default.

## Digging Deeper

My next plan was to tear open the device and see if there's any internal buttons, connectors (hopefully UART), or DIP Switches. Opening this device I was extremely surprised to find all 3 of these!! This is pretty rare as most internal DIP switches are removed before production making reverse engineering more tedious.

### The Internals

Front Side:
![Poly TC8 PCB Front](/reverse-engineering-poly-tc8-part-1/poly-tc8-pcb-front.jpg)

Back Side:
![Poly TC8 PCB Back](/reverse-engineering-poly-tc8-part-1/poly-tc8-pcb-back.jpg)

### What to look for

The first thing I noticed when opening up this device was the MicroUSB Port and the button that aren't normally accessible from the outside of this device! These are really good places to start because you can easily plug this into your computer and run a command like `lsusb` to get a lot of good information about the device you're working with.

I also noticed were the 2 DIP switches on the front side on the bottom left. I assumed this is probably used for something like switching the boot partition or toggling read-only mode on the device.

The last thing I immediately noticed on the front face of the board was the white surface mount connector above the ethernet jack. This is a 4 pin JST GH 1.25mm pitch connector. Typically when you see a connector like this between 2-4 pins it's a good sign because this could be a UART connector. There was another unpopulated slot for the same surface mount connector just to the left of this one which could also be useful.

## What else to look for when reverse engneering

I always like to write down a list of all the chips I see on the board and see what I'm working with. The two most imporant ones to look for are storage and the processor. When looking for storage there's quite a few options it could be NAND, QSPI, eMMC, NOR Flash, etc. In this case there was an eMMC chip.

### On board chips

- Processor: [MIMX8MM6DVTLZAA](https://www.nxp.com/part/MIMX8MM6DVTLZAA)

This was a great find because NXP chips are very well documented and I was able to find a ton of great information.

There is also an [evaluation kit](https://www.nxp.com/design/design-center/development-boards-and-designs/8MMINILPD4-EVK) for this processor. The board we are working on is extremely similar to this board in schematic and component layout so having this well documented dev board online is extremely helpful for when we try and build our own linux image for this device.

- eMMC: [KLMAG1JETD](https://semiconductor.samsung.com/us/estorage/emmc/emmc-5-1/klmag1jetd-b041/)

The operating system is almost certainly stored on here. So this is a good find.

- Ram: SK Hynix Ram (not well documented online)

I was able find online that I was dealing with LPDDR4 ram which would come in handy later when trying to build a custom linux image for this device.

# Now to try and access the device

The first thing I did was connect the Micro USB port to my computer and run `watch -n 1 "lsusb"` and powered it on. This continuously runs the command [lsusb](https://www.geeksforgeeks.org/lsusb-command-in-linux-with-examples/) every second and updates the terminal which is very handy to see if the device changes USB modes at all during the boot up process.

### The results of checking lsusb

Upon plugging the device in via Micro USB and powering it via PoE I didn't see anything useful. However when I pressed the button on the pcb (that was not accessible from outside the case) while powering I got this!

The device showed up as a "Google Inc. Nexus/Pixel Device (charging + debug)"

![Poly TC8 visible on lsusb](/assets/reverse-engineering-poly-tc8-part-1/watch-lsusb-output-poly-tc8.png)
Most of these aren't important because lsusb shows all connected usb devices. The important one is the Google Inc. one which only showed up upon plugging in the device.

This confirmed for me that this was an embedded android device which gives us a lot of options for breaking into this device. (Especially because of the debug mode, this is a great sign!)

# Now we know what's running on here, what next?

Luckily for us Android has some awesome debugging tools that gives us easy access to this device. All we need to do is install [adb](https://developer.android.com/tools/adb) which is the Android Debug Bridge. This allows us to connect to the device in debug mode and do some cool stuff, most important for us is getting a shell on this device so we can extract the firmware and try and rip out the [device tree](https://en.wikipedia.org/wiki/Devicetree) which is a very important part of linux which tells the Kernel the hardware addresses of different components and peripherals on a system. For example this tells the Kernel what hardware addresses ram is connected to or how to receive data from a camera module.

## Getting a Shell!

Next we can run `adb devices` and boot the device into recovery mode by holding the onboard button. Once it loads we will see a device popup and we can run `adb shell` to connect.

![Poly TC8 visible on lsusb](/assets/reverse-engineering-poly-tc8-part-1/adb-shell-poly-tc8.png)

## Hello and goodbye shell

We have a root shell! You might think this is it, but less than 10 seconds after connecting we get kicked out of our shell we worked so hard for :(. An important part of most Embedded Android images is [SELinux](https://www.redhat.com/en/topics/linux/what-is-selinux), which is Security Enhanced Linux. This runs some initialization programs that slowly lock down the system as it boots blocking unneccesary features and disabling parts of the kernel that aren't needed.

The next thing we need to tackle is finding a way to interrupt this boot process to gain a persistent shell where we can really dig into the internals of this device. The difficult part is that we're working on a limited time frame and each time we get kicked out we must restart. This means we need to act fast and come up with a game plan before booting into the system.

# Disabling SELinux to get a persistent shell

Because this post is getting pretty long I'm going to break this up into a few parts.

In [part 2](/projects/reverse-engineering-poly-tc8-part-2) we will see what linux services are running on this device and how we can quickly take some logs to come up with an attack plan to stop SELinux. This way we will have some more time in our shell to do a firmware extraction.

After this I'll go over extracting the firmware so we can do a more in-depth look at what's going on in our system and how we can extract a device tree which is an extremely important bit of information to have to create a new Linux image with this device using a tool like [Yocto](https://www.yoctoproject.org/)
