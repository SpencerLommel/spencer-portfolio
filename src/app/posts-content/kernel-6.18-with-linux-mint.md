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

