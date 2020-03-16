({	
    doInit: function(component, event, helper) {
        var action = component.get("c.getObjectAPINames");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                var plValues = [];
                for (var i = 0; i < result.length; i++) {
                    plValues.push({
                        label: result[i],
                        value: result[i]
                    });
                }
                component.set("v.GenreList", plValues);
            }
        });
        $A.enqueueAction(action);
    },
    handleObjectChange: function (component, event, helper) {
        //Get the Selected values   
        var selectedValues = event.getParam("value");
        
        //Update the Selected Values  
        component.set("v.selectedObjectList", selectedValues);
    },
    
	CustomFieldForm: function (component, event, helper) {
         var sel = component.find("FieldTypeId");
         var nav =	sel.get("v.value");
         component.set("v.ObjAndFieldName", true);
        if(nav == "Text"){
            component.set("v.bLenght",true);
            component.set("v.bPrecisionAndScale",false);
            component.set("v.FieldType","Text");
        }
        else if(nav == "Checkbox"){
            component.set("v.bLenght",false);
            component.set("v.bPrecisionAndScale",false);
            component.set("v.FieldType","Checkbox");
        }
        else if(nav == "Currency"){
            component.set("v.bPrecisionAndScale",true);
            component.set("v.bLenght",false);
            component.set("v.FieldType","Currency");
        }
        else if(nav == "Number"){
            component.set("v.bPrecisionAndScale",true);
            component.set("v.bLenght",false);
            component.set("v.FieldType","Number");
        }
    },

    
        save : function(component, event, helper) {

        var action = component.get("c.createFieldInMultipleObj");
        var lstSelectedObject = component.get('v.selectedObjectList'); 
            var ids=new Array();
            for (var i= 0 ; i < lstSelectedObject.length ; i++){
                ids.push(lstSelectedObject[i]);
            }
            
            var idListJSON=JSON.stringify(ids);  
            var fieldLength='';
            var fieldDefaultValue ='';
        action.setParams({ lstObjAPINames : idListJSON,
                          fieldAPIName : component.get("v.FieldAPIName"),
                          fieldLabel : component.get("v.FieldName"),
                          fieldDescription : component.get("v.FieldDescription"),
                          fieldType : component.get("v.FieldType"),
                          fieldPrecision :component.get("v.FieldPrecision") ,
                          fieldScale :component.get("v.FieldScale"),
                          fieldLength :fieldLength,
                          fieldDefaultValue :fieldDefaultValue,
                         });
            

        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned 
                // from the server
                alert("From server: " + response.getReturnValue());

                // You would typically fire a event here to trigger 
                // client-side notification that the server-side 
                // action is complete
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    setFieldAPIName: function (component, event, helper) {
        var sel = component.find("FieldName");
        var nav =	sel.get("v.value");
    	nav=nav.replace(" ","_");
        component.set("v.FieldAPIName",nav);
    }
})
