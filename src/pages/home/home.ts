import { Component } from '@angular/core';
// import * as firebase from 'firebase'; 
import { NavController, ModalController, AlertController, Item } from 'ionic-angular';
// import { ModalController } from 'ionic-angular';
// import { ModalPage } from './modal-page';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { createElement } from '@angular/core/src/view/element';


declare var firebase

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemlist = [];
// name;
item:Observable< any[]>;
itemref$: any;
database;
Details:any;
shoppingList;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {

    firebase.database().ref('shoppingList').on('value', (data: any) => {

      var name = data.val();
      console.log(name);
      var keys = Object.keys(name);
 
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
 
        let obj = {
          item: name[k].name,
          key: k
        }
 
 
        this.itemlist.push(obj);
 
        console.log(this.itemlist);
 
 
      };
    })
 
 
  }
  //   this.database = firebase.database();
  //   var itemref$ =  this.database.ref('shoppingList');
  //   itemref$.on('value',this.gotData,this.errData);

  // }

  gotData(data){


console.log(data.val());
var shoppingList = data.val();
var keys = Object.keys(shoppingList);
console.log(keys);

 for (var i = 0; i < keys.length; i++){
   var k = keys[i];
  let obj = {

    name:shoppingList[k].shoppingList,
    key:k
    
  }

  this.itemlist.push(obj)

  console.log(this.itemlist);
  
  
 
 }

  }
 errData(err){
    console.log('error');
    console.log(err)
      }
  
  Add() {
   
    const alert = this.alertCtrl.create({
      title: 'Add shopping Item',
      subTitle: 'add Item to shopping list',
      inputs: [
        {
          name: 'shopping_Item',
          placeholder: 'Buy Portatoes'
        },
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {

            this.itemlist=[];
            this.AddItems(data.shopping_Item);
            // this.gotData
            // name:data.shopping_Item
            // this.itemref$.push(
            //   {   
            //   }),
            // data.shopping_Item.name;
              // console.log(this.item)
            console.log('Cancel clicked'+ data.shopping_Item);
            console.log(this.item);
          }
        },
       
      ]
    });
    alert.present();
  }
Delete(i){

  alert(i)
  this.itemlist = [];
  var firebaseRef = firebase.database().ref('shoppingList/').child(i).remove();

  console.log('Deleted')
}

update(a){

  const alert = this.alertCtrl.create({
    title: 'Update shopping Item',
    subTitle: 'add Item to shopping list',
    inputs: [
      {
        name: 'shopping_Item',
        placeholder: 'Buy Portatoes'
      },
    ],
    buttons: [
      {
        text: 'Add',
        handler: data => {
          // this.AddItems(data.shopping_Item);

          this.itemlist=[];

          var update= {
            name:data.shopping_Item
          }
          firebase.database().ref('shoppingList/').child(a).update(update);
          
          console.log('Cancel clicked'+ data.shopping_Item);
          console.log(data.shopping_Item);
        }
      },
     
    ]
  });
  alert.present();

  
}

  AddItems(name){

    
    this.itemref$ = firebase.database().ref('shoppingList' ).push({
      name
    });
    console.log();

   
  }
}
