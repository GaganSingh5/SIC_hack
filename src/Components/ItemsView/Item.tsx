import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Item.css'

import RequestItem from './RequestItem';
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

export class Item extends Component<{ item:Product,userID:string, isAuthenticated:boolean, requestEvent: any }, Product> {
  render() {
    return (
      <>
        <div className="card card--box m-3 shadow">
          <img
            src={this.props.item.image_url}
            className="card-img-top card--image"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.item.item_name}</h5>
            {/* <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
            <div className="row my-2">
              {this.props.isAuthenticated ? (
                <RequestItem
                  userID={this.props.userID}
                  requestEvent={this.props.requestEvent}
                  itemData={this.props.item}
                ></RequestItem>
              ) : null}
            </div>
            <div className="row my-2">
              <div className="col-6">
                <button className="btn btn-outline-success mx-2">Info</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Item
