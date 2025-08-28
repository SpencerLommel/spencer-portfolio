# Linux Support

I recently got a few HP EliteBook 840 G6 laptops for free! I installed Ubuntu 25.04 to test them out and then realized the fingerprint scanner unfortunately didn't work. 

I started off by running `lsusb` to see the exact fingerprint scanner I have. After this I did some research and realized this is a known issue that this device isn't supported. ([libfprint issue talking about this](https://gitlab.freedesktop.org/libfprint/libfprint/-/issues/274))

```
spencer@spencer-HP-EliteBook-840-G6:~$ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 004: ID 0408:5373 Quanta Computer, Inc. HP HD Camera
Bus 001 Device 005: ID 8087:0029 Intel Corp. AX200 Bluetooth
Bus 001 Device 007: ID 06cb:00b7 Synaptics, Inc. Fingerprint reader [HP G6]
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
spencer@spencer-HP-EliteBook-840-G6:~$ 
```

# Getting Started

The first thing we need to do is get the device in a working state for testing and gathering data. For this I needed to install Windows and install the required drivers for this fingerprint scanner. After this we can use Wireshark and USBPcap to inspect how our computer communicates with the fingerprint scanner. 