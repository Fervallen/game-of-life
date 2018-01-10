import React, { Component } from 'react';

class LifeField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aliveCells: props.figure,
    };
    this.createField();
    setTimeout(this.evolve.bind(this), 1000);
  }

  createField() {
    this.field = [];
    let rowNumber = 0;
    while (rowNumber < this.props.size) {
      let row = [];
      let columnNumber = 0;
      while (columnNumber < this.props.size) {
        row.push(false);
        columnNumber++;
      }
      this.field.push(row);
      rowNumber++;
    }
  }

  evolve() {
    let newAliveCells = this.getNewAliveCells();
    if (this.state.aliveCells.length && (newAliveCells !== this.state.aliveCells)) {
      this.setState({ aliveCells: newAliveCells });
      setTimeout(this.evolve.bind(this), 1000);
    }
  }

  /**
   * @returns {Array}
   */
  getNewAliveCells() {
    let cells = [];
    for (let rowNumber in this.field) {
      for (let columnNumber in this.field[rowNumber]) {
        let aliveNeighboursCount = this.getAliveNeighboursCount(columnNumber, rowNumber);
        if ((aliveNeighboursCount === 3) || (
            this.isCellAlive(columnNumber, rowNumber) && (aliveNeighboursCount === 2)
        )) {
          if (!cells[rowNumber]) {
            cells[rowNumber] = [];
          }
          cells[rowNumber][columnNumber] = true;
        }
      }
    }

    return cells;
  }

  /**
   * @param {number|string} columnNumber
   * @param {number|string} rowNumber
   * @returns {number}
   */
  getAliveNeighboursCount(columnNumber, rowNumber) {
    let aliveNeighboursCount = 0;
    columnNumber = parseInt(columnNumber, 10);
    rowNumber = parseInt(rowNumber, 10);
    let neighbours = [
      [columnNumber - 1, rowNumber - 1],
      [columnNumber, rowNumber - 1],
      [columnNumber + 1, rowNumber - 1],
      [columnNumber - 1, rowNumber],
      [columnNumber + 1, rowNumber],
      [columnNumber - 1, rowNumber + 1],
      [columnNumber, rowNumber + 1],
      [columnNumber + 1, rowNumber + 1],
    ];
    for (let i in neighbours) {
      if (this.isCellAlive(...neighbours[i])) {
        aliveNeighboursCount++;
      }
    }

    return aliveNeighboursCount;
  }

  render() {
    return (
      <table className="App-field">
        <tbody>
          {this.draw()}
        </tbody>
      </table>
    );
  }

  /**
   * @returns {Array}
   */
  draw() {
    let rows = [];
    for (let rowNumber in this.field) {
      let row = [];
      for (let columnNumber in this.field[rowNumber]) {
        row.push(
          <td key={'cell-' + rowNumber + '-' + columnNumber}
            className={this.isCellAlive(columnNumber, rowNumber) ? 'alive' : 'dead'}
          />
        );
      }
      rows.push(<tr key={'row-' + rowNumber}>{row}</tr>);
    }

    return rows;
  }

  /**
   * @param {number|string} columnNumber
   * @param {number|string} rowNumber
   * @returns {boolean}
   */
  isCellAlive(columnNumber, rowNumber) {
    columnNumber = this.formatCoordinate(columnNumber);
    rowNumber = this.formatCoordinate(rowNumber);

    return !!(this.state.aliveCells[rowNumber] && this.state.aliveCells[rowNumber][columnNumber]);
  }

  /**
   * @param {number|string} coordinate
   * @returns {number}
   */
  formatCoordinate(coordinate) {
    let size = parseInt(this.props.size, 10);
    coordinate = parseInt(coordinate, 10);
    if (coordinate > (size - 1)) {
      coordinate = coordinate - size;
    } else if (coordinate < 0) {
      coordinate = size + coordinate;
    }

    return coordinate;
  }
}

export default LifeField;
