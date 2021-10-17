import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { db, ApiKey } from "../../config";


class Product {
  id: string = "";
  image_url: string = "";
  item_name: string = "";
  product_description: string = "";
  user_id: string = "";
  tags: string[] = [];
  constructor(id, image_url, item_name, product_description, user_id, tags) {
    this.id = id;
    this.image_url = image_url;
    this.item_name = item_name;
    this.product_description = product_description;
    this.user_id = user_id;
    this.tags = tags;
  }
}


class Request {
  description: string = "";
  owner_user_id: string = "";
  product_id: string = "";
  request_id: string = "";
  requested_user_id: string = "";
  status: boolean = true;
  productData: Product;
  constructor(description, owner_user_id, product_id, request_id, requested_user_id, status ,productsData) {
    this.description = description;
    this.owner_user_id = owner_user_id;
    this.product_id = product_id;
    this.request_id = request_id;
    this.requested_user_id = requested_user_id;
    this.status = status;
    this.productData = productsData;
  }
}

export class MyRequest extends Component<any> {
  state = {
    requests: Array<Request>(0)
    
  }
  reqRef = null;

  constructor(props) {
    super(props)

    this.requestAccepted = this.requestAccepted.bind(this);
    this.requestRejected = this.requestRejected.bind(this);
  }

  componentDidMount() {
    this.getMyRequests()
  }
  componentWillUnmount() {
    this.reqRef();
  }

  async requestAccepted(reqID) {
    const reqRef = doc(db, "requests", reqID);
    await updateDoc(reqRef, {
      status: true,
    });
  }

  async requestRejected(reqID) {
    const reqRef = doc(db, "requests", reqID);
    await updateDoc(reqRef, {
      status: false,
    });
  }

  async getMyRequests() {

    const q = query(collection(db, "requests"), where("owner_user_id", "==", localStorage.getItem('uuid')));
    this.reqRef = await onSnapshot(q, async (querySnapshot) => {
      const reqArray = new Array<Request>(0);
      querySnapshot.forEach(async (requestData) => {
        const request = new Request(
          requestData.data().description,
          requestData.data().owner_user_id,
          requestData.data().product_id,
          requestData.data().request_id,
          requestData.data().requested_user_id,
          requestData.data().status,
          new Product("", "", "", "", "", "")
        );

        const product = await this.getProduct(requestData.data().product_id);
        // .then(product=>{
        //   console.log(product);

        //   request.productData = product;
        // });
        request.productData = product;
        console.log(request.productData);
        console.log(request);
        

        reqArray.push(request);
        this.setState({
          requests: reqArray,
        });
      });



      // const products = new Array<Product>(0);
      // querySnapshot.forEach((doc) => {
      //   const product = new Product(
      //     doc.data().id,
      //     doc.data().image_url,
      //     doc.data().item_name,
      //     doc.data().item_desc,
      //     doc.data().user_id,
      //     doc.data().tags
      //   );
      //   products.push(product);
      // });

      // for(let i=0; i< querySnapshot.length;i++) {
      //   products.push({
      //     image_url: querySnapshot[i].data().image_url,
      //     item_name: querySnapshot[i].item_name,
      //   });
      // }
      console.log(reqArray);
      // this.getProduct(requestData.data().product_id, request);
      

      // console.log("Current cities in CA: ", cities.join(", "));
    });

      


  }

  async getProduct(ID): Promise<Product> {
    const docRef = doc(db, "products", ID);
    const docSnap = await getDoc(docRef);
    const product = new Product(docSnap.data().id,
          docSnap.data().image_url,
          docSnap.data().item_name,
          docSnap.data().item_desc,
          docSnap.data().user_id,
          docSnap.data().tags)
    return product
    // const q = query(collection(db, "products"), where("id", "==", ID));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     const newState = this.state.requests[index].productData = new Product(
    //       doc.data().id,
    //       doc.data().image_url,
    //       doc.data().item_name,
    //       doc.data().item_desc,
    //       doc.data().user_id,
    //       doc.data().tags
    //     );
    //     this.setState(newState)
    //   });

      // for(let i=0; i< querySnapshot.length;i++) {
      //   products.push({
      //     image_url: querySnapshot[i].data().image_url,
      //     item_name: querySnapshot[i].item_name,
      //   });
      // }
      // console.log(products);
      // this.setState({
      //   items: products,
      //   dataLoaded: true,
      // });

      // console.log("Current cities in CA: ", cities.join(", "));
    // });
      
  }

  render() {

    
    return (
      <div className="container m-4">
        {this.state.requests.map((req:Request) => {
          return (
            <div className="card d-inline-block mx-2">
              <div className="card-body">
                <img
                  src={req.productData.image_url}
                  className="card-img-top card--image"
                  alt="..."
                />
                <p className="card-text">{req.productData.item_name}</p>
                <p className="card-text">Reason:&nbsp;{req.description}</p>
                <div className="row">
                  <div className="row my-2 ">
                    <div className="col">Status:</div>
                    <div className="col-10">
                      {req.status ? (
                        <span className="badge bg-success">Active</span>
                      ) : (
                        <span className="badge bg-danger">In-Active</span>
                      )}
                    </div>
                  </div>
                </div>
                {/* <a href="#" className="btn btn-primary">
                  Button
                </a> */}

                <button
                  className="btn btn-success"
                  onClick={() => this.requestAccepted(req.request_id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => this.requestRejected(req.request_id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
      
    
  }
}

export default MyRequest


