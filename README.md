<<<<<<< HEAD
# Hello

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=======
# formation
Repos de tout ce qu'on en fait de juillet à septembre 2018

Application qui permet de faire une todo list

To reinstall :

$: git clone https://github.com/babou1234/formation

[ only for Angular ]
$: cd [yourdevspace]
$: git clone https://github.com/[your account]/[your project]
$: cd [your project]
$: npm i @angular-cli@latest -g (if ever angular-cli is not already installed)
$: npm i
$: ng serve

Then go to http://localhost:4200

That's all falks!

BD:
CREATE DATABASE /*!32312 IF NOT EXISTS*/`todos_repo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `todos_repo`;

/*Table structure for table `todos` */

DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `begin` date NOT NULL,
  `end` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
>>>>>>> cb3db9cd8547a0f2349772253d8ef688c1116c6b
