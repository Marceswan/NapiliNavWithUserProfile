public with sharing class SlimStyleNavigationController {

    @AuraEnabled
    public static Map<String, boolean> checkMenuItemVisibity(Map<String,String> profileNameMap){

       Map<String, boolean> resultMap = new Map<String, boolean>();
       User user = [select Profile.Name from User where Id = :UserInfo.getUserId()];
       
      // System.debug('profileNameMap ' + profileNameMap);
       
       for (String key: profileNameMap.keySet()){
           
            String profileNames = profileNameMap.get(key);
      //      System.debug('user profile is: ' + user.Profile.Name + ' profileNames' + profileNames);
            if (profileNames.contains(user.Profile.Name)) {
                 
                 resultMap.put(key, true);  
            }
            else{
                
                 resultMap.put(key, false);  
            }
       }
    //   System.debug('resultMap is: ' + resultMap);
       return resultMap;
    }
    
    
    
    
    
    
}