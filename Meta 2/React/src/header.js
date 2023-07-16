import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src="https://i0.wp.com/pharmacy.tiu.edu.iq/wp-content/uploads/2018/10/Screenshot_2018-10-22-15-09-59-1.png?fit=1809%2C1045&ssl=1"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
          alt=""

        />
        <hr />
       
        <strong>Pharmacy</strong>
      </div>
    );
  }
}

export default Header;