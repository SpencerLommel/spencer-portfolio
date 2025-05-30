# What is The Poly TC8?

The [Poly TC8](https://docs.poly.com/bundle/tc8-ug-current/page/poly-touch-controller-overview.html) is a meeting controller device created by HP. As far as I'm concerned though, it's an embedded linux device with a high-res 8" display with a speaker and it is powered via PoE. There's almost no technical documentation on this device and it seems like no one else has tried to reverse engineer it so far which made me even more interested!

![Poly TC8 Generic Product Image](/reverse-engineering-poly-tc8-part-1/Poly-TC8.webp)

# Where to Start With Hardware Reverse Engineering


## First step
I always start by powering it on and seeing what it does both physically and over the network. Sometimes you get lucky and you can reset a device and get to an admin page where you can learn a lot, and other times (like with this device) you just get a factory reset mode with little to no useful information.

Upon powering on this device there wasn't really anything useful so I won't spend too much time talking about the software that runs on these by default.

## Digging Deeper
My next plan was to tear open the device and see if there's any internal buttons, connectors (hopefully UART), or DIP Switches. Opening this device I was extremely surprised to find all 3 of these!! This is pretty rare as most internal DIP switches are removed before production making reverse engineering more tedious.

**Here's some pictures of the inside!**

![Poly TC8 PCB Front](/reverse-engineering-poly-tc8-part-1/poly-tc8-pcb-front.jpg)
![Poly TC8 PCB Back](/reverse-engineering-poly-tc8-part-1/poly-tc8-pcb-back.jpg)
