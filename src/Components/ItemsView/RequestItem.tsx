import React, { Component } from 'react'
import PropTypes from 'prop-types'


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

export class RequestItem extends Component<{
  userID: string;
  itemData: Product;
  requestEvent: any;
}> {
  state = {
    request_description: "",
    itemData: "",
  };

  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDescriptionChange(event) {
    this.setState({ request_description: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("event triggered");
    console.log(this.state.request_description);

    this.props.requestEvent(
      this.state.request_description,
      this.props.itemData,
      this.props.userID
    );
  }

  onClose() {
    this.setState({ request_description: "" });
  }

  render() {
    return (
      <div className="container-fluid mx-2">
        <button
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target={"#requestModel" + this.props.itemData.id}
        >
          Request Product
        </button>

        <div
          className="modal fade"
          id={"requestModel" + this.props.itemData.id}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <form onSubmit={this.onSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Product
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={this.onClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <div className="row">
                      <h4>Product Image</h4>
                    </div>
                    <div className="row">
                      <img
                        src={this.props.itemData.image_url}
                        className="card-img-top card--image"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <h4>Product Name</h4>
                    </div>
                    <div className="row">
                      <h6>{this.props.itemData.item_name}</h6>
                    </div>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    ></label>

                    {/* <input
                      type="text"
                      value={this.state.item_name}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      onChange={this.onItemNameChange}
                    /> */}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Why Do you need this product?
                    </label>
                    <textarea
                      value={this.state.request_description}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      onChange={this.onDescriptionChange}
                    />
                  </div>

                  {/* <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Item Name
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div> */}
                </div>
                <div className="modal-footer">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit Request"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestItem
