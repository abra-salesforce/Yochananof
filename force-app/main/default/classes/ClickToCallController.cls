public class ClickToCallController {
  @AuraEnabled
  public static String getPersonMobilePhone(String recordId) {
    String objectType = getObjectFromId(recordId);
    String personMobilePhone = '';

    if (objectType == 'Account') {
      personMobilePhone = getFromAccount(recordId);
    } else if (objectType == 'Lead') {
      personMobilePhone = getFromLead(recordId);
    }

    System.debug('personMobilePhone: ' + personMobilePhone);
    return personMobilePhone;
  }

  @AuraEnabled
  public static String getTelephonyCode() {
    User currentUser = [
      SELECT Id, Telephony_Code__c
      FROM User
      WHERE Id = :UserInfo.getUserId()
    ];
    System.debug(
      'currentUser.Telephony_Code__c: ' + currentUser.Telephony_Code__c
    );
    return currentUser.Telephony_Code__c;
  }

  public static String getFromAccount(String recordId) {
    Id sId = (Id) recordId;
    String personMobilePhone = '';

    Account acc = [
      SELECT Id, PersonMobilePhone
      FROM Account
      WHERE Id = :recordId
      LIMIT 1
    ];
    System.debug('acc.personMobilePhone: ' + acc.personMobilePhone);
    return acc.personMobilePhone;
  }

  public static String getFromLead(String recordId) {
    Id sId = (Id) recordId;
    String personMobilePhone = '';

    Lead lead = [
      SELECT Id, MobilePhone
      FROM Lead
      WHERE Id = :recordId
      LIMIT 1
    ];
    System.debug('lead.MobilePhone: ' + lead.MobilePhone);
    return lead.MobilePhone;
  }

  public static String getObjectFromId(String recordId) {
    Id sId = (Id) recordId;
    return sId.getSObjectType().getDescribe().getName();
  }
}
