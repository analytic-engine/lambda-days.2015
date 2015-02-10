# Lambda Days 2015

Presentation for Lambda Days 2015

Development
-----------

We use the excellent [generator-reveal][] to create a [reveal.js][]
presentation. =generator-reveal= in turn relies on the tools
[yeoman][], [bower][] and [grunt][]. Tools that can be installed with
[npm][] which comes with [node][].

So if you want to develop slides for this presentation on needs to
perform the following steps.

1. Install node, either from a [pre-build installer][installer] or by
   building from [source][].
2. Install the necessary tools with the following command: `[sudo] npm
   install --global yo bower grunt-cli`.
3. Next one can use the command `yo reveal:slide` to create a slide,
   or...
4. `grunt serve` to create a server that serves the presentation.

### Alternative

If you are reluctant to install all these tools you can instead
install just one: [docker][].

Once installed one can use the [dvberkel/docker-generator-reveal][]
repository to perform the same functionality.

[generator-reveal]: https://github.com/slara/generator-reveal
[reveal.js]: http://lab.hakim.se/reveal-js/#/
[yeoman]: http://yeoman.io/
[bower]: http://bower.io/
[grunt]: http://gruntjs.com/
[npm]: https://www.npmjs.com/
[node]: http://nodejs.org/
[installer]: http://nodejs.org/download/
[source]: https://github.com/joyent/node
[docker]: https://www.docker.com/
[dvberkel/docker-generator-reveal]: https://registry.hub.docker.com/u/dvberkel/docker-generator-reveal.git/
