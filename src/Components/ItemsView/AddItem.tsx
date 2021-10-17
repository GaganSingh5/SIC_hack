import React, { Component, SyntheticEvent } from 'react'
import PropTypes from 'prop-types'

export class AddItem extends Component<{ onAddEvent: any }> {
  state = {
    item_name: "",
    item_description: "",
  };
  fileInput: React.RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);

    this.onItemNameChange = this.onItemNameChange.bind(this);
    this.onItemDescriptionChange = this.onItemDescriptionChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileInput = React.createRef();

    // this.state = {
    //   item_name: "",
    //   item_description: "",
    // };
  }

  onItemNameChange(event) {
    this.setState({ item_name: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log("event triggered");
    console.log(event);

    this.props.onAddEvent(
      this.fileInput.current.files[0],
      this.state.item_name,
      this.state.item_description
    );
  }

  onClose() {
    this.setState({ item_name: "", item_description: ""});
    this.fileInput = React.createRef()
  }

  onItemDescriptionChange(event) {
    this.setState({ item_description: event.target.value });
  }

  render() {
    return (
      <div className="container-fluid px-5 mx-5 d-flex justify-content-end">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Product
        </button>

        <div
          className="modal fade"
          id="exampleModal"
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
                    <label htmlFor="formFile" className="form-label">
                      Product Image
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      ref={this.fileInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={this.state.item_name}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      onChange={this.onItemNameChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Product Description
                    </label>
                    <input
                      type="text"
                      value={this.state.item_description}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder=""
                      onChange={this.onItemDescriptionChange}
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
                    value="Add"
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

export default AddItem
