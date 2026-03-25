# volto-n2k

[![Releases](https://img.shields.io/github/v/release/eea/volto-n2k)](https://github.com/eea/volto-n2k/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-n2k%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-n2k/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-n2k%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-n2k/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&branch=develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k&branch=develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&branch=develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k&branch=develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&branch=develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k&branch=develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k&branch=develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k&branch=develop)


[Volto](https://github.com/plone/volto) add-on

## Features

Demo GIF

## Getting started

### Try volto-n2k with Docker

      git clone https://github.com/eea/volto-n2k.git
      cd volto-n2k
      make
      make start

Go to http://localhost:3000

### Add volto-n2k to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-n2k"
   ],

   "dependencies": {
       "@eeacms/volto-n2k": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-n2k
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-n2k/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-n2k/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-n2k/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
