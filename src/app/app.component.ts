import { Component } from '@angular/core';
import { DataService } from './data.service';
declare var Skycons

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = {
    timezone: "-",
    currently: {
      icon: '',
      summary: "-",
      temperature: '-',
      time: '-'
    } 
  };

  loading = true;

  convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
      ampm = 'AM',
      time;
        
    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }
    
    // ie: 2013-02-18, 8:35 AM	
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
      
    return time;
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    var skycons = new Skycons({"color": "white"});
    skycons.play();

    this.dataService.sendGetRequest().subscribe((data: any)=>{
      this.data = data
      this.loading = false
      skycons.add("icon1", Skycons[this.data.currently.icon.replace(/-/g, "_").toUpperCase()]);
      this.data.currently.time = this.convertTimestamp(parseInt(this.data.currently.time))
    })  
  }
}
