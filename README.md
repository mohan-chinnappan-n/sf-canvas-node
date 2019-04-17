###  How to build Salesforce Canvas App in Node.js at Heroku

### Slides
[SF Heroku Canvas Slides](https://mohan-chinnappan-n2.github.io/2019/canvas/canvas.html)

### Create a Connected App

[Refer Christophe's doc](http://ccoenraets.github.io/salesforce-developer-advanced/Using-Canvas.html)

#### Step 1: Create a Connected App
```
In Setup, click Build > Create > Apps

In the Connected Apps section, click New, and define the Connected App as follows:

Connected App Name: MyCanvas
API Name: MyCanvas
Contact Email: enter your email address
Enabled OAuth Settings: Checked
Callback URL: http://localhost (you will change this later)
Selected OAuth Scopes: Full Access (full)
Force.com Canvas: Checked
Canvas App URL: http://localhost/signedrequest (you will change this later)
Access Method: Signed Request (POST)
Locations: Layouts and Mobile Cards, Publisher

Click Save

On the Connected App details page, click the Click to reveal link next to Consumer Secret, and copy your secret to your clipboard. You will need it in step 4.

```

#### Step 2: Configure Permissions
```
On the Connected App details page, click the Manage button

Click Edit

For Permitted Users, select Admin approved users are pre-authorized

Click Save

Click Manage Profiles

Check System Administrator

Click Save

## How to pass parameters in force:canvasApp component

### Component

```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId" access="global" >
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>   
    <aura:attribute name="parameters" type="String" />
      
    Parameters: <ui:outputText value="{!v.parameters}" />
    <force:canvasApp developerName="AccountPositionApp"  parameters="{!v.parameters}"  />

</aura:component>

```

### Controller


```js

({
    doInit : function(cmp) {
        var recordId = cmp.get("v.recordId");
        // Example of writing a URI
        // var params1 = '{"path": "/recordId/' + recordId + '/view"}';
        // Example of recordId parameter
        var params = '{"recordId": "' + recordId + '"}';
        cmp.set("v.parameters", params);
        //alert(params);
    } 
    
    
})

``` 

![Parameters payload](img/canvasParameters.png)



