# angular-alert-provider
> Bootstrap alert window encapsulated in angular provider.

### Compatibility
- Angular: 1.2.28+
- Bootstrap: 3.3.5+

### Installation
Download plugin

```shell
bower install angular-alert-provider --save-dev
```

Add lib into script

```html
<script type="text/javascript" src="../bower_components/angular-alert-provider/dist/alertProvider.min.js"></script>
```

Include provider into angular module dependency:

```javascript
angular.module('App', ['$alertProvider']);
```

### Example

Install external dependencies
```shell
bower install
npm install
```

Run grunt command in order to serve example page on http://localhost:3001 host.

```shell
grunt serve
```

You will see:


### Options

+ **title (required):**
Title of modal dialog.

+ **body (required):**
Body of modal dialog.

+ **buttons (required):**
Collection of buttons:

```javascript
buttons: [
  {
    label: 'Yes',
    cssClass: 'btn btn-primary',
    action: actionYes
  },
  {
    label: 'No',
    cssClass: 'btn btn-danger',
    action: actionNo
  }
]
```
++ **label:** - button label.
++ **cssClass:** - css class of button.
++ **action:** - callback triggered once clicked on button.

### Release notes
- 0.1.0 First version.

##### Licence MIT
##### Author: Tomasz Czechowski
- Twitter: https://twitter.com/t_czechowski
