# The new LTS Kernel!

6.18 just released November 2025 and it has since been confirmed that it will be the next LTS kernel! With this in mind, I decided to try it out and see what issues I would face on Linux Mint and try and document some of the issues I noticed and how they can be fixed.

# Compiling from source

The first step is to clone the kernel repository locally. After this we can checkout what kernel we would like to build and go from there!

`git clone https://git.kernel.org`

From here, we can look for the most recent kernel release and check it out.

```output
➜  linux-stable git:(master) ✗ git tag | grep v6.18
v6.18
v6.18-rc1
v6.18-rc2
v6.18-rc3
v6.18-rc4
v6.18-rc5
v6.18-rc6
v6.18-rc7
v6.18.1
v6.18.2
v6.18.3
v6.18.4
v6.18.5
v6.18.6
v6.18.7
➜  linux-stable git:(master) ✗ git checkout v6.18.7
Updating files: 100% (12699/12699), done.
Note: switching to 'v6.18.7'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 5dfbc5357c34 Linux 6.18.7
➜  linux-stable git:(v6.18.7) ✗ 

```

### Config File
Once we have checked out the tag of the version we would like to compile we will need to specify a `.config`. This contains a list of flags that tells the compiler what we want to include in our Kernel. An easy way to do this is to just start with our current one.

```sh
cp -v /boot/config-$(uname -r) .config
make localmodconfig
```

Unless you have already setup setup distro signing infrastructure on your computer, you will probably need to set the following config options. Distro and module signing is too involved for this post but I would highly recommend looking into it! :)

```sh
scripts/config --disable SYSTEM_TRUSTED_KEYS
script/config --disable SYSTEM_REVOCATION_KEYS
scripts/config --disable SYSTEM_REVOCATION_KEYS
scripts/config --set-str CONFIG_SYSTEM_TRUSTED_KEYS ""
scripts/config --set-str CONFIG_SYSTEM_REVOCATION_KEYS ""
```
 
### Compiling

The nproc command prints the number of processing units available, I'd recommend using half if you still want to do other tasks on your computer. Otherwise you can use all and it will speed up the compile time.

```sh
➜  linux-stable git:(v6.18.7) ✗ nproc
16
➜  linux-stable git:(v6.18.7) ✗ fakeroot make -j8
```

### Installing our newly compiled Kernel
After this you need to actually install the Kernel and then you can reboot into it!

```sh
sudo make modules_install
sudo make install
```

Once this is done, we can reboot our system and we should automatically boot into our new Kernel! (Unless you have some GRUB setting to use the last used Kernel like `GRUB_DEFAULT=saved`)




# Testing out our system

The first thing we want to do is confirm that we have actually loaded into our new Kernel. We can do this with the `uname` command

```sh
➜  linux-stable git:(v6.18.7) ✗ uname -r
6.18.7
➜  linux-stable git:(v6.18.7) ✗ 
```

## Fixing USB issue

The first major issue I noticed was USB devices like my mouse and keyboard were not working. Because this was a pretty major blocker I ended up restarting my computer and using GRUB I booted into my old `6.14` kernel. I figured this would be some sort of USB config issue so I started off with searching for config options related to USB and HID (Human Interface Device which is the protcol most keyboards and mice use) settings. To fix this we will need to use `make menuconfig` to search through our Kernel config options and modify them.

I eventually found `USB HID transport layer` which was disabled. I enabled this as `<M>` which means that it will be loaded as a kernel module and `<*>` means it will it be actually built into the kernel which increases the kernel size but generally boots faster.

![Kernel menuconfig "USB HID transport layer" option](/kernel-6.18-with-linux-mint/USB-HID-option-to-fix-peripheral-issues.png)


After this we just need to save our `.config` with our new settings and then recompile.

### Recompiling and reinstall
 
When recompiling and running `update-initramfs` below you should not be in the same kernel version. So if you are compiling 6.18.7 like me you should not be in kernel 6.18.7 while doing so.

Below you can replace the make command with something like `make -j8` to use 8 cores. I prefer `-j$(nproc)` which just uses all cores.

```sh
make -j$(nproc)
sudo make modules_install
sudo make install
sudo update-initramfs -c -k 6.18.7
```

After this, you can reboot back into `6.18.7` with your `.config` changes and check if it works!

## Fixing Docker issue

All other `.config` changes will follow the same process as abvoe so instead of repeating it for each section I'll just expain what issue I noticed and what `make menuconfig` setting I adjusted to fix it.


I noticed when trying to start any Docker container that binds to a virtual ethernet address I was having this error.
```t
➜  ~ sudo docker start 3dd27fe75437
Error response from daemon: failed to set up container networking: failed to create endpoint dev-container-mariadb on network mariadb_default: failed to add the host (vethc31ad62) <=> sandbox (vethb273059) pair interfaces: operation not supported
failed to start containers: 3dd27fe75437
➜  ~ 
```

To fix this, I had to enable "Virtual ethernet pair device" in `menuconfig`. I once again enabled this as a Kernel module rather than including it with the Kernel. I typically do this when I'm still debugging so that the Kernel at least loads but once you have finalized all of your settings you can include it in the Kernel as well.


![Kernel menuconfig "Virtual ethernet pair device" option](/kernel-6.18-with-linux-mint/config-veth-menu-option-to-fix-docker-issue.png)


## TL;DR what Kernel .config settings do I need to change?


```sh
CONFIG_USB_HID=y
CONFIG_VETH=y
```

Here is my entire `.config` as well!
<Log src="/kernel-6.18-with-linux-mint/linux-mint-6.18.7.txt"></Log>


I will continue to use Kernel 6.18.7 for the next few weeks and if I find any other issues that I can fix with `.config` changes I will update here 