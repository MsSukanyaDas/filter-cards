import React, { Component } from "react";
import "./Cards.css";

class Cards extends Component {
  constructor(props) {
    super(props);
  }

  //   async componentDidMount() {
  //     try {
  //       //for API call
  //       // const requestURL =
  //       //   "https://raw.githubusercontent.com/DigitalAssetPortal/Sample-Responses/main/cardsList.json";
  //       // fetch(requestURL)
  //       //   .then((res) => res.json())
  //       //   .then((res) => console.log(res));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  render() {
    return (
      <>
        <div className="card-container">
          {!this.props.show &&
            this.props.cardList.map((item, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  onClick={(e) => this.props.showModal(true, index)}
                >
                  <div className="card-body">
                    <h1>{item.cardName}</h1>
                  </div>
                </div>
              );
            })}
        </div>
        {this.props.show && this.props.details ? (
          <>
            <div className="modal" id="modal">
              <h1>{this.props.details.cardName}</h1>
              <div className="card-details">
                <h4>Card Code: {this.props.details.cardCode}</h4>
                <h4>Status: {this.props.details.status}</h4>
                <h4>Gender: {this.props.details.gender}</h4>
                <h4>
                  Min Eligible Stated Income:{" "}
                  {this.props.details.minEligibleStatedIncome}
                </h4>
                <h4>
                  Max Eligible Stated Income:{" "}
                  {this.props.details.maxEligibleStatedIncome}
                </h4>
                <h4>
                  Min Eligible Credit Limit:{" "}
                  {this.props.details.minEligibleCreditLimit}
                </h4>
                <h4>
                  Max Eligible Credit Limit:{" "}
                  {this.props.details.maxEligibleCreditLimit}
                </h4>
              </div>
              <div className="actions">
                <button
                  className="toggle-button"
                  onClick={(e) => this.props.showModal(false, -1)}
                >
                  x
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Cards;
