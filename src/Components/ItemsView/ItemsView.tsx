import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Items from './Item'
import {db, ApiKey} from "../../config";
import credentials from "../../creds.json";
// import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { collection, query, where, onSnapshot, doc, setDoc,  } from "firebase/firestore";
import { async } from '@firebase/util';




import './ItemView.css'

import AddItem from './AddItem';

import vision from "@google-cloud/vision";

import { GoogleAuth, grpc } from "google-gax";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import MyRequest from './MyRequest';


class Product {
  id: string = "";
  image_url: string = "";
  item_name: string = "";
  product_description: string = "";
  user_id: string="";
  tags: string[]= [];
  constructor(id, image_url, item_name, product_description, user_id, tags) {
    this.id = id;
    this.image_url = image_url;
    this.item_name = item_name;
    this.product_description = product_description;
    this.user_id = user_id;
    this.tags = tags
  }
}

export class ItemsView extends Component<any> {
  state = {
    items: new Array<Product>(0),
    dataLoaded: false
  }
  

  getUserData = async () => {


    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = new Array<Product>(0);
      querySnapshot.forEach((doc) => {
        const product = new Product(
          doc.data().id,
          doc.data().image_url,
          doc.data().item_name,
          doc.data().item_desc,
          doc.data().user_id,
          doc.data().tags
        );
        products.push(product);
      });

      // for(let i=0; i< querySnapshot.length;i++) {
      //   products.push({
      //     image_url: querySnapshot[i].data().image_url,
      //     item_name: querySnapshot[i].item_name,
      //   });
      // }
      console.log(products);
      this.setState({
        items:products,
        dataLoaded: true,
      });


      // console.log("Current cities in CA: ", cities.join(", "));
    });

    // const unsub = onSnapshot(doc(db, "products",""), (doc) => {
    //   // this.setState({
    //   //   image_url: doc.data().image_url,
    //   //   item_name: doc.data().item_name,
    //   //   dataLoaded: true,
    //   // });
      
    //   console.log("Current data: ", doc.data());
    // });
    console.log("DATA RETRIEVED");
  };
  componentDidMount() {
    this.getUserData()
  }

  componentWillUnmount() {

  }

  async onItemRequest(description,item:Product, userID) {

    

    console.log(description, item);
    // const productsRef = doc(collection(db, "requests"));
    const requestId = uuidv4();
    await setDoc(doc(db, "requests", requestId), {
      product_id: item.id,
      requested_user_id: userID,
      owner_user_id: item.user_id,
      description: description,
      request_id: requestId,
      status: true
    });
    

  }

  // getCurrentUser = () => {
  //   return ;
  // }


  async addItem(image, name, description) {

    const userId = this.props.user['sub'];

    console.log(userId);
    
    
    const storage = getStorage();

    console.log(image)
    // this.quickstart(image)

    let data = new FormData();

    data.append("image", image);

    let config:any = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    const tags = await axios.post(
      "https://sic-hack6.herokuapp.com/get_text",
      data,
      config
    );
    // const tags = ["a", "b", "c"]
    

// Create a child reference
    const imagesRef = ref(storage, "images/"+image.name);
    const uploadTask = uploadBytesResumable(imagesRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // const progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("Uploaded a blob or file!");
          // const productsRef = doc(collection(db, "products"));

          // later...
          const productId = uuidv4();
          await setDoc(doc(db, "products", productId), {
            id: productId,
            image_url: downloadURL,
            item_name: name,
            user_id: userId,
            tags: tags.data['labels'],
            item_desc: description
          });
        });
      }
    );


    // uploadBytes(imagesRef, image).then(async (snapshot) => {
      
    // });
    // console.log(name);
    // console.log(image);

  }

  render() {
    return (
      <div className="mx-auto">
        <div className="container mt-5 mx-auto">
          {this.props.isAuthenticated ? (
            <AddItem onAddEvent={this.addItem.bind(this)}></AddItem>
          ) : null}
          <div className="container mt-2 d-flex justify-content-center flex-wrap mx-auto">
            {this.state.items.map((item: Product) => {
              console.log("item " + item.image_url);
              return (
                <Items
                  key={item.id}
                  userID={this.props.user?.sub}
                  requestEvent={this.onItemRequest}
                  item={item}
                  isAuthenticated={this.props.isAuthenticated}
                ></Items>
              );
            })}
          </div>
        </div>
      </div>
    );
    

    
  }
}

export default ItemsView
