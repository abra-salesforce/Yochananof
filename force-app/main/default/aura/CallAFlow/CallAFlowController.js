({
  init: function (component) {
    var phoneVar = component.get("v.pageReference").state.c__phoneVar;
    var yochananofPhoneVar =
      component.get("v.pageReference").state.c__yochananofPhoneVar;
    console.log("phoneVar: " + phoneVar);
    console.log("yochananofPhoneVar: " + yochananofPhoneVar);

    var flow = component.find("flowData");

    var inputVariables = [
      {
        name: "VarPhone",
        type: "String",
        value: phoneVar
      },
      {
        name: "VarYochananofPhone",
        type: "String",
        value: yochananofPhoneVar
      }
    ];

    // In the component whose aura:id is "flowData, start your flow
    // and initialize the account record (sObject) variable. Reference the flow's
    // API name.
    flow.startFlow("Telephony_Screen_Flow", inputVariables);
  },

  statusChange: function (component, event) {
    console.log("status changed ");
    console.log("status: " + event.getParam("status"));
    var recordId = "";
    var objectName = "";
    var secondaryPhoneMatch = false;
    var flowOutputVariables = event.getParam("outputVariables");

    if (
      event.getParam("status") === "FINISHED_SCREEN" ||
      event.getParam("status") === "FINISHED"
    ) {
      for (let i = 0; i < flowOutputVariables.length; i++) {
        if (flowOutputVariables[i].name == "NavigationRecord") {
          recordId = flowOutputVariables[i].value;
        } else if (flowOutputVariables[i].name == "VarObjectName") {
          objectName = flowOutputVariables[i].value;
        } else if (flowOutputVariables[i].name == "SecondaryPhoneMatch") {
          secondaryPhoneMatch = flowOutputVariables[i].value;
        }
      }
      console.log("recordId: " + recordId);
      console.log("objectName: " + objectName);
      console.log("secondaryPhoneMatch: " + secondaryPhoneMatch);

      var workspaceAPI = component.find("workspace");
      workspaceAPI.getFocusedTabInfo().then(function (response) {
        var focusedTabId = response.tabId;
        workspaceAPI.closeTab({ tabId: focusedTabId });
      });

      var url = "/lightning/r/" + objectName + "/" + recordId;
      if (!secondaryPhoneMatch && objectName == "Account") {
        url += "/related/Cases/view";
      } else {
        url += "/view";
      }

      workspaceAPI
        .openTab({
          url: url
        })
        .then(function (response) {
          workspaceAPI.focusTab({ tabId: response });
        });
    }
  }
});

// if (secondaryPhoneMatch != "true" && objectName == "Account") {
//   var relatedListEvent = $A.get("e.force:navigateToRelatedList");
//   relatedListEvent.setParams({
//     relatedListId: "Cases",
//     parentRecordId: recordId
//   });
//   relatedListEvent.fire();
// } else {
//   var navEvt = $A.get("e.force:navigateToSObject");
//   navEvt.setParams({
//     recordId: recordId,
//     slideDevName: "detail"
//   });
//   navEvt.fire();
// }
