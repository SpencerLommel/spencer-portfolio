# Configuring multiple services in a terminal can be a pain
Often times, I need to setup multiple user accounts for a website I host or need to deploy a new service like MySQL where I just need to quickly generate a random but highly secure password.

Unlike most browsers these days, there is no button in a terminal that lets you quickly fill in a random password! That's why I made this Applet so I can quickly just click a button and have a secure password copied to my clipboard that I can paste anywhere.

## Source code

This links to the official linux mint repo instead of my local one for development. That way you can see the amazing contributions from others as well =D

[linuxmint applets repo](https://github.com/linuxmint/cinnamon-spices-applets/commits/master/password-generator@spencerlommel.com)


## Highly configurable 
Sometimes when you're setting things up in a termianl you need to be mindful of symbols. Like this MySQL example for instance:
`mysql -u root -p'P@ss!word'`

If you ran this in a bash terminal, it's likely that `!` will cause this to fail as the exclamation mark is reserved for history expansion unless escaped like this `\!`

Because of this I added an option to quickly disable symbols to prevent errors like this
![Password configuration options](/projects/linux-mint-password-generator/screenshot.png "width=100%")


Also, in case you don't use a tool to save your clipboard history like [Clipman](https://docs.xfce.org/panel-plugins/clipman/start) and you're worried about overwriting your clipboard history on accident. There is also a setting where there is a password popup instead to prevent accidental clicks!

![password-popup-option.png](/projects/linux-mint-password-generator/password-popup-option.png "width=100%")