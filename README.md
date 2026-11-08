# Mehr Licht Photos

This is the source code for [mehrlicht.photos](https://mehrlicht.photos), my personal photography website.

If you’re interested in how this website was built, you can read [my article about the process of migrating it from Eleventy to Astro](https://moritzlost.dev/articles/eleventy-to-astro/).

## Optimize images

Resize + optimize:

```shell
mogrify -auto-orient -resize "3000x3000>" -quality 80 -strip *.jpg
```

Optimize only:

```shell
jpegoptim --strip-all --max=80 *.jpg
```

© Moritz L'Hoest
