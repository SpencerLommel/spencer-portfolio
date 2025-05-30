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

- eMMC: [KLMAG1JETD](https://semiconductor.samsung.com/us/estorage/emmc/emmc-5-1/klmag1jetd-b041/)

The operating system is almost certainly stored on here. So this is a good find.

- Ram: SK Hynix Ram (not well documented online)

I was able find online that I was dealing with LPDDR4 ram which would come in handy later when trying to build a custom linux image for this device.

# Now to try and access the device

The first thing I did was connect the Micro USB port to my computer and run `watch -n 1 lsusb` and powered it on. This continuously runs the command `lsusb` every second and updates the terminal which is very handy to see if the device changes USB modes at all during the boot up process.


<!-- Talk about monitoring lsusb and what I see -->

<!-- Talk about holding down the on board button while doing the same thing and see what happens differently -->

<!-- Talk about ADB and running "watch -n 1 adb devices" while doing the reboot thing and this allows me to connect via an ADB Shell -->


<!-- Maybe end part 1 here to prevent run on??? I could end with mentioning the issue of the device kicking me out and have a short description of what I'll try next... -->


<!-- Talk about how I was able to get a device shell but during the bootup process it slowly gets more secure so I need to some how stop this from happening -->

<!-- Talk about using adb shell to run the "dmesg" command and pipe it to a log file on my computer that I could analyze without worrying about the device crashing -->

<!-- Talk about looking through the dmesg log and coming up with a script to kill running services that I could run on startup to interrupt the boot process -->

<!-- Talk about getting a working script and finally being able to look into the device -->

<!-- Talk about attempts to compress and extract the files and running into issues of limited space so needing to make a program to one by one compress them, extract them with adb shell, delete them, and do that for all files -->

<!-- Talk about extracting the device tree, explain what this is used for, and wrap up this post because it's getting long and I'll talk about it more in a part 2 -->