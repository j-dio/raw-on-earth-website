# Screens, sizes and devices

Notes for anyone changing the layout. Written 2026-09-18, after a day spent working out why the same site looked different on two laptops.

## Two people, two laptops, two different sites

A screen's resolution is not the width the browser reports. Windows display scaling sits in between. On a 1920x1080 panel:

| Windows scaling | What CSS sees |
| --- | --- |
| 100% | 1920px |
| 125% | 1536px |
| 150% | 1280px |

So two people with identical 1920x1080 laptops can be looking at a 1280px page and a 1920px page. Neither is wrong and neither is a bug. If a teammate says your change looks different on their machine, ask what width their browser reports before touching any code. In the console:

```js
window.innerWidth
```

Macs do the same thing through their own scaling. The defaults commonly land around 1470, 1512 and 1728.

## The widths worth testing

Not every width is equally likely. These are the ones real people arrive on:

- 1280, a 1920 panel at 150%
- 1366, older laptops
- 1440
- 1470 and 1512, common Mac defaults
- 1536, a 1920 panel at 125%
- 1920, a 1920 panel at 100%
- 1024 and 834 for tablets
- 390 for phones

Testing 1440 alone is how the hero stayed broken for weeks. It sagged between 1280 and 1536 and looked correct on either side of that band.

## How the hero holds its shape

Every part of the home hero is a fixed share of the viewport width, and it stays that share from 1024 all the way to 1920:

| Part | Share of screen width |
| --- | --- |
| YOGA LIFE heading | 4.50% |
| Standfirst under it | 1.63% |
| The enso ring | 70% |
| Gap from the ring's centre to the Y of YOGA | 10.46% |

Those numbers are the 1280 render turned into slopes, which is why a 1280 screen did not move when this was fixed. If you change a size in the hero, measure it at three or four widths and check the percentage holds. A number that drifts as the screen widens is the bug coming back.

### The mistake that caused it

The hero used `clamp()` with a low ceiling, plus a `2xl:` override that only started at 1536px. Between the ceiling being reached around 1250px and `2xl` starting, nothing grew while the frame kept growing. At 1512 the heading had fallen to 3.81% of the screen and the ring to 66%.

If you write a fluid size, give it one continuous ramp and put the ceiling somewhere nobody will hit. Do not patch a low ceiling with a breakpoint override. The gap between them becomes a dead zone that only shows up on the widths you did not test.

## Taking screenshots

The README covers this: use `scripts/shot.mjs`, never `chrome --window-size`, and build to `.next-qa` so the dev server and the build do not overwrite each other. Read that section before your first capture.

What it does not say is which widths to point it at. Use the list above, and always include one phone width.

## Checking contrast without fooling yourself

Sampling the pixels inside a text element gives a useless answer twice over. The glyph pixels are the text colour, so you read 1:1, and the anti-aliased edges invent failures that are not there.

What works: screenshot the page twice. Once normally, and once with the text made transparent so the backgrounds stay. Measure the text colour against the worst pixel of the second screenshot inside the text's own box.

Two things produced wrong answers before we caught them.

A rounded button has page showing through the corners of its box. Sampling those reads whatever is behind the button rather than the button, which scored the header CTA at 1.00:1 against its own page. Inset by the corner radius.

The desktop dropdown is closed at rest but still reports a full box. Measuring it reads the page through a panel nobody can see. Skip anything clipped, faded or hidden.

Small text needs 4.5:1. Text at 24px or larger needs 3.0:1. After the last pass the lowest reading anywhere in the header was 5.22:1.

## The .page-hero trap

`globals.css` carries this rule:

```css
.page-hero > *:not(.brand-mark) { position: relative; z-index: 1; }
```

It beats Tailwind's `absolute` on a direct child. Put `.page-hero` on a section whose first child is an absolutely positioned image layer and the photograph drops out of the background and stacks above the type instead. On /workshops that produced a masthead 1352px tall with the H1 sitting at y=1029, underneath an 810px picture.

A photographic masthead must not carry the `.page-hero` class. The entry animations are `.page-hero-in` and `.page-hero-title` on the children and work without it.

## The header's light and dark rule

The header paints light type over dark grounds and dark type everywhere else. Two things to know before adding a route.

Light type is gated on the home page and anything under `/mentorship/`. It matches on the path prefix rather than a list of page names, so a new audience page added as data does not silently get unreadable navigation. The `/mentorship` index itself is light and must not match, which is what the trailing slash is for.

There is a scrim behind the header whenever its type is light. Do not remove it while tidying. Light type always sits over a photograph, so its readability depends on the image rather than the palette, and a new crop can break it with no code change at all. Before the scrim existed, "Yoga & Meditation" measured 3.67:1 on the home hero.

If you add a page with a dark masthead, add its path to that rule and measure the header on it.

## Phones and tablets

The desktop navigation row only appears at 1280px and up. Below that it is a full screen overlay from one button.

Service images are hidden below the `sm` breakpoint, so a picture that reads well on a laptop may not appear on a phone at all. Check what the phone actually gets rather than assuming it is a narrower version of the desktop.

The medallion at the foot of the mobile hero is 196px because the hero copy ends at y=641 on a 390x844 phone and her face sits 10 to 28 percent down the crop. A larger circle puts her face behind the buttons. That number was measured against an older hero, so measure it again before trusting it.

## Photographs

`ffprobe` lies about two things in this project's photo folder, and both cost an hour to find.

HEIC files report tile dimensions rather than image dimensions. One 5712x4284 photograph reported 640x896. Decode to a flat PNG with ffmpeg first, then read the size and crop from that.

JPEGs from phones carry an EXIF rotation flag. `ffprobe` reports the stored size while ffmpeg rotates before your crop runs. One file reported 6000x4000 and the crop landed on a 4000x6000 frame, which put the subject at 21% of the picture with her feet cut off.

Crop by looking at the result at the size it renders, not by centring and hoping. A service image is about 192px wide on screen. A wide scene with several small figures turns to mush at that size.

## Before saying it works

Build it, do not just look at the dev server. The README has the commands and explains why the build goes to `.next-qa`.

Check the change at more than one width, and check a phone width. If you touched a colour, or put text over a photograph, measure the contrast rather than judging it by eye. The palette is the trap here: sage on linen and sand on clay both look fine and both fail 4.5:1.

## One more thing about deploys

Vercel is the review copy. Production is the client's Hostinger, which has never had a deploy, so a green Vercel build tells you nothing about whether the real site works.

The review copy has to stay out of search results. `NOINDEX=1` is set per Vercel project and read at build time, and the code tests it with a strict string comparison:

```ts
export const isPreview = process.env.NOINDEX === "1";
```

`true`, `yes` or `1` with a trailing space all evaluate false and the site builds fully indexable with no warning anywhere. After any change to that variable, open `/robots.txt` on the deploy and read `Disallow: /` with your own eyes.
