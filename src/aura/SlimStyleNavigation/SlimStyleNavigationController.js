({
    doInit: function(component, event, helper) {
       
   
        helper.isVisible(component);
  
    },
    
    menuItemClick : function(cmp, evt, helper){        
        var callPageNumber = evt.target.value;
        var url = cmp.get("v.url" + callPageNumber);
        if (url.length > 0){
            $A.getEvt("force:navigateToURL").setParams({
                url : url
            }).fire();
            cmp.set("v.currentPage", callPageNumber);            
            var countClick = cmp.get("v.countClick") + 1;
            cmp.set("v.countClick", countClick);
        }
   
    },

    toggleMenu : function(cmp, evt, helper) {
        var menu = cmp.find('menu');
        $A.util.toggleClass(menu, 'active');
        var toggle = cmp.find('toggle');
        $A.util.toggleClass(toggle, 'active');
        var transparent = cmp.find('transparent');
        $A.util.toggleClass(transparent, 'active');
    },
    
    beShrink : function(cmp,evt, helper){
        helper.initActive(cmp); 
    },
    
})