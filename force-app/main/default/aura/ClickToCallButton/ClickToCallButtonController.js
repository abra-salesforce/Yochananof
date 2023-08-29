({
  openPage: function (component, event) {
    var recordId = component.get("v.recordId");
    var dialtoclidextclid;
    var ext;
    s;
    var action = component.get("c.getPriorityRecordName");
    action.setParams({ recordId: recordId });
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        component.set("v.priorityRecordName", response.getReturnValue());
        console.log(
          "priorityRecordName: " + component.get("v.priorityRecordName")
        );

        //Open New Browser Tab with Visualforce Page
        var pageUrl =
          "http://10.11.80.10/OptimusIntegration/Rest/ExtensionWebMethods.aspx/dialtoclidextclid=" +
          dialtoclidextclid +
          "&ext=" +
          ext;
        window.open(pageUrl);

        //Close Action Button Modal
        $A.get("e.force:closeQuickAction").fire();
      } else {
        console.log("Failed with state: " + state);
      }
    });
    $A.enqueueAction(action);
  }
});
