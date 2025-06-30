# Project Overview

This is a BMP parser written entirely in C. This allows you to open existing BMP's or create new ones using an easy to understand and simple library. You are able to read/write the entire info header and pixel data of any BMP allowing for direct low level control of the entire BMP file.

## Source Code

All the code for this project is available in [this github repo](https://github.com/SpencerLommel/spencer-bmp)

## BMP File Format Documentation

While developing this library, I relied on [this](https://www.ece.ualberta.ca/~elliott/ee552/studentAppNotes/2003_w/misc/bmp_file_format/bmp_file_format.htm) source for documentation on how to implement the BMP file format specification.

I ended up doing a full RGBA implementation as well. Most BMP parsers only do RGB so you cannot control the alpha (opacity) of an image. For the most part this is fine because most image viewers don't even support the alpha channel for BMP's. In the future I plan on writing my own image viewer that supports this as well =D

# Usage

The primary way to interact with this library is to just include the c and header files as I haven't compiled this to a library yet. Below I will demonstrate how we can generate images procedurally using a function we define.

## Generating Simple Checkerboard Pattern

```c
#include <stdio.h>
#include <stdint.h>
#include "bmp.h"

static void create_checkerboard_texture(color_32bpp_t* pixels, unsigned int width, unsigned int height,
                                        unsigned int squares_x, unsigned int squares_y,
                                        color_32bpp_t color1, color_32bpp_t color2);

int main() {
    bmp_t bmp;
    unsigned int width = 128, height = 128;

    bmp_init_data(&bmp, width, height, 32);
    color_32bpp_t* colors = (color_32bpp_t*)bmp.data;

    color_32bpp_t magenta = {255, 0, 255, 255};
    color_32bpp_t black = {0, 0, 0, 255};

    create_checkerboard_texture(colors, width, height, 8, 8, magenta, black);

    bmp_save(&bmp, "checkerboard_texture.bmp");
    bmp_destroy(&bmp);

    return 0;
}

static void create_checkerboard_texture(color_32bpp_t* pixels, unsigned int width, unsigned int height,
                                        unsigned int squares_x, unsigned int squares_y,
                                        color_32bpp_t color1, color_32bpp_t color2) {
    unsigned int square_width = width / squares_x;
    unsigned int square_height = height / squares_y;

    for (unsigned int y = 0; y < height; y++) {
        for (unsigned int x = 0; x < width; x++) {
            unsigned int offset = (y * width) + x;
            unsigned int square_x = x / square_width;
            unsigned int square_y = y / square_height;

            // Determine the color based on the square's position
            color_32bpp_t current_color = ((square_x + square_y) % 2 == 0) ? color1 : color2;

            pixels[offset] = current_color;
        }
    }
}
```

**Then we can run this like so**

Compile:

`gcc -o checkerboard documentation/examples/checkerboard-texture-example.c bmp.c`

Execute:

`./checkerboard`

### This is our output

**checkerboard_texture.bmp**
![checkerboard_texture.bmp](/projects/spencer-bmp/checkerboard_texture.bmp "width=50%")

Another cool thing about this library is that we can easily make images with functions and for loops which is really helpful for understanding control flow and how we can build images procedurally. Eventually I'd like to make an even more complex example where can generate fractals or even radial patterns easily. Maybe even polar coordinate support in the future?

## More complex example generating a brick pattern

```c
#include <stdio.h>
#include <stdint.h>
#include "bmp.h"


static void create_brick_texture(color_32bpp_t* pixels, unsigned int width, unsigned int height,
                                 unsigned int horiz_bricks, unsigned int vert_bricks,
                                 color_32bpp_t brick_color, color_32bpp_t mortar_color);

int main() {
    bmp_t bmp;
    unsigned int width = 128, height = 128;

    bmp_init_data(&bmp, width, height, 32);
    color_32bpp_t* colors = (color_32bpp_t*)bmp.data;

    color_32bpp_t brick_color = {48, 84, 201, 255};
    color_32bpp_t mortar_color = {164, 177, 219, 255};

    create_brick_texture(colors, width, height, 8, 16, brick_color, mortar_color);

    bmp_save(&bmp, "brick_texture.bmp");
    bmp_destroy(&bmp);

    return 0;
}

static void create_brick_texture(color_32bpp_t* pixels, unsigned int width, unsigned int height,
                                 unsigned int horiz_bricks, unsigned int vert_bricks,
                                 color_32bpp_t brick_color, color_32bpp_t mortar_color) {
    unsigned int h_brick_size = width / horiz_bricks;
    unsigned int v_brick_size = height / vert_bricks;

    for (unsigned int y = 0; y < height; y++) {
        for (unsigned int x = 0; x < width; x++) {
            unsigned int offset = (y * width) + x;
            color_32bpp_t cur_color;

            if (y % v_brick_size == 0) {
                cur_color = mortar_color;
            } else if ((y / v_brick_size) % 2 == 0) {
                cur_color = (x % h_brick_size == 0) ? mortar_color : brick_color;
            } else {
                cur_color = ((x + (h_brick_size / 2)) % h_brick_size == 0) ? mortar_color : brick_color;
            }

            pixels[offset] = cur_color;
        }
    }
}
```

Compile:

`gcc -o bricks documentation/examples/brick-texture-example.c bmp.c`

Execute:

`./bricks`

### This is our output

**brick_texture.bmp**
![brick_texture.bmp](/projects/spencer-bmp/brick_texture.bmp "width=50%")

## Practical uses of this library

One good use-case of this library is when you need to iterate over a set of data (like a csv) to construct an image.

I actually used this library in another one of my projects to [construct the MNIST dataset training data back into their original images](https://github.com/SpencerLommel/number-reconstructor)

The [MNIST database](https://en.wikipedia.org/wiki/MNIST_database) is a large collection of handwritten numbers that is often used for image processing and basic machine learning examples. So when you download the raw data you get a large csv table where each row is the handwritten digit value followed by NxN values where N represents each pixel in the original image.

Here is some example code of how I used my BMP parser to reconstruct MNIST data

```c
// Spencer Lommel
// May 2nd, 2025
// This file creates a BMP image for the 4th line in the mnist_train.csv dataset.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include "csv-fast-reader/csv.h"
#include "bmp/bmp.h"

static void generate_number_bmp(uint8_t* pixels_data, size_t size, uint8_t number);

int main() {
    char* row;
    CsvHandle handle = CsvOpen("mnist-in-csv/mnist_train.csv");

    // skip header row to number 4 in csv training set
    row = CsvReadNextRow(handle);
    row = CsvReadNextRow(handle);
    row = CsvReadNextRow(handle);
    row = CsvReadNextRow(handle);



    const char* col;
    col = CsvReadNextCol(row, handle);
    uint8_t number = (uint8_t)atoi(col);

    // each number is 28x28 pixels so that's where the 784 comes from (28*28)
    uint8_t pixels[784];
    size_t pixel_count = 0;


    while ((col = CsvReadNextCol(row, handle)) && pixel_count < 784) {
        pixels[pixel_count++] = (uint8_t)atoi(col);
    }

    generate_number_bmp(pixels, pixel_count, number);

    return 0;
}

static void generate_number_bmp(uint8_t* pixels_data, size_t size, uint8_t number) {
    bmp_t bmp;
    unsigned int width = 28, height = 28;

    // Initialize a 24-bit BMP, we don't use 32-bit color-depth because not all photo viewers support it
    // which is odd because it's part of the BMP spec so it should be supported >:(
    bmp_init_data(&bmp, width, height, 24);
    color_24bpp_t* pixels = (color_24bpp_t*)bmp.data;

    // Convert each intensity value to a grayscale color
    // We'll read from bottom to top to flip the image

    // The reason we are doing this flip is mostly due to my BMP parser implementation. I do plan on extending this in the future.
    for (unsigned int y = 0; y < height; y++) {
        for (unsigned int x = 0; x < width; x++) {
            // Calculate source and destination indices
            size_t src_idx = y * width + x;  // Original index
            size_t dst_idx = (height - 1 - y) * width + x;  // Flipped index

            if (src_idx < size) {
                uint8_t intensity = pixels_data[src_idx];
                pixels[dst_idx] = (color_24bpp_t){intensity, intensity, intensity};
            }
        }
    }

    char filename[32];
    snprintf(filename, sizeof(filename), "%u.bmp", number);

    bmp_save(&bmp, filename);
    bmp_destroy(&bmp);
}
```

When we compile and run this we get something like this!

![brick texture](/projects/spencer-bmp/4.bmp "width=50%")
