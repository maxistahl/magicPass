# magicPass
animated input password with css and javascript

```
Hey!... this is a proof of concept. Use carefully.
```

This script require at least:
- JQuery 1.9.0
- FontAwesome 4.5.0

## Usage
just add into your html a input type password with the id that you chousen. E.g. "pass". and then, initialize the script with:

```js
$('#pass').magicPass();
```
### magicPass(options:optional)
magicPass function receive one optional parameter with a json object.
The json object need two properties:
- icon (the FontAwesome icon class name. E.g. 'fa-star-o')
- backgroundColor (a valid css color. E.g. 'white|#fff|#ffffff|rgb(255,255,255)')
