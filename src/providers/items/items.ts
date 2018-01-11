import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };

  data: any = [];

  constructor(public api: Api) { }

  query(params?: any) {

    if (params) {

      return new Promise(resolve => {
        this.api.get('events', params)
          .map(res => {
            console.log("param",res);
            return res;
          })
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });
      
    } else {

      return new Promise(resolve => {
        this.api.get('events')
          .map(res => {
            console.log(res);
            return res;
          })
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
      });

    }

  }

  add(item: Item) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods","POST");
    headers.append("Access-Control-Allow-Headers","Content-Type, Authorization");
    this.api.post('events', item, headers)
    .subscribe(data => {
       console.log(data);
    }, error => {
      console.log(error); 
    });
  }

  delete(item: string) {
    this.api.delete('events', item)
    .subscribe(data => {
       console.log(data);
    }, error => {
      console.log(error); 
    });
  }

}
