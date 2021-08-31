import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-component',
  templateUrl: './employee-component.component.html',
  styleUrls: ['./employee-component.component.scss'],
  providers: [DatePipe]
})

export class EmployeeComponentComponent implements OnInit {
  dataOfEmployee:any=[]
  counter =0
  joining_date:any
  id:any
  sortByNameVal:boolean=false;
  sortByDateVal:boolean=false;
  searchByNameVal:boolean=false;
  searchByExpVal:boolean=false;
  searchDistinctVal:boolean=false;
  removeCandidatesVal:boolean=false;
  searchjoiningDate:any
  searchDept:any
  searchEmp:any
  searchId:any
  myDate
  distinct =[]
  sortedName
  distinctData:any
  filteredData:any=[]
  removeData:any=[]
  searchValue
  errorMsg
  candidate_data=[ 
    {"id": 11,"name": "Ash","department": "Finance","joining_date": "8/10/2016"},
    {"id": 12,"name": "John","department": "HR","joining_date": "18/1/2011"},
    { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019"},
    {"id": 14,  "name": "Vish",  "department": "Development",   "joining_date": "7/7/2017"},
    { "id": 15, "name": "Barry",  "department": "Operations", "joining_date": "19/8/2014"},
    {"id": 16,"name": "Ady",  "department": "Finance",  "joining_date": "5/10/2014"}, 
    { "id": 17,"name": "Gare","department": "Development",  "joining_date": "6/4/2014"},
    { "id": 18,  "name": "Hola",  "department": "Development",  "joining_date": "8/12/2010"}, 
    {"id": 19,  "name": "Ola",  "department": "HR",  "joining_date": "7/5/2011"},
    { "id": 20,  "name": "Kim",  "department": "Finance",  "joining_date": "20/10/2010"}]

  constructor(private datePipe: DatePipe){ 
    this.myDate = this.datePipe.transform(this.myDate, 'dd/mm/yyyy');
  }

  ngOnInit(): void {
  
  }
  
  submitData(checkingTheForm: NgForm){
    this.dataOfEmployee.push(checkingTheForm.value)
    console.log(this.dataOfEmployee)
  }
  searchByName(){
    this.searchByNameVal=true
    this.sortByNameVal=false;
    this.sortByDateVal=false;
    this.searchByExpVal=false;
    this.searchDistinctVal=false;
    this.removeCandidatesVal=false;
  }
  searchName(event){
    var val = event.target.value
    for(let i =0;i<this.candidate_data.length;i++){
      if(this.candidate_data[i].name.toLowerCase() == val.toLowerCase() ){
        const searchData = this.candidate_data[i]
        this.searchId = searchData.id
        this.searchEmp = searchData.name
        this.searchDept = searchData.department
        this.searchjoiningDate = searchData.joining_date
        this.searchValue = true
       }
    }
  }
  sortByName(){
    this.sortByNameVal=true;
    this.sortByDateVal=false;
    this.searchByNameVal=false
    this.searchByExpVal=false;
    this.searchDistinctVal=false;
    this.removeCandidatesVal=false;
    this.sortedName = this.sortByKey(this.candidate_data,"name")
    console.log(this.sortedName);
  }
  sortByKey(arr,key){
    return arr.sort(function(a,b){
      var x=a[key];
      var y=b[key];
      return ((x<y)?-1:((x>y)?1:0))
    })
  }
  sortByDate(){
    this.sortByDateVal=true;
    this.sortByNameVal=false;
    this.searchByNameVal=false
    this.searchByExpVal=false;
    this.searchDistinctVal=false;
    this.removeCandidatesVal=false;
    this.sortedName = this.sortByJoiningDate(this.candidate_data);
    console.log(this.sortedName);
  }
  sortByJoiningDate(array) {
    return array.sort(function(a, b) {
      var temp = a["joining_date"].split("/");
      var temp1 = b["joining_date"].split("/");
      var year = temp[2];
      var month = temp[1];
      var day = temp[0];
      var year1 = temp1[2];
      var month1 = temp[1];
      var day1 = temp[0];
      var x = new Date(`${year}-${month}-${day}`).getTime();
      var y = new Date(`${year1}-${month1}-${day1}`).getTime();
      // var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  searchByExp(){
    this.searchByExpVal=true;
    this.sortByNameVal=false;
    this.sortByDateVal=false;
    this.searchByNameVal=false
    this.searchDistinctVal=false;
    this.removeCandidatesVal=false;
    this.filteredData = this.experiencedCandidates(this.candidate_data)
    console.log(this.filteredData)
  }
  experiencedCandidates(data) {
    const result:any = [];
    for(let i=0; i<data.length; i++) {
      let splitDate = data[i]["joining_date"].split("/");
      const joiningYear = Number(splitDate[2]);
      const currentYear = new Date().getFullYear();
      if(currentYear - joiningYear > 2) {
        result.push(data[i]);
      }   
    }
    return result;
  }
  searchDistinct(){
    this.searchDistinctVal=true;
    this.sortByNameVal=false;
    this.sortByDateVal=false;
    this.searchByNameVal=false
    this.searchByExpVal=false;
    this.removeCandidatesVal=false;
    const distinctObj={}
    const distinctArray:any =[]
    this.candidate_data.forEach(function(obj){
      var key = obj['department']
     
      distinctObj[key]=(distinctObj[key]||0)+1
      // distinctArray.push(obj['department']+' '+distinctObj[key])
      // console.log(distinctArray)
    })
    console.log(distinctObj)
    // this.distinctData=distinctObj
    // console.log( this.distinctData)
  }
  removeCandidates(){
    this.removeCandidatesVal=true;
    this.sortByNameVal=false;
    this.sortByDateVal=false;
    this.searchByNameVal=false
    this.searchByExpVal=false;
    this.searchDistinctVal=false;
    this.removeData=[]
    for(let i=0;i<this.candidate_data.length;i++){
      if(this.candidate_data[i].department !== "Development" ){
        this.removeData.push(this.candidate_data[i])
        console.log(this.removeData)
      }
    }
  }
  reset(){
    window.location.reload() 
   }
}

