# Changelog

**v0.6.0** [14 Sept 2018]

* fully support Elm 0.19 and 0.18. This was released as `0.5.0-beta` but is now fully released as 0.6.0.
* _This is a breaking change_: You must now configure the library before using it: `elmWebComponents.configure('0.18')` or `elmWebComponents.configure('0.19')`.
* add `mapFlags` option, to transform flags before passing them to Elm (thanks @isaacseymour)

**v0.5.0** [28 Aug 2018] (in beta)

* Breaking change: we now support Elm 0.19 and 0.18! You must now configure the library before using it: `elmWebComponents.configure('0.18')` or `elmWebComponents.configure('0.19')`.

**v0.4.0** [22 Aug 2018]

* Breaking change: we now convert kebab case properties into camelCase. So `<foo-bar first-name="Jack" />` will be given to Elm as `firstName: "Jack"`.

**v0.3.0** [3 May 2018]

* You can now pass `onDetached` as an option. This is a callback function that will be run when component is removed from the DOM.

**v0.2.0** [1 May 2018]

* Added support for static flags via the `staticFlags` option.
* **Breaking change**: third argument to `register` now takes an object with two (optional) properties: `setupPorts` and `staticFlags`, rather than just a function for setting up the ports.
