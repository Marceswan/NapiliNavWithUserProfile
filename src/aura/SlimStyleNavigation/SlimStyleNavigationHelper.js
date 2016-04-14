({
    //after render
    afterRender : function(cmp) {
        this.initHeader(cmp);
        this.initActive(cmp);
    },
    
    //initialize element style
    initHeader: function(cmp){
        var header = cmp.find("header");
        var menu = cmp.find("menu");
        var space = cmp.find("space");
        var block = cmp.find("block");
        var toggles = cmp.find("toggleSpan");
        var menuNumber = cmp.get("v.menuNumber");        
        var height = cmp.get("v.headerHeight");
        var fontSize = cmp.get("v.fontSize");
        var headerFixed = cmp.get("v.headerFixed");
        var blockSize = cmp.get("v.blockSize");
        var logo = cmp.find("brandLogo");
        var color = 'rgb(' + cmp.get("v.color") + ')';
        var bgColor = 'rgba(' + cmp.get("v.bgColor") + ',' + cmp.get("v.bgColorTransparent") + ')';
        
		//header size, font
        header.getElement().style.width = "100%";        
        header.getElement().style.height = height + 'px'; 
        header.getElement().style.fontSize = fontSize + 'px';

		//logo size        
        var maxHeight = height * 0.8;
        logo.getElement().style.maxHeight = maxHeight + 'px';
        
        //header position
        var headerPosition = headerFixed ? 'fixed': 'relative';
        var spaceHeight = headerFixed ? height: 0;
        header.getElement().style.position = headerPosition;
        
        //spacer size
        space.getElement().style.height = spaceHeight + 'px';        
        
        //block size
        block.getElement().style.width = blockSize + '%';
        
        //toggle color
        for (var n in toggles){
            toggles[n].getElement().style.backgroundColor = color;            
        }
        
        //text color, border line style
        for (var i=1; i <= menuNumber; i++){
            var atext = cmp.find("atext" + i);
            atext.getElement().style.color = color;
            if (i > 1){
                var item = cmp.find("item" + i);
                item.getElement().style.borderTop = 'solid 1px rgba(' + cmp.get("v.color") + ', 0.2)'; 
            }
        }
        
        //background color
        header.getElement().style.backgroundColor = bgColor;
        //header.getElement().style.background = '-webkit-gradient(linear, left top, left bottom, from(rgba(247,188,60,1)), to(rgba(232,242,27,0.9)))';
        menu.getElement().style.backgroundColor = bgColor;     
    },	
    
    //disactivate toggle menu
    initActive: function(cmp){
        var menu = cmp.find('menu');
        var toggle = cmp.find('toggle');
        var transparent = cmp.find('transparent');

        //disactivate
        $A.util.removeClass(menu, 'active');
        $A.util.removeClass(toggle, 'active');
        $A.util.removeClass(transparent, 'active');
        
    },
    
    //activate disactivate all menu link
    changeLinkActive: function(cmp){
        var menuNumber = cmp.get("v.menuNumber");
        
        //disactivate, activate
        for (var i=1; i <= menuNumber; i++){
            var atext = cmp.find("atext" + i);
            
            //remove activate class
            $A.util.removeClass(atext, 'active');                
            if (i == cmp.get("v.currentPage")){
                
                //activate only current page menu link 
                $A.util.addClass(atext, 'active');                
            }
        }
    },

    isVisible: function(component) {
         
        var show1Profile = component.get("v.show1Profile");
        var show2Profile = component.get("v.show2Profile");
        var show3Profile = component.get("v.show3Profile");
        var show4Profile = component.get("v.show4Profile");
        var show5Profile = component.get("v.show5Profile");
    
        
      //  debugger;
        var action = component.get("c.checkMenuItemVisibity");
        action.setParams({
            "profileNameMap": {
                view1: show1Profile,
                view2: show2Profile,
                view3: show3Profile,
                view4: show4Profile,
                view5: show5Profile,
            }
        });
        action.setCallback(this, function(response) {
              var state = response.getState();
            //  debugger;
              if (state === "SUCCESS") {
                  var resultMap = response.getReturnValue();
                  component.set("v.view1", resultMap.view1);
                  component.set("v.view2", resultMap.view2);
                  component.set("v.view3", resultMap.view3);
                  component.set("v.view4", resultMap.view4);
                  component.set("v.view5", resultMap.view5);
                  
              }
          });
        $A.enqueueAction(action);
    }    
})