# volto-n2k

[![Releases](https://img.shields.io/github/v/release/eea/volto-n2k)](https://github.com/eea/volto-n2k/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-n2k%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-n2k/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-n2k%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-n2k/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-n2k-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-n2k-develop)

[Volto](https://github.com/plone/volto) add-on

## Features

###

Demo GIF

## Getting started

1. Create new volto project if you don't already have one:

   ```
   $ npm install -g yo @plone/generator-volto
   $ yo @plone/volto my-volto-project --addon @eeacms/volto-n2k

   $ cd my-volto-project
   $ yarn add -W @eeacms/volto-n2k
   ```

1. If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-n2k"
   ],

   "dependencies": {
       "@eeacms/volto-n2k": "^1.0.0"
   }
   ```

1. Install new add-ons and restart Volto:

   ```
   $ yarn
   $ yarn start
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
