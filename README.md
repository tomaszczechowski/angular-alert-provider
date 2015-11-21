# angular-alert-provider
> Angular Bootstrap modal window encapsulated in angular provider.

### Compatibility
- Angular: >1.2.28
- Angular-bootstrap: ~0.14.3

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
### Ustage

```javascript
  $scope.openModal = function () {
    var actionYes = function () {
      console.log('clicked yes');
    };

    var actionNo = function () {
      console.log('clicked no');
    };

    var alert = $alertProvider.open({
      title: 'Modal title',
      body: 'Do you confirm deleting element?',
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
    });
  };
```

Result:

![alt tag](https://raw.github.com/tomaszczechowski/angular-alert-provider/master/alertProvider.png)

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

### Options

+ **Provider allows to use angular bootstrap options ([documentation](https://angular-ui.github.io/bootstrap/#/modal))**

+ **title (required):**
Title of modal dialog.

+ **body (required):**
Body of modal dialog.

+ **buttons (required):**
Collection of buttons:
    * **label**: - button label.
    * **cssClass**: - css class of button.
    * **action**: - callback triggered once clicked on button.

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
+ **templateUrl (optional):**
Provider allows to change tempalate. Here you can set different template url in order to change structure of modal.

### Release notes
- 0.1.0 First version.

##### Licence MIT
##### Author: [Tomasz Czechowski](http://czechowski.pl)
