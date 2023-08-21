@isTest(seealldata=true)
public class Status_HistoryZedRollTest{
static testMethod void tes(){
update [select id from Status_History__c limit 1];
}
}