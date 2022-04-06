import React, { Component } from "react";
import Cards from "../Cards/Cards";
import "./Filter.css";

import { cardList } from "../APIData.js";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      show: false,
    };
    this.choice = [];
    this.details = {};
  }

  onCheckAll = (e) => {
    this.choice.map(
      (ch) => (document.getElementById(ch.category).checked = false)
    );
    this.setState({
      cards: cardList,
    });
    this.choice = [];
  };

  onCategorySelect = (e) => {
    let temp = {};
    temp.category = e.target.value;
    temp.checked = e.target.checked;
    if (this.choice.length === 0) {
      this.choice.push(temp);
    } else if (
      this.choice.findIndex((item) => item.category === e.target.value) > -1
    ) {
      this.choice.splice(
        this.choice.findIndex((item) => item.category === e.target.value),
        1
      );
    } else {
      this.choice.push(temp);
    }
    this.filterCards();
  };

  filterCards = () => {
    let temp = [];
    cardList.map((card, index) => {
      let counter = 0;
      card.benefitsDetails.map((benefit) => {
        if (
          this.choice.length === 1 &&
          this.choice[0].category === benefit.name
        ) {
          temp.push(card);
        } else if (this.choice.length > 1) {
          this.choice.map((item) => {
            counter = item.category === benefit.name ? counter + 1 : counter;
          });
        }
        if (
          counter === this.choice.length &&
          temp.findIndex((f) => f.cardName === card.cardName) === -1
        ) {
          temp.push(card);
        }
      });
      this.setState({
        cards: temp,
      });
    });
  };

  showModal = (value, index) => {
    this.setState({
      show: value,
    });
    this.details =
      this.state.cards.length > 0 ? this.state.cards[index] : cardList[index];
    this.onCheckAll();
  };

  render() {
    return (
      <>
        {!this.state.show ? (
          <div className="container">
            <div className="category all">
              <label>
                <input type="button" value="All" onClick={this.onCheckAll} />
                <span>All</span>
              </label>
            </div>
            <div className="category lifestyle">
              <label>
                <input
                  id="Lifestyle"
                  type="checkbox"
                  value="Lifestyle"
                  onChange={this.onCategorySelect}
                />
                <span>Lifestyle</span>
              </label>
            </div>
            <div className="category dining">
              <label>
                <input
                  id="Dining"
                  type="checkbox"
                  value="Dining"
                  onChange={this.onCategorySelect}
                />
                <span>Dining</span>
              </label>
            </div>
            <div className="category movies">
              <label>
                <input
                  id="Movies"
                  type="checkbox"
                  value="Movies"
                  onChange={this.onCategorySelect}
                />
                <span>Movies</span>
              </label>
            </div>
            <div className="category shopping">
              <label>
                <input
                  id="Shopping"
                  type="checkbox"
                  value="Shopping"
                  onChange={this.onCategorySelect}
                />
                <span>Shopping</span>
              </label>
            </div>
            <div className="category travel">
              <label>
                <input
                  id="Travel"
                  type="checkbox"
                  value="Travel"
                  onChange={this.onCategorySelect}
                />
                <span>Travel</span>
              </label>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          <Cards
            showModal={this.showModal}
            show={this.state.show}
            details={this.details}
            cardList={
              this.state.cards.length !== 0 ? this.state.cards : cardList
            }
          />
        </div>
      </>
    );
  }
}

export default Filter;
