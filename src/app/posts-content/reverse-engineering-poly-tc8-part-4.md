## Getting started 

We needed to setup our Yocto directory and download the necessary files to get started:

I referenced the [NXP i.MX Yocto Project User's Guide](https://www.nxp.com/docs/en/user-guide/UG10164.pdf) to start off.
`mkdir imx-yocto-bsp`
`cd imx-yocto-bsp`
`repo init -u https://github.com/nxp-imx/imx-manifest -b imx-linux-walnascar -m imx-6.12.20-2.0.0.xml`
`repo sync`

After downloading the necessary files to get started we can create our build directory where we will make our linux image
`DISTRO=fsl-imx-wayland MACHINE=imx8mm-evk-lpddr4 source imx-setup-release.sh -b <build dir>`
(TODO: check that MACHINE was right ^^)


We aren't ready to make our final image but we will do a test run. Running this for the first time will take an extremely long time becase it needs to download all of the required source code for our image and compile it into binaries that can be used with our image.  
`bitbake core-image-base`


This `core-image-base` build command threw an error so after doing some research online I found that I also needed `efitools` so here's how we download that:
`sudo apt install efitools`

Now that we have that downloaded we can attempt to build again and see if this fixed our issue
`bitbake core-image-base`
