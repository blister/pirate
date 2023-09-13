## 2023 Reflections ##
This library was developed 18 years ago by a young,
overly-eager software developer having fun with "Web 2.0" concepts. It's 
intentionally cringey, but there were some cool ideas in here that I wish
I'd properly explored. One of the things that was the main direction I was
trying to take this library was in dynamically lazy-loading packages (called "Ships")
inserting libraries into the DOM dynamically via CDN only when the code was executed.

I had this big vision of having something like npm filled with all sorts of 
beautiful little packages that would be available to **any** JS project, not 
by installation or configuration, but brought in **as needed, when needed**.

It was going to be something like this:
```js
var soap = Pirate.Captain('SOAP');
```
By defining the "SOAP" package via `Pirate.Captain` and storing it in the 
`soap` variable, behind the scenes `pirate!` would dynamically insert a script
tag for `//somepiratecdn.com/Net/SOAP/SOAP.js`. This script tag would fire
a `pirate!`-specific "loaded" event when the script tag had been added to the
DOM and the `soap` variable would be replaced with an actual class constructor
for the actual SOAP package.

I had a plan for getting around the asynchronous nature of JS by having the
`Pirate.Captain` function provide a wrapper around the empty `Ship` object
and capture any function calls and arguments made in the milliseconds (and sometimes
seconds) needed to fetch that JS file and bring it in to the JS engine. Once 
loaded and the "loaded" event had fired, all of those functions and arguments would
be re-executed in sequence, making the entire process feel transparent.

2005 - 2007 was a **wild** time to be a web developer. Microsoft had released
the `ActiveXObject('Microsoft.XMLHTTP')` class a few years earlier and Firefox
had just recently implemented it in their `XmlHttpRequest()` class. But as a 
community, everything going on was a wild rollercoaster of browser-compatability,
new libraries, applications that didn't need page reloads, and all sorts of
crazy things. We had no idea what we were doing and everyone was trying to invent
the future of Web Development.

I was still supporting IE5!!! It was a crazy time, and I miss those early years.

What follows below is the original (final) README file of the pirate! JS library,
last updated in late 2006. I found this and was really surprised at how well
I loved what I'd written. Had I not tried to be funny and named everything
"pirate-themed", there were some really good bits and pieces in here that kind
of resemble the way things work today with node/npm/bun and all the other
bits and pieces we've cobbled together over the past 15 years.

I didn't want to lose this code again, so... to GitHub it goes! 

Avast, ye dogs!

------------------------------------------------------------------

pirate! (0.2.5)
a JavaScript Library by Eric Ryan Harrison
https://github.com/blister/pirate

- What is pirate!?
- What's with the crazed versioning?
- Who the hell is Eric Ryan Harrison?
- I'll kill you!

------------------------
    What is pirate!?
------------------------
pirate! is the product of my frustration at the JavaScript development 
community. For years, I avoided JavaScript like the plague because of 
the painful experience I had with it quite a few years ago ( think IE 5 
timeframe ). Over the last year, I watched as JavaScript went from a 
language I would dread to see put to use in production websites to a 
language I wished other languages could emulate more. Object orientation 
in JavaScript was a fun (if not slightly confusing) spin on the boring 
old Classy OOP that every other language on the planet seemed to be using.

The prototype method allowed developers to extend the JavaScript language 
in ways that I never even could have imagined to be possible, and I clamored 
to join the cool kids on the block when I saw what people like Sam Stephenson 
were doing with prototype.js.

Needless to say, all of these new and improved libraries have one major 
problem: they don't play well together. I've spent hours upon hours debugging 
prototype.js for things like crazy errors that only occur if you import the 
js file in a script tag twice on the same page. Basically, I'm sick of it. 
If I want a feature from prototype.js and a few clever little effects from 
Scriptaculous, I shouldn't have to load over 2500 lines of JavaScript code 
just to make it work.

As a perl developer by day, a CPAN like solution seemed to be needed. As a 
clever JavaScript fanboi that I am, I am aware of the OpenJSAN Project and 
I fully support their work. It just left me feeling lacking. I'm sick of the 
same old routine in my development. I've typed so many functions named things 
like 'import()' and 'use()' and 'require()' and 'define()' and on and on and 
on that I just snapped.

And here, when the dust settles around my pissed off corpse, you find lying 
in the mud next to my body, a JavaScript library that attempts to kick more 
ass than anything else with no apology for hurt feelings. pirate! may be a 
waste of time, but dangit, it's going to be a fun waste of time.

So, without further ado, I give you pirate! The JavaScript library for people 
who are ticked off about how boring programming is becoming.

-------------------------------------------
    Who the hell is Eric Ryan Harrison?    
-------------------------------------------
I'm just a guy who writes code for a living. Nobody special. Heck, to be 
honest with you I'm not even that good at it. I just like it. I also like 
peanut butter sandwiches and Samuel Adams beer. The new Web2.0 crowd 
contains a handful of people who everyone recognizes and I'm certainly not 
one of them. I may or may not be qualified to write a JavaScript library, 
but I don't really care what you think. It's already written now, so there 
is not much you can say or do that will change my mind. If you disagree with 
me, I have a rapier that might change your mind. Or a cat. My cat has very 
sharp claws and is very fierce. You don't want to mess with him. 

Seriously though, his claws cut me a lot. It bleeds and makes me sad a little 
bit. I never cry though, because pirates aren't supposed to cry. Unless you 
have a baby, then it's OK to cry but ONLY when it does something that fills
your heart with joy. And even then, it can't be a sobbing type of cry. Silent 
tears only. 

Anyway, I'm Eric and I coded this monster. In my vision of the future of 
pirate!, an online Harbor will allow everyone on the planet to come and 
build Ships for others to use. If and when that day comes, Ships people 
code for everyone's enjoyment may be licensed under whatever license they 
want. For now, most of this code here is written entirely by me. So for 
this release, assume everything to be under the BSD license. A few snippets 
of code are from Prototype.js (http://prototype.conio.net) by Sam Stephenson 
and he retains copyright on that ( and I haven't even really gotten his 
permission to use his code, ( please don't hate me Sam, I LOVE YOU!!! ) ) 
so don't gank his code. My code, do whatever you want with it...

Just be careful... 

Remember: The cat has very sharp claws and does NOT play nicely.

----------------------
    I'll kill you!
----------------------
Now THAT is what I like to hear! That's the pirate! spirit! Take no 
prisoners! Leave no DOM pointer referenced! Argg!!! Yeah, OK. You don't 
have to like me or what I do. I'm just a goofy guy trying to waste time 
until I get out of the Army.

----------------------
    SECRET SECTION
----------------------
This is the secret section of the README file in which I ramble on about 
whatever I want.

First: thanks are in order to the people and things that matter most to me.

[REDACTED] The rest of this section was filled with ultra-cringey ramblings
from 2006. These days, I at least have the good sense to keep the cringe
inside my head where it belongs. :D -erh 2023
